import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import {Address} from '../../models/address';
import {Order} from '../../models/firebase-objects/order';
import {ShoppingCartItem} from '../../models/firebase-objects/shopping-cart-item.interface';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.scss'],
})
export class OrderReviewComponent implements OnDestroy {
  orderId: string;
  address$: Observable<Address>;
  order: Order;
  orderSubscription: Subscription;
  itemsSubject: BehaviorSubject<ShoppingCartItem[]>;
  addressSubject: BehaviorSubject<Address>;

  constructor(route: ActivatedRoute, orderService: OrderService) {
    this.orderId = route.snapshot.paramMap.get('id');
    this.itemsSubject = new BehaviorSubject([]);
    this.addressSubject = new BehaviorSubject(new Address());

    this.orderSubscription = orderService.get(this.orderId).subscribe(order => {
      this.order = order;
      this.itemsSubject.next(order.shoppingCartItems);
      this.addressSubject.next(order.address);
    });
  }

  ngOnDestroy() {
    if (this.orderSubscription) {
      this.orderSubscription.unsubscribe();
    }
    this.itemsSubject.complete();
    this.addressSubject.complete();
  }
}
