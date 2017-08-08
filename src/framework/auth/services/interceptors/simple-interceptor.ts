import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { NbAuthService } from '../auth.service';
import { NbAuthJWTToken } from '../token.service';

@Injectable()
export class NbAuthSimpleInterceptor implements HttpInterceptor {

  constructor(private injector: Injector, protected headerName: string = 'Authorization') {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.authService.getToken()
      .switchMap((token: NbAuthJWTToken) => {
        if (token) {
          req = req.clone({
            setHeaders: {
              [this.headerName]: token.getValue(),
            },
          });
        }
        return next.handle(req);
      });
  }

  protected get authService(): NbAuthService {
    return this.injector.get(NbAuthService);
  }
}
