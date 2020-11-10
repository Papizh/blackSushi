import {
    Component,
    ViewChild,
    AfterViewChecked, OnInit,
} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';
import { Order } from '../../models/firebase-objects/order';
import { OrderService } from '../../services/order.service';

@Component({
    selector: 'app-my-orders',
    templateUrl: './my-orders.component.html',
    styleUrls: ['./my-orders.component.scss']

})
export class MyOrdersComponent implements OnInit, AfterViewChecked {
    columnsToDisplay = ['products', 'totalPrice', 'date'];
    fieldsToFilter = ['products', 'date', 'link'];
    dataSource: MatTableDataSource<Order>;
    ordersSubscription: Subscription;
    filterValue: string;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private orderService: OrderService) {
        // TODO: try to log out from each page to see what happens. There should be no error, and potentially some redirects
        this.dataSource = new MatTableDataSource<Order>();
        this.orderService.getAllForUser()
            .subscribe(orders => {
                this.dataSource.data = orders;
            });
    };

    ngOnInit() {
        let orders = this.orderService.getOrders();
        console.log(orders);

    }

    ngAfterViewChecked() {
        if (this.paginator && !this.dataSource.paginator) {
            this.dataSource.paginator = this.paginator;
        }

        if (this.sort && !this.dataSource.sort) {
            this.dataSource.sort = this.sort;
        }
    }


    // onOrderClicked(order
    //     :
    //     Order
    // ) {
    //     if (order.shoppingCartItems.length > 1) {
    //         this.expandedOrder = this.expandedOrder === order ? null : order;
    //     }
    // }

    // countItems(order
    //     :
    //     Order
    // ) {
    //     return order.shoppingCartItems.reduce(
    //         (sum, item) => (sum += item.quantity),
    //         0
    //     );
    // }

    // getTotalPrice(order
    //     :
    //     Order
    // ):
    //     number {
    //     return order.shoppingCartItems.reduce(
    //         (sum, item) => (sum += item.quantity * item.product.price),
    //         0
    //     );
    // }
}
