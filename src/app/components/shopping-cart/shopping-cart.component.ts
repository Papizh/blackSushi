import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval } from 'rxjs';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCartItem } from '../../models/firebase-objects/shopping-cart-item.interface';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
    columnsToDisplay = ['productImage', 'categoryName', 'productName', 'quantity', 'price'];
    dataSource: MatTableDataSource<ShoppingCartItem>;
    itemsSubscription: Subscription;
    totalPrice: number;
    totalQuantity: number;

    constructor(private cartService: ShoppingCartService,
        private router: Router,
        private spinner: NgxSpinnerService) {
        this.dataSource = new MatTableDataSource<ShoppingCartItem>();
        this.cartService.initialize().then(() => {
            this.itemsSubscription = this.cartService
                .getAllItems()
                .subscribe(items => {
                    this.dataSource.data = items;
                    this.updateTotals();
                });
        });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        if (this.itemsSubscription) {
            this.itemsSubscription.unsubscribe();
        }
    }

    private updateTotals() {
        this.totalQuantity = this.dataSource.data.reduce(
            (total, item) => (total += item.quantity),
            0
        );

        this.totalPrice = this.dataSource.data.reduce(
            (total, item) => (total += item.quantity * item.product.price),
            0
        );
    }

    onQuantityPlusOne(item: ShoppingCartItem) {

        this.cartService.addToCart(item.product);
    }

    onQuantityMinusOne(item: ShoppingCartItem) {
        this.cartService.removeFromCart(item.product.id);
    }

    onCheckOut() {
        // create an order
        // add it to the order collection
    }

    /**
     * change the quantity and the totals manually to make sure the UI reacts fast in case Firebase is slow
     * TODO: problem with Firebase updates arriving after several clicks. How to have it client-side
     * AND being able to receive updates (e.g. from another tab)
     * @param item the ShoppingCartItem being changed
     * @param difference the different in quantity (e.g. +1 or -1)
     */
    private updateQuantityClientSide(item: ShoppingCartItem, difference: number) {
        const index = this.dataSource.data.findIndex(i => i.id === item.id);

        if (index === -1) {
            return;
        }

        this.dataSource.data[index].quantity += difference;

        if (this.dataSource.data[index].quantity === 0) {
            this.dataSource.data = this.dataSource.data.filter(i => i.id !== item.id);
        }

        this.updateTotals();
    }

    backToMain() {
        this.spinner.show();

        setTimeout(() => {
            /** spinner ends after 1 seconds */
            this.spinner.hide();
        }, 1000);
        this.router.navigate(['home']);
    }

}
