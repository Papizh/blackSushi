import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '../../models/firebase-objects/category.interface';

import { Product } from '../../models/firebase-objects/product';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { ShoppingCartItem } from '../../models/firebase-objects/shopping-cart-item.interface';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  categories$: Observable<Category[]>;
  products$: Observable<Product[]>;
  items$: Observable<ShoppingCartItem[]>;
  selectedCategoryId: string;
  queryParamsSubscription: Subscription;

  constructor(
    private spinner: NgxSpinnerService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    route: ActivatedRoute
  ) {
    // select all categories by default
    this.selectedCategoryId = '';
    this.categories$ = this.categoryService.getAll();

    // when the query params change, update the selected category and displayed products
    // this is also triggered on page load
    this.queryParamsSubscription = route.queryParams.subscribe(
      (params: Params) => {
        this.selectedCategoryId = params.category || '';
        this.products$ = this.productService.getPopulatedProductsByCategory(
          this.selectedCategoryId
        );
      }
    );
  }

  ngOnDestroy() {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  onSelectedCategoryChange() {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    const queryParams = this.selectedCategoryId
      ? { category: this.selectedCategoryId }
      : null;
    this.router.navigate([], { queryParams: queryParams, });
  }
}
