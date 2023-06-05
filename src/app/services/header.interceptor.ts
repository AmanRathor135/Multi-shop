import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token;
    if(localStorage.getItem('token')){
      token = localStorage.getItem('token');
    }
    else{
      token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDc5YjE1MjZkMzAxZTI0MzI2MzI4ZTQiLCJpYXQiOjE2ODU5MzYyNzh9.9fMAYH80Vfjx-DuPYdRar5YaJ1LnMZ1Qfuj2j4nUWwk`;
    }
    
    if (token) {
      request = request.clone({
        headers: request.headers.set('token', token),
      });
    }
    else{
      
    }
    return next.handle(request);
  }
}
