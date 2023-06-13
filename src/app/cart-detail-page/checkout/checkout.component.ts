import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CheckoutComponent implements OnInit, OnDestroy {

  cartProductList: any;
  subscription:Subscription[] = [];
  addressList:any[] = [];
  totalAmount: number = 0;
  currency: any;
  currencyPrice: any;
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
    address:new FormGroup({
      line1: new FormControl('', [Validators.required]),
      line2: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required]),
    }),
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
    address: new FormGroup({
      line1: new FormControl('', [Validators.required]),
      line2: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required]),
    }),
  });

  constructor(private service: ProductService, private router: Router, private cdr:ChangeDetectorRef) {
    this.getBreadcrumb();
  }

  ngOnInit(): void { 
    this.getCartProductList();
    this.service.cartItemsCount();
    this.service.favoriteItemsCount();
    this.getCurrencyName();
  }

  // Using billingForm in HTML as a billingAddressForm.controls
  get billingForm(): { [key: string]: AbstractControl } {
    return this.billingAddressForm.controls;
  }
  
  // Using shippingForm in HTML as a shippingAddressForm.controls
  get shippingForm(): { [key: string]: AbstractControl } {
    return this.shippingAddressForm.controls;
  }

  
  getCartProductList(){
    let sub1 = this.service.cartProductList().subscribe({
      next: (res:any) => {
        this.cartProductList = res?.data;  
        this.totalPrice();
      },
      error: (err:any) => { console.log("cart List error", err); },
      complete: () => { this.cdr.markForCheck();}
    });
    this.subscription.push(sub1);
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
  
  // get Price of Selected Currency from Local Storage
  getPrice() {
    let value: any = localStorage.getItem('currencyPrice');
    value = JSON.parse(value);
    this.currencyPrice = value[this.currency];
  }

  // get Total Amount of cartProductList
  totalPrice() {
    for (let i = 0; i < this.cartProductList?.length; i++) {
      this.totalAmount +=
        this.cartProductList[i].price * this.cartProductList[i].quantity;
    }
  }
  
  // If billingAddressForm is Valid then we navigate to Next Page else it gives error 
  placeOrder() {
    this.submitted = true;
    if (this.billingAddressForm.valid) {
      console.log("billingForm", this.billingAddressForm.value)
      console.log("shippingForm", this.shippingAddressForm.value)
    }
  }

  // Toggle the checkbox and show ShippingForm when it is Checked
  check() {
    this.isChecked = !this.isChecked;
  };

  // Set the Breadcrumb using Product Service
  getBreadcrumb(){
    this.service.Breadcrumb.next([
      { pageTitle: 'Home', url: '' },
      { pageTitle: 'Shop', url: 'Shop' },
      { pageTitle: 'Checkout', url: 'cart-detail/checkout' },
    ]);
  };

  ngOnDestroy(): void {
    // Removes all the subscriptions to avoid memory leak issue
    this.subscription.forEach((subscriptionRow:any) => {
      subscriptionRow.unsubscribe();
    });
  }
}
