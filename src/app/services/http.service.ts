import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  // Http GET request handler
  /**
   * 
   * @param url api url name
   * @param params pass request details
   * @returns response array
   */
  getReq(url:string, params?:any){
    return this.http.get(url);
  }

  // Http POST request handler
  /**
   * 
   * @param url api url name
   * @param data request
   * @returns  api response
   */
  postReq(url:string, data:any){
    return this.http.post(url, data)
  }
}
