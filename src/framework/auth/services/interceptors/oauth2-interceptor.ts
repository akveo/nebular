import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

import { NbAuthService } from '../auth.service';
import {NbOAuth2Token, NbTokenService} from '../token.service';

@Injectable()
export class NbOAuth2Interceptor implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.getToken()
      .switchMap((token: NbOAuth2Token) => {
        if (token) {
          const oAuthToken = `Bearer ${token.getValue()}`;
          req = req.clone({
            setHeaders: {
              Authorization: oAuthToken,
            },
          });
        }
        return next.handle(req);
      })
      .catch(err => {
        // TODO: need to handle refresh token case
        return Observable.throw(err);
      });
  }

  protected get authService(): NbAuthService {
    return this.injector.get(NbAuthService);
  }

  protected get tokenService(): NbTokenService {
    return this.injector.get(NbTokenService);
  }
}
