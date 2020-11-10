import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'app/models/firebase-objects/order';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders: any;

  constructor(private orderService: OrderService) {

  }

  ngOnInit() {
     this.getData()
  }

  getData() {
    this.orderService.getOrders().subscribe(order => {
      this.orders = order;
      console.log(this.orders);
    })
  }

}
