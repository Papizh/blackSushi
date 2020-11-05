import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NouisliderModule} from 'ng2-nouislider';
import {JwBootstrapSwitchNg2Module} from 'jw-bootstrap-switch-ng2';
import {RouterModule} from '@angular/router';

import {ComponentsComponent} from './components.component';
import {AddressDisplayComponent} from './address-display/address-display.component';
import {MaterialModule} from '../material/material.module';
import {AddressFormComponent} from './address-form/address-form.component';
import {OrderReviewComponent} from './order-review/order-review.component';
import {OrderSummaryComponent} from './order-summary/order-summary.component';
import {QuantitySelectorComponent} from './quantity-selector/quantity-selector.component';
import {ProductCardComponent} from './product-card/product-card.component';
import {ProductFormComponent} from './admin/product-form/product-form.component';
import {AdminOrdersComponent} from './admin/admin-orders/admin-orders.component';
import {AdminProductsComponent} from './admin/admin-products/admin-products.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {OrderSuccessComponent} from './order-success/order-success.component';
import {CheckOutComponent} from './check-out/check-out.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {ProductsComponent} from './products/products.component';
import {HomeComponent} from './home/home.component';
import {CategoryService} from '../services/category.service';
import {ProductService} from '../services/product.service';
import {ShoppingCartService} from '../services/shopping-cart.service';
import {ShoppingCartItemService} from '../services/shopping-cart-item.service';
import {UserService} from '../services/user.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {Ng2PageScrollModule} from 'ng2-page-scroll';


@NgModule({
    imports: [
        Ng2PageScrollModule,
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        RouterModule,
        JwBootstrapSwitchNg2Module,
        MaterialModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
    ],
    declarations: [
        ComponentsComponent,
        AddressDisplayComponent,
        ProductsComponent,
        ShoppingCartComponent,
        CheckOutComponent,
        OrderSuccessComponent,
        MyOrdersComponent,
        AdminProductsComponent,
        AdminOrdersComponent,
        ProductFormComponent,
        ProductCardComponent,
        QuantitySelectorComponent,
        AddressFormComponent,
        OrderSummaryComponent,
        OrderReviewComponent,
        AddressDisplayComponent,
        HomeComponent,
    ],
    exports: [ComponentsComponent],
    providers: [
        CategoryService,
        ProductService,
        ShoppingCartService,
        ShoppingCartItemService,
        UserService
    ],
})
export class ComponentsModule {
}
