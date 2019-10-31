import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  OnDestroy,
} from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import {Address} from '../../models/address';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit, OnDestroy {
  @Input() isReadOnly: boolean;
  @Input() address$: Observable<Address>;
  @Output() addressSubmitted = new EventEmitter();

  address: Address;
  addressSubscription: Subscription;

  constructor() {
    this.address = new Address();
    this.address.addressLines = [];
  }

  ngOnInit() {
    if (this.address$) {
      this.addressSubscription = this.address$.subscribe(
        address => (this.address = address)
      );
    }
  }

  ngOnDestroy() {
    if (this.addressSubscription) {
      this.addressSubscription.unsubscribe();
    }
  }

  onSubmit() {
    this.addressSubmitted.emit(this.address);
  }
}
