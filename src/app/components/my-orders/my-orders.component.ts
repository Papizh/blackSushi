import {
  Component,
  OnDestroy,
  ViewChild,
  AfterViewChecked,
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
import {Order} from '../../models/firebase-objects/order';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class MyOrdersComponent implements OnDestroy, AfterViewChecked {
  columnsToDisplay = ['products', 'totalPrice', 'date', 'link'];
  fieldsToFilter = ['products', 'date', 'link'];
  dataSource: MatTableDataSource<Order>;
  authSubscription: Subscription;
  ordersSubscription: Subscription;
  filterValue: string;
  expandedOrder: Order | null; // TODO: really necessary? can't any object be null implicitly?

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private orderService: OrderService) {
    // TODO: try to log out from each page to see what happens. There should be no error, and potentially some redirects
    this.dataSource = new MatTableDataSource<Order>();

    // this.authSubscription = authService.appUser$.subscribe(user => {
    //   if (user) {
    //     this.ordersSubscription = this.ordersSubscription = orderService
    //       .getAllForUser(user.id)
    //       .subscribe(orders => {
    //         this.dataSource.data = orders;
    //       });
    //   }
    // });
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

  onOrderClicked(order: Order) {
    if (order.shoppingCartItems.length > 1) {
      this.expandedOrder = this.expandedOrder === order ? null : order;
    }
  }

  countItems(order: Order) {
    return order.shoppingCartItems.reduce(
      (sum, item) => (sum += item.quantity),
      0
    );
  }

  getTotalPrice(order: Order): number {
    return order.shoppingCartItems.reduce(
      (sum, item) => (sum += item.quantity * item.product.price),
      0
    );
  }
}
