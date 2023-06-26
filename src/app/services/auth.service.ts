import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpService) { }

  SignUp(data:any): Observable<any> {    
    return this.http.postReq('http://192.168.1.175:5050/register',data);
  };

  SignIn(data:any): Observable<any> {
    return this.http.postReq('http://192.168.1.175:5050/login',data)
  };

  loggedOut(): Observable<any> {
    return this.http.postReq('http://192.168.1.175:5050/logout',{})
  };

  refreshToken(): Observable<any> {
    return this.http.postReq('http://192.168.1.175:5050/token-generate',{})
  };

  forgotPassword(data:any): Observable<any> {
    return this.http.postReq('http://192.168.1.175:5050/forgot-password', data)
  };

  resetPassword(data:any): Observable<any> {
    return this.http.postReq('http://192.168.1.175:5050/reset-password', data)
  }
}
