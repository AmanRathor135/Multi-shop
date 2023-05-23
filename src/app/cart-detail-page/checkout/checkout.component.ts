import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {

  cartProductList:any;
  totalAmount:number = 0;
  currency: any;
  shippingAmount:number = 10;
  isChecked:boolean = false;
  submitted:boolean = false;

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
    shipToDifferAddress: new FormControl(false, [Validators.required])
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

  constructor(private service:ProductService) {
    this.service.currency.subscribe((res: any) => {
      if (res) {
        this.currency = res;
      }
    });

    this.cartProductList = localStorage.getItem('addCartItem');
    this.cartProductList = JSON.parse(this.cartProductList);


    this.totalPrice();
    
  }

  get billingForm(): { [key: string]: AbstractControl } {
    return this.billingAddressForm.controls;
  }
  get shippingForm(): { [key: string]: AbstractControl } {
    return this.shippingAddressForm.controls;
  }

  totalPrice() {
    for (let i = 0; i < this.cartProductList.length; i++) {
      this.totalAmount += this.cartProductList[i].price * this.cartProductList[i].quantity;
    }
  }

  check(){
    this.isChecked = !this.isChecked;
  }
}
