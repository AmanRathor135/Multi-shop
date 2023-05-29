import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private service:HttpService) { }

  Breadcrumb = new BehaviorSubject( [
    {
      pageTitle: 'Home',
      url: '',
    },
  ]);

  totalCartItems= new BehaviorSubject<any>(false);
  totalFavoriteItems = new BehaviorSubject<number>(0);
  currency = new BehaviorSubject<any>(localStorage.getItem('currency'));
  currencyValue = new BehaviorSubject<any>({'USD':1})
  
  getBannerPoster():Observable<any> {
    return this.service.getReq('http://192.168.1.178:1108/poster');
  };

  fetchLimitedProducts(data?:any):Observable<any> {
    return this.service.postReq('http://192.168.1.178:1108/products',data);
  };

  getAllProducts():Observable<any> {
    return this.service.postReq('http://192.168.1.178:1108/products', {});
  };

  getAllCategories():Observable<any> {
    return this.service.getReq('http://192.168.1.178:1108/products/categories');
  };

  getSpecificCategory(params?: any):Observable<any>  {
    return this.service.getReq(
      `http://192.168.1.178:1108/products/categories/${params}`
    );
  };

  getSingleProduct(params?:any):Observable<any> {
    return this.service.getReq(`http://192.168.1.178:1108/products/${params}`);
  }

  getAllProductInDesc(data?:any):Observable<any> {
    return this.service.postReq('http://192.168.1.178:1108/products',data);
  };

  getCurrencyPrice():Observable<any> {
    return this.service.getReq(`https://api.freecurrencyapi.com/v1/latest?apikey=sgiPfh4j3aXFR3l2CnjWqdKQzxpqGn9pX5b3CUsz&base_currency=USD`);
  };

  vendorSliderList():Observable<any> {
    return this.service.getReq('http://192.168.1.178:1108/vendors');
  }

  signUpEmail(data:any):Observable<any> {
    return this.service.postReq('http://192.168.1.178:1108/signup',data)
  }
}
