import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpService) { }

  // cart API
  InsertInCart(data:any): Observable<any> {
    return this.http.postReq('http://192.168.1.175:5050/products/cart',data);
  };
  
  cartProductList(): Observable<any> {
    return this.http.getReq('http://192.168.1.175:5050/products/cart');
  };

  removeCartProduct(params:any): Observable<any> {
    return this.http.deleteReq(`http://192.168.1.175:5050/products/cart/remove/${params}`);
  };
}
