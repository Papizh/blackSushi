import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../../services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  constructor(private orderService: OrderService) {
    this.orderService.getAllForUser()
  }

  ngOnInit() {
    this.orderService.getAllForUser()
  }

}
