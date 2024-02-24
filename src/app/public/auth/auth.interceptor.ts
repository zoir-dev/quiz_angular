import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  readonly TOKEN_HEADER_KEY = 'Authorization';
  constructor(private authService: AuthService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authRequest = request;
    let token = this.authService.getToken();

    if (token != null) {
      authRequest = request.clone({
        headers: request.headers.set(this.TOKEN_HEADER_KEY, 'Bearer ' + token),
      });
    }

    return next.handle(authRequest);
  }
}
