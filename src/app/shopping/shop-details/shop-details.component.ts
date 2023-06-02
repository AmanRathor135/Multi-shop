import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ShopDetailsComponent implements OnInit, OnDestroy {
  carouselList: any[] = [];
  favItemLength:any;
  math = Math;
  currency: any;
  currencyPrice:any;
  totalRate: any;
  subscription: Subscription[] = [];
  icons: any[] = [
    'fa fa-shopping-cart',
    'far fa-heart',
    'fa fa-sync-alt',
    'fa fa-search',
  ];

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    center: false,
    dots: false,
    autoHeight: true,
    autoWidth: true,
    margin: 20,
    responsive: {
      0: { items: 1 },
      280: { items: 2 },
      560: { items: 3 },
      900: { items: 4 },
    },
  };

  constructor(private service: ProductService, private cdr:ChangeDetectorRef) {
    this.getFavoriteItems();
    
    service.Breadcrumb.next([
      {
        pageTitle: 'Home',
        url: '',
      },
      {
        pageTitle: 'Shop',
        url: 'Shop/shop',
      },
      {
        pageTitle: 'Shop Details',
        url: 'Shop/Shop-details',
      }
    ]);
  }

  ngOnInit(): void {
    let sub1 = this.service.currency.subscribe((res: any) => {
      if (res) {
        this.currency = res;
        this.getPrice();
        this.cdr.markForCheck();
      }
    });
    this.subscription.push(sub1);

    this.getProductsForCarousel();
    this.rating(5);
  }

  getFavoriteItems(){
    let list:any = localStorage.getItem('favoriteItemList');
    this.favItemLength = JSON.parse(list);
    this.service.totalFavoriteItems.next(this.favItemLength.length);
  };

  getPrice(){
    let value:any = localStorage.getItem('currencyPrice');
    value = JSON.parse(value);
    this.currencyPrice = value[this.currency];
  };

  getProductsForCarousel() {
    let limit = {limit:8};
    let sub2 = this.service.getFilteredProducts(limit).subscribe({
      next: (res: any) => { this.carouselList = res.data.productList; },
      error: (err: any) => { console.log('err', err); },
      complete: () => { this.cdr.markForCheck(); },
    });
    this.subscription.push(sub2);
  };
    
  rating(value: any) {
    this.totalRate = Array(value);
    this.cdr.markForCheck();
  };

  ngOnDestroy(): void {
    this.subscription.forEach((subscriptionRow: any) => {
      subscriptionRow.unsubscribe();
    });
  }
}
