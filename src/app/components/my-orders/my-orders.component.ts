import {
    Component,
    OnDestroy,
    ViewChild,
    AfterViewChecked, OnInit,
} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

import {
    trigger,
    state,
    style,
    transition,
    animate,
} from '@angular/animations';
import { Order } from '../../models/firebase-objects/order';
import { OrderService } from '../../services/order.service';

@Component({
    selector: 'app-my-orders',
    templateUrl: './my-orders.component.html',
    styleUrls: ['./my-orders.component.scss'],

})
export class MyOrdersComponent implements OnInit, OnDestroy, AfterViewChecked {
    columnsToDisplay = ['products', 'totalPrice', 'date', 'link'];
    fieldsToFilter = ['products', 'date', 'link'];
    dataSource: MatTableDataSource<Order>;
    authSubscription: Subscription;
    ordersSubscription: Subscription;
    filterValue: string;
    expandedOrder: Order | null; 

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private orderService: OrderService) {
        this.dataSource = new MatTableDataSource<Order>();
      
    };

    ngOnInit(): void {
        this.orderService.getAllForUser();
    }

    ngAfterViewChecked() {
        if (this.paginator && !this.dataSource.paginator) {
            this.dataSource.paginator = this.paginator;
        }

        if (this.sort && !this.dataSource.sort) {
            this.dataSource.sort = this.sort;
        }
    }

    ngOnDestroy() {
        if (this.authSubscription) {
            this.authSubscription.unsubscribe();
        }

        if (this.ordersSubscription) {
            this.ordersSubscription.unsubscribe();
        }
    }

    onOrderClicked(order
        :
        Order
    ) {
        if (order.shoppingCartItems.length > 1) {
            this.expandedOrder = this.expandedOrder === order ? null : order;
        }
    }

    countItems(order
        :
        Order
    ) {
        return order.shoppingCartItems.reduce(
            (sum, item) => (sum += item.quantity),
            0
        );
    }

    getTotalPrice(order
        :
        Order
    ):
        number {
        return order.shoppingCartItems.reduce(
            (sum, item) => (sum += item.quantity * item.product.price),
            0
        );
    }
}
