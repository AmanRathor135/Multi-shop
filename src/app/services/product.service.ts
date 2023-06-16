import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { AsyncSubject, BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private service: HttpService) {}

  Breadcrumb = new BehaviorSubject([
    { pageTitle: 'Home', url: '' },
  ]);  

  totalCartItems = new BehaviorSubject<number>(0);
  totalFavoriteItems = new BehaviorSubject<number>(0);
  isLoggedIn = new BehaviorSubject<boolean>(false);
  currency = new BehaviorSubject<any>(localStorage.getItem('currency'));
  currencyValue = new BehaviorSubject<any>({ USD: 1 });
  filterItem = new BehaviorSubject<any>(localStorage.getItem('filter'));

  getBannerPoster(): Observable<any> {
    return this.service.getReq('http://192.168.1.175:5050/');
  };

  // Common API
  getFilteredProducts(data:any): Observable<any> {    
    return this.service.postReq('http://192.168.1.175:5050/products',data);
  };

  filterOptions(): Observable<any> {
    return this.service.getReq('http://192.168.1.175:5050/products/filters');
  };
  
  getAllCategories(): Observable<any> {
    return this.service.getReq('http://192.168.1.175:5050/categories');
  };
    
  getSingleProduct(params?: any): Observable<any> {
      return this.service.postReq(`http://192.168.1.175:5050/products/${params}`,{});
  };
     
  getCurrencyPrice(): Observable<any> {
    return this.service.getReq(
      `https://api.freecurrencyapi.com/v1/latest?apikey=sgiPfh4j3aXFR3l2CnjWqdKQzxpqGn9pX5b3CUsz&base_currency=USD`
    );
  };
  
  // favorite API
  addProductInFavorites(data:any): Observable<any>{
    return this.service.postReq('http://192.168.1.175:5050/products/favourite',data)
  };

  getFavoriteProduct(): Observable<any> {
    return this.service.getReq('http://192.168.1.175:5050/products/favourite')
  };

  removeFavoriteProduct(params:any): Observable<any> {
    return this.service.deleteReq(`http://192.168.1.175:5050/products/favourite/remove/${params}`)
  };

  // cart API
  InsertInCart(data:any): Observable<any> {
    return this.service.postReq('http://192.168.1.175:5050/products/cart',data);
  };
  
  cartProductList(): Observable<any> {
    return this.service.getReq('http://192.168.1.175:5050/products/cart');
  };

  removeCartProduct(params:any): Observable<any> {
    return this.service.deleteReq(`http://192.168.1.175:5050/products/cart/remove/${params}`);
  };
      
  vendorSliderList(): Observable<any> {
    return this.service.getReq('http://192.168.1.175:5050/company');
  };
      
  newsletterSignUpEmail(data: any): Observable<any> {
    return this.service.postReq('http://192.168.1.175:5050/newsletter',data);
  };
    
  contactUsForm(data:any): Observable<any> {  
    return this.service.postReq('http://192.168.1.175:5050/contact-us',data);
  };
  
  addAddress(data:any): Observable<any> {
    return this.service.postReq('http://192.168.1.175:5050/users/address',data);
  };

  getAddress(): Observable<any> {
    return this.service.getReq('http://192.168.1.175:5050/users/address');
  };

  updateAddress(data:any,params:any): Observable<any> {
    return this.service.putReq(`http://192.168.1.175:5050/users/address/${params}`,data);
  };

  removeAddress(params:any): Observable<any> {
    return this.service.deleteReq(`http://192.168.1.175:5050/users/address/remove/${params}`);
  };

  addOrder(data:any): Observable<any> {
    return this.service.postReq('http://192.168.1.175:5050/products/order',data)
  };

  getOrderList(): Observable<any> {
    return this.service.getReq('http://192.168.1.175:5050/products/order')
  }

  cartItemsCount(){
    this.cartProductList().subscribe({
      next: (res:any) => { this.totalCartItems.next(res.data?.length); },
      error: (err:any) => { console.log("cart List error", err); },
      complete: () => { }
    });
  };

  favoriteItemsCount(){
    this.getFavoriteProduct().subscribe({
      next: (res:any) => { this.totalFavoriteItems.next(res.data?.length); },
      error: (err:any) => { console.log("wishlist Error", err); },
      complete: () => { }
    });
  };
}

