import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Order } from '../models/firebase-objects/order';
import { FirebaseCollection } from './firebase-collection';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class OrderService extends FirebaseCollection<Order> {
    constructor(db: AngularFirestore) {
        super(db, '/orders');

    }

    getAllForUser(): Observable<Order[]> {
        return super
            .getAll()
            .pipe(map(orders => orders.filter(orders => console.log(orders))));
    }
    getOrders() {
        return this.db.collection('orders').valueChanges();
    }



}

