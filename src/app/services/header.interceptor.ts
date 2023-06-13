import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor,} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  token:any

  constructor(private authService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.token = localStorage.getItem('token');
    if (this.token) {
      request = request.clone({ headers: request.headers.set('token', this.token), });
    }
    return next.handle(request);
  }
}
