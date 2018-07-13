import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NbAuthService } from '../auth.service';
import { NbAuthToken} from '../token/token';
import { Router } from '@angular/router';


@Injectable()
export class NbAuthJWTInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // do not intercept request whose urls are public (here auth-urls)
    if (! this.authService.getAuthUrls().includes(req.url)) {
      return this.authService.isAuthenticated()
        .pipe(
          switchMap(authenticated => {
            if (authenticated) {
                return this.authService.getToken().pipe(
                  switchMap( (token: NbAuthToken) => {
                    const JWT = `Bearer ${token.getAccessToken()}`;
                    req = req.clone({
                      setHeaders: {
                        Authorization: JWT,
                      },
                    });
                    return next.handle(req);
                  }),
                )
            } else {
               this.router.navigate(['auth/login']);
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

  protected get router(): Router {
    return this.injector.get(Router);
  }


}
