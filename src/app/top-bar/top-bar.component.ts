import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
  user:string = 'My Account'
  totalCartProduct: any = 0;
  totalFavoriteProduct: any = 0;
  subscription: Subscription[] = [];
  currencyName: any = 'USD';

  DropDownMenu1: any[] = ['Sign in', 'Sign up', 'Logout'];
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
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.service.currency.next(localStorage.getItem('currency'));
    this.service.totalCartItems.next(true);

    let sub1 = this.service.totalCartItems.subscribe((res: any) => {
      if (res) {
        this.getTotalCartProduct();
        this.cdr.markForCheck();
      }
    });
    this.subscription.push(sub1);

    let sub2 = this.service.totalFavoriteItems.subscribe((res: any) => {
      this.totalFavoriteProduct = res;
      this.cdr.markForCheck();
    });
    this.subscription.push(sub2);
  }

  getTotalCartProduct() {
    if (localStorage.getItem('addCartItem')) {
      let total: any = localStorage.getItem('addCartItem');
      this.totalCartProduct = JSON.parse(total).length;
      this.cdr.markForCheck();
    }
  }

  currency(event: any) {
    this.currencyName = event;
    localStorage.setItem('currency', event);
    this.service.currency.next(localStorage.getItem('currency'));
  }

  changeLanguage(lang: any) { 
    this.currentLanguage = lang;
    document.cookie = 'googtrans=' + `/en/${lang.toLowerCase()}`;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      location.reload();
    });
  };

  accountHandler(item:any){
    if(item == 'Sign in'){
      this.router.navigate(['/auth']);
    }
    else if (item == 'Sign up'){
      this.router.navigate(['/auth/register']);
    }
    else{
      console.log("logout",item);
    }
  }

  Search(data: any) {
    let url = `Shop/shop/${data.value.data}`;
    if (data) {
          this.router.navigate([url], {queryParams: {search:data.value.data}}); // navigate to shop component route
    }
    this.value = '';
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscriptionRow: any) => {
      subscriptionRow.unsubscribe();
    });
  }
}
