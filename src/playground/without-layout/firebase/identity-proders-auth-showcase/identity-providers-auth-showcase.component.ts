import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, share, take } from 'rxjs/operators';
import { NbAuthResult, NbAuthService, NbAuthToken } from '@nebular/auth';

import { FirebaseAPIService } from '../firebase-api.service';

@Component({
  selector: 'npg-google-auth-showcase',
  templateUrl: './identity-providers-auth-showcase.component.html',
  styleUrls: ['./identity-providers-auth-showcase.component.scss'],
})
export class IdentityProvidersAuthShowcaseComponent {
  userToken$: Observable<NbAuthToken>;
  isAuthenticated$: Observable<boolean>;
  data$: Observable<any>;

  constructor(
    private firebaseApi: FirebaseAPIService,
    private authService: NbAuthService,
  ) {
    this.userToken$ = this.authService.onTokenChange();
    this.isAuthenticated$ = this.authService.onAuthenticationChange();
  }

  logout() {
    this.authService
      .logout('google')
      .pipe(take(1))
      .subscribe((authResult: NbAuthResult) => {});
  }

  loginWithGoogle() {
    this.authService
      .authenticate('google')
      .pipe(take(1))
      .subscribe((authResult: NbAuthResult) => {});
  }

  getData() {
    this.data$ = this.firebaseApi.getGreeting().pipe(
      take(1),
      catchError((error) => of(error)),
      share(),
    );
  }
}
