import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private http:HttpService) { }

  // favorite API
  addProductInFavorites(data:any): Observable<any>{
    return this.http.postReq('http://192.168.1.175:5050/products/favourite',data)
  };

  getFavoriteProduct(): Observable<any> {
    return this.http.getReq('http://192.168.1.175:5050/products/favourite')
  };

  removeFavoriteProduct(params:any): Observable<any> {
    return this.http.deleteReq(`http://192.168.1.175:5050/products/favourite/remove/${params}`)
  };
}
