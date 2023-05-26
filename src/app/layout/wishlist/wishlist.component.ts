import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
})
export class WishlistComponent implements OnInit, OnDestroy {
  wishlist: any[] = [];
  subscription:Subscription[] = [];
  currency: any;
  currencyPrice:any;
  constructor(private service: ProductService, private toastr:ToastrService) {
    service.Breadcrumb.next([
      {
        pageTitle: 'Home',
        url: '',
      },
      {
        pageTitle: 'Wishlist',
        url: 'wishlist',
      },
    ]);
  }
  ngOnInit(): void {
    let list: any = localStorage.getItem('favoriteItemList');
    this.wishlist = JSON.parse(list);
    this.service.totalFavoriteItems.next(this.wishlist.length);

    let sub1 = this.service.currency.subscribe((res: any) => {
      if (res) {
        this.currency = res;
        this.getPrice();
      }
    });
    this.subscription.push(sub1);
  }

  getPrice(){
    let value:any = localStorage.getItem('currencyPrice');
    value = JSON.parse(value);
    this.currencyPrice = value[this.currency];
  }

  remove(index: any) {
    const result = confirm('Do You Want to Remove this Item from Wishlist?');
    if (result) {
      if (this.wishlist.length) {
        this.wishlist.splice(index, 1);
        localStorage.setItem('favoriteItemList', JSON.stringify(this.wishlist));
        this.service.totalFavoriteItems.next(this.wishlist.length);
        this.toastr.info("Item Removed from Wishlist Successfully!");
      }
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscriptionRow:any) => {
      subscriptionRow.unsubscribe();
    });
  }
}
