import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {ComponentsComponent} from './components/components.component';
import {ProductsComponent} from './components/products/products.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {CheckOutComponent} from './components/check-out/check-out.component';
import {OrderSuccessComponent} from './components/order-success/order-success.component';
import {MyOrdersComponent} from './components/my-orders/my-orders.component';
import {OrderReviewComponent} from './components/order-review/order-review.component';
import {ProductFormComponent} from './components/admin/product-form/product-form.component';
import {AdminProductsComponent} from './components/admin/admin-products/admin-products.component';
import {AdminOrdersComponent} from './components/admin/admin-orders/admin-orders.component';


// @ts-ignore
const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: ComponentsComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'shopping-cart', component: ShoppingCartComponent},
    {path: 'check-out', component: CheckOutComponent},
    {path: 'order-success', component: OrderSuccessComponent},
    {path: 'my-orders', component: MyOrdersComponent},
    {path: 'my-orders/:id', component: OrderReviewComponent},
    {path: 'admin/products/new', component: ProductFormComponent},
    {path: 'admin/products/:id', component: ProductFormComponent},
    {path: 'admin/products', component: AdminProductsComponent},
    {path: 'admin/orders', component: AdminOrdersComponent}
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {})
    ],
    exports: [],
})
export class AppRoutingModule {
}
