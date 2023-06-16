import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderHistoryComponent implements OnInit, OnDestroy {

  orderList:any[] = [];
  subscription:Subscription[] = [];
  currency: any;
  currencyPrice: any;

  constructor(private service:ProductService, private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getOrderList();
    this.getBreadcrumb();
    this.getCurrencyName();
    this.service.cartItemsCount();
    this.service.favoriteItemsCount();
  }

  getOrderList(){
    let sub1 = this.service.getOrderList().subscribe({
      next: (res:any) => {
        this.orderList = res.data;
        console.log("order List", this.orderList);
      }, 
      error: (err:any) => { console.log("order list error", err); },
      complete: () => { this.cdr.markForCheck(); }
    })
  };

  // get Selected Currency Name using Behavior Subject of Product Service
  getCurrencyName(){
    let sub2 = this.service.currency.subscribe((res: any) => {
      if (res) {
        this.currency = res;
        this.getPrice();
        this.cdr.markForCheck();
      }
    });
    this.subscription.push(sub2);
  };

  // get Price of Selected Currency from Local Storage
  getPrice() {
    let value: any = localStorage.getItem('currencyPrice');
    value = JSON.parse(value);
    this.currencyPrice = value[this.currency]; 
  };

  // Set the Breadcrumb using Product Service
  getBreadcrumb(){
    this.service.Breadcrumb.next([
      { pageTitle: 'Home', url: '' },
      { pageTitle: 'Shop', url: 'Shop' },
      { pageTitle: 'Order History', url: 'cart-detail/order-history' },
    ]);
  };

  ngOnDestroy(): void {
    // Removes all the subscriptions to avoid memory leak issue
    this.subscription.forEach((subscriptionRow:any) => {
      subscriptionRow.unsubscribe();
    });
  }
}
