import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AsyncSubject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private service: HttpService) {}

  Breadcrumb = new BehaviorSubject([
    {
      pageTitle: 'Home',
      url: '',
    },
  ]);

  

  totalCartItems = new BehaviorSubject<any>(false);
  totalFavoriteItems = new BehaviorSubject<number>(0);
  currency = new BehaviorSubject<any>(localStorage.getItem('currency'));
  currencyValue = new BehaviorSubject<any>({ USD: 1 });
  filterItem = new BehaviorSubject<any>(localStorage.getItem('filter'));

  getBannerPoster(): Observable<any> {
    return this.service.getReq('http://192.168.1.175:5050/');
  };

  getFilteredProducts(data:any): Observable<any> {    
    return this.service.postReq('http://192.168.1.175:5050/products',data);
  };

  filterOptions(): Observable<any> {
    return this.service.getReq('http://192.168.1.175:5050/products/filters');
  };
  
  getAllCategories(): Observable<any> {
    return this.service.getReq('http://192.168.1.175:5050/categories');
  };
  
  // getSpecificCategory(params?: any): Observable<any> {
  //   return this.service.getReq(
  //     `http://192.168.1.175:5050/products/categories/${params}`
  //     );
  // };
    
  getSingleProduct(params?: any): Observable<any> {
      return this.service.postReq(`http://192.168.1.175:5050/products/${params}`,{});
  };
     
  getCurrencyPrice(): Observable<any> {
      return this.service.getReq(
        `https://api.freecurrencyapi.com/v1/latest?apikey=sgiPfh4j3aXFR3l2CnjWqdKQzxpqGn9pX5b3CUsz&base_currency=USD`
        );
  };
      
      
  vendorSliderList(): Observable<any> {
    return this.service.getReq('http://192.168.1.175:5050/company');
  };
      
  newsletterSignUpEmail(data: any): Observable<any> {
    return this.service.postReq('http://192.168.1.175:5050/details/newsletter',data);
  };
    
  contactUsForm(data:any): Observable<any> {
    return this.service.postReq('http://192.168.1.175:5050/details/contactUs',data);
  };
  
  billingAddressForm(data:any): Observable<any> {
    return this.service.postReq('http://192.168.1.175:5050/details/billing',data);
  };
}

