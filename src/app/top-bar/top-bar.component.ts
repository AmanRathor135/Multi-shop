import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  searchText!: string;
  value:any = '';
  currentLanguage:any;
  currencyValue:any[] = [];
  DropDownMenu1: any[] = ['My Account', 'Sign in', 'Sign up'];
  DropDownMenu2: any[] = ['USD', 'EUR', 'GBP', 'CAD', 'INR'];
  DropDownMenu3: any[] = ['EN', 'HI', 'GU', 'FR', 'AR', 'RU'];
  
  topBarList: any[] = [
    {
      name:'About',
      route:'Home'
    }, 
    { 
      name:'Contact',
      route:'contact'
    }, 
    { 
      name:'Help',
      route:'page-not-found'
    }, 
    {
      name:'FAQs',
      route:'faq'
    }
  ];

  details: any = {
    first: 'multi',
    last: 'shop',
    service: 'Customer Service',
    phone: '+012 345 6789',
  };

  constructor(private service: ProductService, private router:Router) {
    service.currency.next(localStorage.getItem('currency'));
  }

  currency(event: any) {
    localStorage.setItem('currency', event);
    this.service.currency.next(localStorage.getItem('currency'));
  }

  changeLanguage(lang:any){
    this.currentLanguage = lang;
    document.cookie = 'googtrans='+`/en/${lang.toLowerCase()}`;
    location.reload();
  }

  Search(data:any){
    let url = `Shop/shop/${data.value.data}`
    if(data){
      this.router.navigateByUrl('/', { skipLocationChange: true })
        .then(() => {
          setTimeout(() => {
            this.router.navigate([url]); // navigate to shop component route
          }, 1);
      });
    }
    this.value = '';
  }
}
