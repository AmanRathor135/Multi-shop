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
    let list: any = localStorage.getItem('favoriteItemList');
    this.favItemLength = JSON.parse(list);
    this.service.totalFavoriteItems.next(this.favItemLength.length);

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
        pageTitle: 'Shopping Cart',
        url: 'cart-detail/my-cart',
      },
    ]);

    
    
  }

  ngOnInit(): void {
    this.currencyValue();
    
    this.service.totalCartItems.next(true);
    this.service.currency.subscribe((res: any) => {
      if (res) {
        this.currency = res;
        this.getPrice();
        this.cdr.markForCheck();
      }
    });  
    
    
    const getSelectedItem: any = localStorage.getItem('addCartItem') || '[]';
    this.cartProduct = JSON.parse(getSelectedItem);
    this.service.totalCartItems.next(true);
    this.totalPrice();
  }

  currencyValue() {  
    this.service.getCurrencyPrice().subscribe({
      next: (res: any) => {
        localStorage.setItem('currencyPrice', JSON.stringify(res.data));
      },
    }); 
  }

  getPrice(){
    let value:any = localStorage.getItem('currencyPrice');
    value = JSON.parse(value);
    this.currencyPrice = value[this.currency];
  }

  totalPrice() {
    for (let i = 0; i < this.cartProduct.length; i++) {
      this.totalAmount +=
        (this.cartProduct[i].price * this.cartProduct[i].quantity);
      this.cdr.markForCheck();
    }
  }

  removeRow(index: any) {
    const result = confirm('Do You Want to Remove this Item?');
    if (result) {
      if (this.cartProduct.length) {
        this.cartProduct.splice(index, 1);
        localStorage.setItem('addCartItem', JSON.stringify(this.cartProduct));
        this.service.totalCartItems.next(true);
        this.toastr.error('Item Deleted Successfully!');

        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['cart-detail/my-cart']); // navigate to same route
          });
        this.cdr.markForCheck();
      }
    }
  }
}
