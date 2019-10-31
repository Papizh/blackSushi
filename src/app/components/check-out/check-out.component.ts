import {Component, OnDestroy} from '@angular/core';
import {Subscription, Observable, BehaviorSubject, Subject} from 'rxjs';
import {Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {AppUser} from '../../models/firebase-objects/app-user.interface';
import {ShoppingCartItem} from '../../models/firebase-objects/shopping-cart-item.interface';
import {OrderService} from '../../services/order.service';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {Address} from '../../models/address';
import {Order} from '../../models/firebase-objects/order';

@Component({
    selector: 'app-check-out',
    templateUrl: './check-out.component.html',
    styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent implements OnDestroy {
    appUser: AppUser;
    itemsSubscription: Subscription;
    authSubscription: Subscription;
    itemsSubject: BehaviorSubject<ShoppingCartItem[]>;

    constructor(
        private orderService: OrderService,
        private cartService: ShoppingCartService,
        private router: Router
    ) {
        this.cartService.initialize().then(() => {
            cartService
                .getNumberOfItemsInCart()
                .pipe(take(1))
                .subscribe(num => {
                    if (!num) {
                        console.error(
                            'Tried to access check-out without any items in the shopping cart'
                        );
                        router.navigate(['/']);
                    }
                });

            this.itemsSubject = new BehaviorSubject([]);

            this.itemsSubscription = cartService.getAllItems().subscribe(items => {
                this.itemsSubject.next(items);
            });
        });
    }

    ngOnDestroy() {
        if (this.itemsSubscription) {
            this.itemsSubscription.unsubscribe();
        }

        if (this.authSubscription) {
            this.authSubscription.unsubscribe();
        }

        this.itemsSubject.complete();
    }

    async onAddressSubmitted(address: Address) {
        const order = new Order();
        order.address = address;
        order.shoppingCartItems = this.itemsSubject.value;
        order.user = this.appUser;
        order.date = new Date();

        const docRef = await this.orderService.create(order);

        this.cartService.deleteCart();
        this.router.navigate(['/order-success'], {
            queryParams: {orderId: docRef.id},
        });
    }
}
