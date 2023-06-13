import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class WishlistComponent implements OnInit, OnDestroy {
  wishlist: any[] = [];
  subscription: Subscription[] = [];
  currency: any;
  currencyPrice: any;

  constructor(private service: ProductService, private toastr: ToastrService, private cdr:ChangeDetectorRef, private router:Router) {} 
  
  ngOnInit(): void {
    this.getFavoriteItems();
    this.service.cartItemsCount();
    this.getCurrencyName();    
  }

  // get Selected Favorite Items Using Product Service GET API
  getFavoriteItems(){
    let sub1 = this.service.getFavoriteProduct().subscribe({
      next: (res:any) => {
        this.wishlist = res.data;
        this.service.totalFavoriteItems.next(this.wishlist?.length);
      },
      error: (err:any) => { console.log("wishlist Error", err) },
      complete: () => { this.cdr.markForCheck(); }
    });
    this.subscription.push(sub1);
  };

  addToCart(productId:any){
    this.service.InsertInCart({"productId":productId, quantity:1}).subscribe({
      next: (res:any) => {
        if (res.type=='success'){
          this.toastr.success(res.message)
          this.service.cartItemsCount();
        }
        else{
          this.toastr.info(res.message);
          this.router.navigate(['/auth/login']);
        }
      },
      error: (err:any) => { console.log("add to cart error",err); },
      complete: () => { this.cdr.markForCheck(); }
    });
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

  // Route to Products Detail Page
  detailsPage(productId:any){
    this.router.navigate(['/Shop/Shop-details', productId]);
  }

  // get Price of Selected Currency from Local Storage
  getPrice() {
    let value: any = localStorage.getItem('currencyPrice');
    value = JSON.parse(value);
    this.currencyPrice = value[this.currency];
  };

  /**
   * Delete the selected record and fetch new list
   * @param favoriteId which needs to be deleted
   */
  removeLikedProduct(favoriteId: any) {
    let result = confirm("Do You want to Remove the Item from Wishlist?");
    if(result){
      if (this.wishlist.length) {
        let sub3 = this.service.removeFavoriteProduct(favoriteId).subscribe({
          next: (res:any) => {
            if(res.type == 'success'){
              this.toastr.success(res.message);
              this.getFavoriteItems();
            }
          },
          error: (err:any) => { console.log("Remove Selected Product Error", err); },
          complete: () => { this.cdr.markForCheck(); }
        });
        this.subscription.push(sub3);
      }
    }
  };

  // Set Breadcrumb in Product Service
  getBreadcrumb(){
    this.service.Breadcrumb.next([
      { pageTitle: 'Home', url: '' },
      { pageTitle: 'Wishlist', url: 'wishlist' },
    ]);
  }

  ngOnDestroy(): void {
    // Removes all the subscriptions to avoid memory leak issue
    this.subscription.forEach((subscriptionRow: any) => {
      subscriptionRow.unsubscribe();
    });
  }
}
