import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyCartComponent implements OnInit {
  selectedIndex: any;
  totalAmount: number = 0;
  currency: any;
  currencyPrice: any;
  favItemLength: any;
  taxAmount: any = 10;
  cartProduct: any[] = [];

  constructor(
    private service: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {
    /**
     * Set the Breadcrumb using Product Service
     */
    service.Breadcrumb.next([
      { pageTitle: 'Home', url: '' },
      { pageTitle: 'Shop', url: 'Shop/shop' },
      { pageTitle: 'Shopping Cart', url: 'cart-detail/my-cart' },
    ]);
  }

  ngOnInit(): void {
    this.getFavoriteItems();
    this.currencyValue();
    this.service.totalCartItems.next(true);

    /**
     * get Selected Currency Name using Behavior Subject of Product Service
     */
    this.service.currency.subscribe((res: any) => {
      if (res) {
        this.currency = res;
        this.getPrice();
        this.cdr.markForCheck();
      }
    });  
    
    /**
     * get cartProduct from Local Storage
     */
    const getSelectedItem: any = localStorage.getItem('addCartItem') || '[]';
    this.cartProduct = JSON.parse(getSelectedItem);
    this.service.totalCartItems.next(true);
    this.totalPrice();
  }

  /**
   * get Total Favorite Items from Local Storage
   */
  getFavoriteItems(){
    let list: any = localStorage.getItem('favoriteItemList');
    this.favItemLength = JSON.parse(list);
    this.service.totalFavoriteItems.next(this.favItemLength.length);
  }

  /**
   * Set the Currency Price in Local Storage using Product Service
   */
  currencyValue() {  
    this.service.getCurrencyPrice().subscribe({
      next: (res: any) => {
        localStorage.setItem('currencyPrice', JSON.stringify(res.data));
        this.cdr.markForCheck();
      },
    }); 
  };

  /**
   * get Price of Selected Currency from Local Storage
   */
  getPrice(){
    let value:any = localStorage.getItem('currencyPrice');
    value = JSON.parse(value);
    this.currencyPrice = value[this.currency];
  };

  /**
   * get Total Amount of cartProductList
   */
  totalPrice() {
    for (let i = 0; i < this.cartProduct.length; i++) {
      this.totalAmount += (this.cartProduct[i].price * this.cartProduct[i].quantity);
      this.cdr.markForCheck();
    };
  };

  /**
   * Delete the selected record and fetch new list
   * @param index which needs to be deleted
   */
  removeRow(index: any) {
      if (this.cartProduct.length) {
        this.cartProduct.splice(index, 1);
        localStorage.setItem('addCartItem', JSON.stringify(this.cartProduct));
        this.service.totalCartItems.next(true);
        this.toastr.error('Item Deleted Successfully!');

        this.router.navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['cart-detail/my-cart']); // navigate to same route
          });
        this.cdr.markForCheck();
      };
  };
}
