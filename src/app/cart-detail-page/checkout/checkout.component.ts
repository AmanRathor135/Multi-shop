import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  currency: any;
  currencyPrice: any;
  selectedIndex:any;
  addressId:any;
  paymentVia:any;
  totalAmount: number = 0;
  shippingAmount: number = 10;
  subscription:Subscription[] = [];
  addressList:any[] = [];
  orderData:any = {};
  isShippingAddressActive:boolean = false;
  submitted: boolean = false;
  hidden:boolean = true;
  paymentOptions:any[] = [
    { value:'select', name:'Select Payment Method',}, { value:'Cash on Delivery', name:'Cash on Delivery',},
    { value:'Google Pay', name:'Google Pay',}, { value:'Paytm', name:'Paytm',}, { value:'Paypal', name:'Paypal'},
    { value:'Direct Check', name:'Direct Check',}, { value:'Bank Transfer', name:'Bank Transfer',},
    { value:'PhonePe', name:'PhonePe',},
  ];

  billingAddressForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),]),
    mobile: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(12),
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
    shipToDifferAddress: new FormControl(false),
  });

  // shippingAddressForm: FormGroup = new FormGroup({
  //   firstName: new FormControl('', [Validators.required]),
  //   lastName: new FormControl('', [Validators.required]),
  //   email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),]),
  //   mobile: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(12),
  //     Validators.pattern('^[0-9]+$'),
  //   ]),
  //   address: new FormGroup({
  //     line1: new FormControl('', [Validators.required]),
  //     line2: new FormControl('', [Validators.required]),
  //     country: new FormControl('', [Validators.required]),
  //     city: new FormControl('', [Validators.required]),
  //     state: new FormControl('', [Validators.required]),
  //     zipCode: new FormControl('', [Validators.required]),
  //   }),
  // });

  constructor(private service: ProductService,private router:Router, private cdr:ChangeDetectorRef, private toastr:ToastrService) {
    this.getBreadcrumb();
  }

  ngOnInit(): void { 
    this.getCartProductList();
    this.getAddressList();
    this.service.cartItemsCount();
    this.service.favoriteItemsCount();
    this.getCurrencyName();
    this.orderData.shippingAmount = this.shippingAmount;
  }
  
  click(){
    this.hidden = true;
    this.billingAddressForm.reset();
  };

  addNewAddress(){
    this.hidden = false;
    if(this.addressList[this.selectedIndex]?._id){
      delete this.addressList[this.selectedIndex]?._id
    }
    this.billingAddressForm.reset();
  };

  // Using billingForm in HTML as a billingAddressForm.controls
  get billingForm(): { [key: string]: AbstractControl } {
    return this.billingAddressForm.controls;
  };
  
  // Using shippingForm in HTML as a shippingAddressForm.controls
  // get shippingForm(): { [key: string]: AbstractControl } {
  //   return this.shippingAddressForm.controls;
  // };

  // Getting Cart Items using Product Service's API
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
  };

  // get Total Amount of cartProductList
  totalPrice() {
    for (let i = 0; i < this.cartProductList?.length; i++) {
      this.totalAmount += this.cartProductList[i].price * this.cartProductList[i].quantity;
    }
    this.orderData.total = this.totalAmount;    
  };
  
  // Adding and Updating the address using Product Service POST and PUT method 
  saveAddress(){
    this.submitted = true;
    let apiCall:any;

    if(this.addressList[this.selectedIndex]?._id){
      if(this.billingAddressForm.valid){
        apiCall = this.service.updateAddress(this.billingAddressForm.value,this.addressList[this.selectedIndex]?._id);
      }
    }
    else{
      if (this.billingAddressForm.valid) {
        apiCall = this.service.addAddress(this.billingAddressForm.value);
      }
    }

    let sub3 = apiCall.subscribe({
      next: (res:any) => {
        this.submitted = false;
        this.hidden = true;
        if(res.type == 'success'){ this.toastr.success(res.message); }
        this.getAddressList();
      },
      error: (err:any) => { console.log("error in adding an address",err);},
      complete: () => { 
        this.billingAddressForm.reset();
        this.cdr.markForCheck();
      }
    });
    this.subscription.push(sub3);
  };

  // Get address list form Product service GET method
  getAddressList(){
    this.service.getAddress().subscribe({
      next: (res:any) => {  
        console.log("Address List",res.data);
        this.addressList = res.data; 
        this.getBillingAddressId(this.addressList[0])
      },
      error: (err:any) => { console.log("Error in getting address", err); },
      complete: () => { this.cdr.markForCheck(); }
    });
  };

  /**
   * Delete the address using Product Service DELETE method
   * @param addressId is a id of a selected address
   */
  removeAddress(addressId:any){
    let result = confirm("Do You want to Remove the Address?");
    if(result){
      if (this.addressList.length) {
        this.service.removeAddress(addressId).subscribe({
        next: (res:any) => {
          if(res.type == 'success'){
            this.toastr.success(res.message);
            this.getAddressList();
          }
        },
        error: (err:any) => { console.log("Error in removing address",err); },
        complete: () => { this.cdr.markForCheck(); }
        });
      }
    }
  };

  // updating address
  updateAddress(address:any, index:any){
    this.selectedIndex = index;
    this.hidden = false;
    this.billingAddressForm.patchValue(address[this.selectedIndex]);
  };

  // Selecting BillingId
  getBillingAddressId(addressData:any){  
      this.orderData.billingId = addressData?._id;
      this.orderData.isDifferentShipping = false;
  };

  // Selecting ShippingId
  getShippingAddressId(addressData:any){
    this.orderData.shippingId = addressData?._id
    this.orderData.isDifferentShipping = true;
    console.log("shippingId ==>",this.orderData);
  };

  // Selecting Payment Method
  paymentMethod(value:any){
    this.paymentVia = value;
    this.orderData.payment = this.paymentVia;
    console.log("Payment method ==>",this.orderData);
  };

  // Place Order using Product Service POST method
  placeOrder() {
    let data = this.orderData;
    this.service.addOrder(data).subscribe({
      next: (res:any) => { 
        if(res.type == 'success'){
          this.toastr.success(res.message);
          this.router.navigate(['cart-detail/order-history']);
        } else { this.toastr.error(res.message); }
       },
      error: (err:any) => { console.log("place order error",err); }, 
      complete: () => { this.cdr.markForCheck(); }
    });
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
