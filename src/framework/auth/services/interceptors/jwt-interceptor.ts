import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators/switchMap';

import { NbAuthService } from '../auth.service';
import { NbAuthJWTToken } from '../token/token';

@Injectable()
export class NbAuthJWTInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.authService.getToken()
      .pipe(
        switchMap((token: NbAuthJWTToken) => {
          if (token) {
            const JWT = `Bearer ${token.getValue()}`;
            req = req.clone({
              setHeaders: {
                Authorization: JWT,
              },
            });
          }
          return next.handle(req);
        }),
      );
  }

  protected get authService(): NbAuthService {
    return this.injector.get(NbAuthService);
  }
}
