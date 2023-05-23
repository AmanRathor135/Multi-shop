import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MyCartComponent implements OnInit {
  selectedIndex: any;
  totalAmount: number = 0;
  currency: any;
  taxAmount: any = 10;
  cartProduct: any[] = [];

  constructor(private service: ProductService, private router: Router, private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.service.totalCartItems.next(true);
    this.service.currency.subscribe((res: any) => {
      if (res) { 
        this.currency = res;
        this.cdr.markForCheck();
      }
    });

    const getSelectedItem: any = localStorage.getItem('addCartItem') || '[]';
    this.cartProduct = JSON.parse(getSelectedItem);

    this.service.totalCartItems.next(true);

    this.totalPrice();
  }

  totalPrice() {
    for (let i = 0; i < this.cartProduct.length; i++) {
      this.totalAmount += this.cartProduct[i].price * this.cartProduct[i].quantity;
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

        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
            this.router.navigate(['cart-detail/my-cart']); // navigate to same route
          });
          this.cdr.markForCheck();
      }
    }
  }
}
