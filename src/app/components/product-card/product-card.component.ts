import { Component, OnInit, Input, OnDestroy, OnChanges, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../models/firebase-objects/product';
import { ShoppingCartItem } from '../../models/firebase-objects/shopping-cart-item.interface';
import { ShoppingCartService } from '../../services/shopping-cart.service';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnDestroy, OnChanges {
  @Input() product: Product;
  @Input() isAdminPreview: true;
  item: ShoppingCartItem;
  cartItemSubscription: Subscription;


  get title() {
    return this.product ? this.product.title || 'Title' : 'Title';
  }

  get category() {
    return this.item.product
      ? this.item.product.category
        ? this.item.product.category.name
        : 'Category'
      : 'Category';
  
  }

  get imageUrl() {
    return this.item.product
      ? this.item.product.imageUrl
        ? this.item.product.imageUrl
        : ''
      : '';
  }

  get price() {
    return this.item.product ? this.item.product.price || '0' : '0';
  }
  get weight() {
    return this.item.product ? this.item.product.weight || '0' : '0';
  }

  get description() {
    return this.item.product ? this.item.product.description || '' : ''
  }



  constructor(
    private cartService: ShoppingCartService,
  ) {
    this.item = {
      product: {
        categoryId: null,
        title: null,
        price: null,
        imageUrl: null,
        weight: null,
        description: null
      },
      quantity: 0,
    };
  }


  async ngOnChanges() {
    await this.cartService.initialize();
    this.item.product = this.product;

    if (this.item.product) {
      const cartItem$ = this.cartService.getItem(this.item.product.id);
      this.cartItemSubscription = cartItem$.subscribe(
        cartItem => (this.item.quantity = cartItem.quantity || 0)
      );
    }

  }

  clickOnDescription() {
    let el = document.getElementById("description");
    console.log(el.style);
    el.style.display = 'block';
  }
  ngOnDestroy() {
    if (this.cartItemSubscription) {
      this.cartItemSubscription.unsubscribe();
    }
  }

  addToCart() {
    // change the quantity manually first to make the UI react fast in case Firebase is slow
    this.item.quantity += 1;
    this.cartService.addToCart(this.item.product);
  }

  removeFromCart() {
    this.item.quantity -= 1;
    this.cartService.removeFromCart(this.item.product.id);
  }

}
