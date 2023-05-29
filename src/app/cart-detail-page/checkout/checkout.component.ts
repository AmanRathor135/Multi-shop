import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent implements OnInit {
  cartProductList: any;
  totalAmount: number = 0;
  currency: any;
  currencyPrice: any;
  favItemLength: any;
  shippingAmount: number = 10;
  isChecked: boolean = false;
  submitted: boolean = false;

  billingAddressForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(12),
      Validators.pattern('^[0-9]+$'),
    ]),
    address1: new FormControl('', [Validators.required]),
    address2: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
    shipToDifferAddress: new FormControl(false, [Validators.required]),
  });

  shippingAddressForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(12),
      Validators.pattern('^[0-9]+$'),
    ]),
    address1: new FormControl('', [Validators.required]),
    address2: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.required]),
  });

  constructor(private service: ProductService, private router: Router) {
    /**
     * Set the Breadcrumb using Product Service
     */
    service.Breadcrumb.next([
      { pageTitle: 'Home', url: '' },
      { pageTitle: 'Shop', url: 'Shop/shop' },
      { pageTitle: 'Checkout', url: 'cart-detail/checkout' },
    ]);
  }

  ngOnInit(): void {
    this.getFavoriteItems();

    /**
     * get Selected Currency Name using Behavior Subject of Product Service
     */
    this.service.currency.subscribe((res: any) => {
      if (res) {
        this.currency = res;
        this.getPrice();
      }
    });

    /**
     * get cartProductList from Local Storage
     */
    this.cartProductList = localStorage.getItem('addCartItem');
    this.cartProductList = JSON.parse(this.cartProductList);
    this.totalPrice();
  }

  /**
   * Using billingForm in HTML as a billingAddressForm.controls
   */
  get billingForm(): { [key: string]: AbstractControl } {
    return this.billingAddressForm.controls;
  }

  /**
   * Using shippingForm in HTML as a shippingAddressForm.controls
   */
  get shippingForm(): { [key: string]: AbstractControl } {
    return this.shippingAddressForm.controls;
  }

  /**
   * get Price of Selected Currency from Local Storage
   */
  getPrice() {
    let value: any = localStorage.getItem('currencyPrice');
    value = JSON.parse(value);
    this.currencyPrice = value[this.currency];
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
   * get Total Amount of cartProductList
   */
  totalPrice() {
    for (let i = 0; i < this.cartProductList.length; i++) {
      this.totalAmount +=
        this.cartProductList[i].price * this.cartProductList[i].quantity;
    }
  }
  
  /**
   * If billingAddressForm is valid then we navigate to next page
   * else it gives error
   */
  placeOrder() {
    this.submitted = true;
    if (this.billingAddressForm.valid) {
      this.router.navigate(['/page-not-found']);
    }
  }

  /**
   * If the Checkbox is checked then it shows the shippingForm
   * else it will hidden
   */
  check() {
    this.isChecked = !this.isChecked;
  }
}
