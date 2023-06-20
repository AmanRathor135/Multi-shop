import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-recent',
  templateUrl: './products-recent.component.html',
  styleUrls: ['./products-recent.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductsRecentComponent implements OnInit, OnDestroy {
  searchText: string = '';
  productList: any[] = [];
  subscription: Subscription[] = [];
  data:any = {};
  currency: any;
  currencyPrice: any;
  math = Math;
  totalRate: any;

  constructor(private service: ProductService, private cdr: ChangeDetectorRef, private router:Router, private toastr:ToastrService) {}

  ngOnInit(): void {
    this.getCurrencyName();
    this.getProducts();
  }

  // get Selected Currency Name using Behavior Subject of Product Service
  getCurrencyName() {
    let sub1 = this.service.currency.subscribe((res: any) => {
      if (res) {
        this.currency = res;
        this.getPrice();
        this.cdr.markForCheck();
      }
    });
    this.subscription.push(sub1);
  };

  // Route to Products Detail Page
  detailsPage(productId:any){
    this.router.navigate(['/Shop/Shop-details', productId]);
  };


  // get Recent Products using Product Service API after passing the body
  getProducts() {
    this.data = {type:'recent'};
    let sub2 = this.service.getFilteredProducts(this.data).subscribe({
      next: (res: any) => {this.productList = res.data?.productList;},
      error: (err: any) => { console.log('Recent Product Error', err);},
      complete: () => { this.cdr.markForCheck();},
    });
    this.subscription.push(sub2);
  };


  /**
   * Adding a product in a Wishlist component
   * @param productId is a product's Id
   * if product.isShow true then it is added in favoriteItemList Array and set in Local Storage
   * else remove from favoriteItemList Array and update and set the Local Storage
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

  // Adding in Cart using ProductId
  addToCart(productId:any){
    if(localStorage.getItem('token')){
      let sub4 = this.service.InsertInCart({"productId":productId, quantity:1}).subscribe({
        next: (res:any) => {
          if (res.type=='success'){
            this.toastr.success(res.message)
            this.service.cartItemsCount();
          }
        },
        error: (err:any) => { console.log("add to cart error",err); },
        complete: () => { this.cdr.markForCheck(); }
      });
      this.subscription.push(sub4);
    }
    else {
      let result = confirm("You have to LoggedIn First");
      if(result){ this.router.navigate(['/auth/login']); }
    }
  };

  // get Price of Selected Currency from Local Storage
  getPrice() {
    let value: any = localStorage.getItem('currencyPrice');
    value = JSON.parse(value);
    this.currencyPrice = value[this.currency];
  };

  ngOnDestroy(): void {
    // Removes all the subscriptions to avoid memory leak issue
    this.subscription.forEach((subscriptionRow: any) => {
      subscriptionRow.unsubscribe();
    });
  }
}
