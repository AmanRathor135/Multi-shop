import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private service: ProductService, private cdr:ChangeDetectorRef, private router:Router, private toastr:ToastrService) {}

  ngOnInit(): void {
    this.service.isLoggedIn.next(true);
    this.service.cartItemsCount();
    this.service.favoriteItemsCount();
    this.getCurrencyName();
    this.getProductsForCarousel();
    this.rating(5);
  }

  // Route to Products Detail Page
  detailsPage(productId:any){
    this.router.navigate(['/Shop/Shop-details', productId]);
  }

  /**
   * Adding a product for a Wishlist using Product Services POST method
   * @param productId is a product's Id
   */
  doFavorites(productId: any) {
    let sub3 = this.service.addProductInFavorites({"productId":productId}).subscribe({
      next: (res:any) => {
        res.type=='success'? this.toastr.success(res.message):this.toastr.info(res.message); 
        this.service.favoriteItemsCount();
      },
      error: (err:any) => { console.log("Do Favorites Error", err);},
      complete: () => { this.cdr.markForCheck();}
    });
    this.subscription.push(sub3);
  };

  // get currency name using behavior subject of products service and calling @getPrice() function
  getCurrencyName(){
    let sub1 = this.service.currency.subscribe((res: any) => {
      if (res) {
        this.currency = res;
        this.getPrice();
        this.cdr.markForCheck();
      }
    });
    this.subscription.push(sub1);
  }

  // get Price of Selected Currency from Local Storage
  getPrice(){
    let value:any = localStorage.getItem('currencyPrice');
    value = JSON.parse(value);
    this.currencyPrice = value[this.currency];
  };

  getProductsForCarousel() {
    let limit = {limit:8};
    let sub2 = this.service.getFilteredProducts(limit).subscribe({
      next: (res: any) => { this.carouselList = res.data?.productList; },
      error: (err: any) => { console.log('err', err); },
      complete: () => { this.cdr.markForCheck(); },
    });
    this.subscription.push(sub2);
  };
    
  rating(value: any) {
    this.totalRate = Array(value);
    this.cdr.markForCheck();
  };

  // getting the breadcrumb value using Product Service Behavior Subject
  getBreadcrumb(){
    this.service.Breadcrumb.next([
      { pageTitle: 'Home', url: ''},
      { pageTitle: 'Shop', url: 'Shop'},
      { pageTitle: 'Shop Details', url: 'Shop/Shop-details'}
    ]);
  };

  ngOnDestroy(): void {
    // Removes all the subscriptions to avoid memory leak issue
    this.subscription.forEach((subscriptionRow: any) => {
      subscriptionRow.unsubscribe();
    });
  }
}
