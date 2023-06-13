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
  taxAmount: any = 10;
  cartProduct: any[] = [];

  constructor(
    private service: ProductService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {
    this.getBreadcrumb();
  }

  ngOnInit(): void {
    this.getCartProductList();
    // this.currencyValue();
    this.service.isLoggedIn.next(true);
    this.service.favoriteItemsCount();
    this.getCurrencyName();
  }
  
  getCartProductList(){
    this.service.isLoggedIn.next(true);
    this.service.cartProductList().subscribe({
      next: (res:any) => {
        this.cartProduct = res.data;
        this.service.totalCartItems.next(this.cartProduct?.length);
        this.totalPrice();
      },
      error: (err:any) => { console.log("Cart List error", err); },
      complete: () => { this.cdr.markForCheck();}
    });
  };

  
  // Set the Currency Price in Local Storage using Product Service
  currencyValue() {  
    this.service.getCurrencyPrice().subscribe({
      next: (res: any) => {
        localStorage.setItem('currencyPrice', JSON.stringify(res.data));
        this.cdr.markForCheck();
      },
    }); 
  };

  // get Selected Currency Name using Behavior Subject of Product Service
  getCurrencyName(){
    this.service.currency.subscribe((res: any) => {
      if (res) {
        this.currency = res;
        this.getPrice();
        this.cdr.markForCheck();
      }
    });  
  }
  
  // get Price of Selected Currency from Local Storage
  getPrice(){
    let value:any = localStorage.getItem('currencyPrice');
    value = JSON.parse(value);
    this.currencyPrice = value[this.currency];
  };

 
  // get Total Amount of cartProductList
  totalPrice() {
    for (let i = 0; i < this.cartProduct?.length; i++) {
      this.totalAmount += (this.cartProduct[i].price * this.cartProduct[i].quantity);
      this.cdr.markForCheck();
    };
  };

  // Decrease the Selected Product Quantity
  decreaseQuantity(index:any){
    if(this.cartProduct[index].quantity>1) { this.cartProduct[index].quantity--; }
    else { this.cartProduct[index].quantity = 1; }
  }

  // Increase the Selected Product Quantity
  increaseQuantity(index:any){
    this.cartProduct[index].quantity++;
  }

  /**
   * Delete the selected record and fetch new list
   * @param cartId which needs to be deleted
   */
  removeRow(cartId: any) {
    this.service.isLoggedIn.next(true);

    let result = confirm("Do You want to Remove the Item from Cart?");
    if(result){
      if(this.cartProduct.length){
        this.service.removeCartProduct(cartId).subscribe({
          next: (res:any) => {
            if(res.type == 'success'){
              this.toastr.success(res.message);
              this.getCartProductList();
            }
          },
          error: (err:any) => { console.log("remove cart Item error", err); },
          complete: () => { 
            this.router.navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate(['cart-detail/my-cart']); // navigate to same route
            });
            this.cdr.markForCheck(); 
          }
        });
      } 
    }
  };

  // Set the Breadcrumb using Product Service
  getBreadcrumb(){
    this.service.Breadcrumb.next([
      { pageTitle: 'Home', url: '' },
      { pageTitle: 'Shop', url: 'Shop' },
      { pageTitle: 'Shopping Cart', url: 'cart-detail/my-cart' },
    ]);
  };
}
