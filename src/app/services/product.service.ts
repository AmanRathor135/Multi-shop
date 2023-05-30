import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject, Observable } from 'rxjs';

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

  getBannerPoster(): Observable<any> {
    return this.service.getReq('http://192.168.1.175:5050/posters');
  }

  getFeaturedProduct(): Observable<any> {
    return this.service.getReq(`http://192.168.1.175:5050/products/type/featured`,{})
  }

  getRecentProduct(): Observable<any> {
    return this.service.getReq(`http://192.168.1.175:5050/products/type/recent`,{})
  }

  fetchLimitedProducts(): Observable<any> {
    return this.service.getReq('http://192.168.1.175:5050/products/?limit=8');
  }

  filterOptions(): Observable<any> {
    return this.service.getReq('http://192.168.1.175:5050/products/filterOptions');
  }

  // getAllProducts():Observable<any> {
  //   return this.service.postReq('http://192.168.1.178:1108/products', {});
  // };
  getAllProducts(): Observable<any> {
    return this.service.getReq('http://192.168.1.175:5050/products');
  }

  getAllCategories(): Observable<any> {
    return this.service.getReq('http://192.168.1.175:5050/categories');
  }

  getSpecificCategory(params?: any): Observable<any> {
    return this.service.getReq(
      `http://192.168.1.175:5050/products/categories/${params}`
    );
  }

  getSingleProduct(params?: any): Observable<any> {
    return this.service.getReq(`http://192.168.1.175:5050/products/${params}`);
  }

  getAllProductInDesc(data?: any): Observable<any> {
    return this.service.postReq('http://192.168.1.175:5050/products/sorting', data);
  }

  FilterProducts(data?:any): Observable<any>{
    return this.service.postReq('http://192.168.1.175:5050/products/filter',data)
  }

  getCurrencyPrice(): Observable<any> {
    return this.service.getReq(
      `https://api.freecurrencyapi.com/v1/latest?apikey=sgiPfh4j3aXFR3l2CnjWqdKQzxpqGn9pX5b3CUsz&base_currency=USD`
    );
  }

  vendorSliderList(): Observable<any> {
    return this.service.getReq('http://192.168.1.175:5050/posters/company');
  }

  newsletterSignUpEmail(data: any): Observable<any> {
    return this.service.postReq('http://192.168.1.175:5050/details/newsletter', data);
  }

  contactUsForm(data:any): Observable<any> {
    return this.service.postReq('http://192.168.1.175:5050/details/contactUs',data);
  }

  billingAddressForm(data:any): Observable<any> {
    return this.service.postReq('http://192.168.1.175:5050/details/billing',data)
  }
}

