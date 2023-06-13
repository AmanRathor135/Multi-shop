import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http:HttpService) { }

  // review API
  addReviewOnSpecificProduct(data:any): Observable<any> {
    return this.http.postReq('http://192.168.1.175:5050/products/review',data);
  };

  getReviewOfSpecificProduct(params?:any): Observable<any> {
    return this.http.getReq(`http://192.168.1.175:5050/products/review/${params}`, {})
  }
}
