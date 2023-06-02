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
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDc5YjE1MjZkMzAxZTI0MzI2MzI4ZTQiLCJlbWFpbCI6ImpheUBnbWFpbC5jb20iLCJpYXQiOjE2ODU3MDY1MjZ9.mtmK9rgHyACXYsETz9dnxnnBmVO1eGDpQ4S6MkqugJc`;
    if (token) {
      request = request.clone({
        headers: request.headers.set('token', token),
      });
    }
    return next.handle(request);
  }
}
