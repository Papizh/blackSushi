import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'app/models/firebase-objects/order';
import { ShoppingCartItem } from 'app/models/firebase-objects/shopping-cart-item.interface';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders: any;
  item: ShoppingCartItem;

  get category() {
    return this.item.product
      ? this.item.product.category
        ? this.item.product.category.name
        : 'Category'
      : 'Category';
  }

  constructor(private orderService: OrderService) {

  }


  ngOnInit() {
    this.getData();
  }

  getData() {
    this.orderService.getOrders().subscribe(order => {
      this.orders = order;
      console.log(this.orders);
      return this.orders.sort((a, b) => {
        return <any>new Date(b.date) - <any>new Date(a.date);
      })
    })
  }
}
