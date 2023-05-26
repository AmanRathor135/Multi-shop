import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject } from 'rxjs';

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
  
  getBannerPoster(){
    return this.service.getReq('http://192.168.1.178:1108/poster');
  };

  fetchLimitedProducts(){
    return this.service.getReq('http://192.168.1.178:1108/products?limit=8');
  };

  getAllProducts(){
    return this.service.getReq('http://192.168.1.178:1108/products');
  };

  getAllCategories() {
    return this.service.getReq('http://192.168.1.178:1108/products/categories');
  };

  getSpecificCategory(params?: any) {
    return this.service.getReq(
      `http://192.168.1.178:1108/products/categories/${params}`
    );
  };

  getSingleProduct(params?:any){
    return this.service.getReq(`http://192.168.1.178:1108/products/${params}`);
  }

  getAllProductInDesc(){
    return this.service.getReq('http://192.168.1.178:1108/products?sort=desc');
  };

  getCurrencyPrice(){
    return this.service.getReq(`https://api.freecurrencyapi.com/v1/latest?apikey=sgiPfh4j3aXFR3l2CnjWqdKQzxpqGn9pX5b3CUsz&base_currency=USD`);
  };

  vendorSliderList(){
    return this.service.getReq('http://192.168.1.178:1108/vendors');
  }

  signUpEmail(data:any){
    return this.service.postReq('http://192.168.1.178:1108/signup',data)
  }
}
