import { Injectable, Injector} from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NbAuthToken} from '../token/token';
// import { NbAuthUrls } from '@nebular/auth/auth.urls';
import {
  // NB_AUTH_AUTHURLS,
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
  NbAuthService } from '@nebular/auth';

@Injectable()
export class NbAuthJWTInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // do not intercept request whose urls are filtered by the injected function
     // if(! this.authUrls.getUrls().includes(req.url))
      if (!this.filter(req)) {
      return this.authService.isAuthenticatedOrRefresh()
        .pipe(
          switchMap(authenticated => {
            if (authenticated) {
                return this.authService.getToken().pipe(
                  switchMap( (token: NbAuthToken) => {
                    const JWT = `Bearer ${token.getValue()}`;
                    req = req.clone({
                      setHeaders: {
                        Authorization: JWT,
                      },
                    });
                    return next.handle(req);
                  }),
                )
            }  else {
               // this.router.navigate(['auth/login']);
                return next.handle(req);
             }
          }),
        )
  } else {
      return next.handle(req);
    }
  }

  protected get authService(): NbAuthService {
    return this.injector.get(NbAuthService);
  }

  /** protected get authUrls(): NbAuthUrls{
    return this.injector.get(NB_AUTH_AUTHURLS);
  } **/

  protected get filter(): (req: any) => boolean {
    return this.injector.get(NB_AUTH_TOKEN_INTERCEPTOR_FILTER);
}

}



