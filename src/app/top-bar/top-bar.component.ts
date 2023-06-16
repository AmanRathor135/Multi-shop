import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnDestroy, OnInit,} from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent implements OnInit, OnDestroy {
  searchText!: string;
  value: any = '';
  currentLanguage: any;
  user:any = 'My Account';
  totalCartProduct: any;
  totalFavoriteProduct: any;
  subscription: Subscription[] = [];
  currencyName: any = 'USD';
  helper:any = new JwtHelperService();

  DropDownMenu1: any[] = ['Sign in', 'Sign up'];
  DropDownMenu2: any[] = ['USD', 'EUR', 'GBP', 'CAD', 'INR'];
  DropDownMenu3: any[] = ['EN', 'HI', 'FR', 'AR', 'RU'];
  
  topBarList: any[] = [
    { name: 'About', route: 'Home' },
    { name: 'Contact', route: 'contact' },
    { name: 'Help', route: 'page-not-found' },
    { name: 'FAQs', route: 'faq' },
  ];

  shopDetails: any = {
    first: 'multi',
    last: 'shop',
    service: 'Customer Service',
    phone: '+012 345 6789',
  };

  constructor(
    private service: ProductService,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.service.currency.next(localStorage.getItem('currency'));
    this.service.isLoggedIn.next(true);
    this.calculateTotalCartItems();
    this.calculateTotalFavoriteItems();
    this.getLoggedInUserName();
  }

  // Counting the Cart Items which is Selected using Product Service's Behavior Subject
  calculateTotalCartItems(){
    let sub1 = this.service.totalCartItems.subscribe((res: any) => {
      this.totalCartProduct = res;
      this.cdr.markForCheck();
    });
    this.subscription.push(sub1);
  };

  // Counting the Favorite Items which is Selected using Product Service's Behavior Subject
  calculateTotalFavoriteItems(){
    let sub2 = this.service.totalFavoriteItems.subscribe((res: any) => {
      this.totalFavoriteProduct = res;
      this.cdr.markForCheck();
    });
    this.subscription.push(sub2);
  };
  
  // Getting the User's Name which is Logged in recently
  getLoggedInUserName(){
    let sub3 = this.service.isLoggedIn.subscribe((res:any) => {
      if(res){ 
        this.decodeUserName();
      }
    });
    this.subscription.push(sub3);
  };

  // Decoding the UserName from local storage
  decodeUserName(){
    if(localStorage.getItem('token')){
      this.DropDownMenu1 = ['My Profile', 'Logout'];
      let name = localStorage.getItem('token');
      this.user = this.helper.decodeToken(name);
      this.user = this.user.name;
    };
  };

  /**
   * Selected the currency and Stored it in local storage and using in Product Service's Behavior Subject
   * @param event is Selected Currency Name
   */
  currency(event: any) {
    this.currencyName = event;
    localStorage.setItem('currency', event);
    this.service.currency.next(localStorage.getItem('currency'));
  };


  /**
   * setting the selected language in cookie
   * @param lang is selected language
   */
  changeLanguage(lang: any) { 
    this.currentLanguage = lang;
    document.cookie = 'googtrans=' + `/en/${lang.toLowerCase()}`;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      location.reload();
    });
  };

  /**
   * Based on their selected name it is redirect to on that page
   * @param item is Selected Item name
   */
  accountHandler(item:any){
    item=='Sign in'?this.router.navigate(['/auth']):item=='Sign up'?this.router.navigate(['/auth/register']):this.logOutUser();
  };

  /**
   * Navigate to Shop Component Route and use data as QueryParams to find the Products in Shop Component Page
   * @param data is a input data
   */
  Search(data: any) {
    let url = `Shop`;
    if (data && !(data.value.data == '')) {
      this.router.navigate([url], {queryParams: {search:data.value.data}}); 
    }
    this.value = '';
  };

  // Logging out user and removed token from local storage and redirect to Home Page
  logOutUser(){
    this.service.isLoggedIn.next(false);
    let sub4 = this.authService.loggedOut().subscribe({
      next: (res:any) => {
        if(res.type == 'success'){
          localStorage.removeItem('token');
          this.user = 'My Account';
          this.toastr.success(res.message);
        }
      },
      error: (err:any) => { console.log("LogOut Error",err); },
      complete: () => { 
        this.router.navigate(['/']).then(() => { window.location.reload(); });
        this.cdr.markForCheck(); 
      }
    });
    this.subscription.push(sub4);
  }

  ngOnDestroy(): void {
    // Removes all the subscriptions to avoid memory leak issue
    this.subscription.forEach((subscriptionRow: any) => {
      subscriptionRow.unsubscribe();
    });
  };
}
