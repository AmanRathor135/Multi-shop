import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private service:HttpService) { }

  fetchLimitedProducts(){
    return this.service.getReq('https://fakestoreapi.com/products?limit=8');
  }

  getAllProducts(){
    return this.service.getReq('https://fakestoreapi.com/products')
  }

  getAllCategories() {
    return this.service.getReq('https://fakestoreapi.com/products/categories')
  }
  getSpecificCategory(params?: any) {
    return this.service.getReq(
      `https://fakestoreapi.com/products/category/${params}`
    );
  }

  getSingleProduct(params?:any){
    return this.service.getReq(`https://fakestoreapi.com/products/${params}`)
  }
}
