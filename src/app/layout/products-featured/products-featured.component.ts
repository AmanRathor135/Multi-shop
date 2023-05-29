import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-featured',
  templateUrl: './products-featured.component.html',
  styleUrls: ['./products-featured.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsFeaturedComponent implements OnInit, OnDestroy {
  searchText: string = '';
  productList: any[] = [];
  subscription: Subscription[] = [];
  currency: any;
  currencyPrice: any;
  math = Math;
  totalRate: any;
  icons: any[] = [
    'fa fa-shopping-cart',
    'far fa-heart',
    'fa fa-sync-alt',
    'fa fa-search',
  ];

  constructor(
    private service: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getCurrency();
    this.getProducts();
    this.rating(5);
  }

  /**
   * get Selected Currency Name using Behavior Subject of Product Service
   */
  getCurrency() {
    let sub1 = this.service.currency.subscribe((res: any) => {
      if (res) {
        this.currency = res;
        this.getPrice();
        this.cdr.markForCheck();
      }
    });
    this.subscription.push(sub1);
  }

  /**
   * get Limited Products using Product Service after passing the params
   * If it give success then we get the products as a Response which we store in productList and go to complete 
   * If it gives error then it will show error
   */
  getProducts() {
    let limit = {
      pagination: {
        page: 1,
        productsPerPage: 8,
      },
    };
    let sub2 = this.service.fetchLimitedProducts(limit).subscribe({
      next: (res: any) => { this.productList = res.data;},
      error: (err: any) => { console.log('err', err);},
      complete: () => { this.cdr.markForCheck();},
    });
    this.subscription.push(sub2);
  }

  /**
   * get Price of Selected Currency from Local Storage
   */
  getPrice() {
    let value: any = localStorage.getItem('currencyPrice');
    value = JSON.parse(value);
    this.currencyPrice = value[this.currency];
  }

  /**
   * for getting star value using product.rating.rate out of @param value
   * @param value is 5 given in ngOnInit 
   */
  rating(value: any) {
    this.totalRate = Array(value);
  }

  ngOnDestroy(): void {
    // Removes all the subscriptions to avoid memory leak issue
    this.subscription.forEach((subscriptionRow: any) => {
      subscriptionRow.unsubscribe();
    });
  }
}
