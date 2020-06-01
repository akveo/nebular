import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FirebaseAPIService } from '../firebase-api.service';
import { NbAuthService } from '../../../../framework/auth/services/auth.service';
import { NbAuthToken } from '../../../../framework/auth/services/token/token';
import { catchError, share, take } from 'rxjs/operators';
import { NbAuthResult } from '../../../../framework/auth/services/auth-result';

@Component({
  selector: 'app-google-auth-showcase',
  templateUrl: './identity-providers-auth-showcase.component.html',
  styleUrls: ['./identity-providers-auth-showcase.component.scss'],
})
export class IdentityProvidersAuthShowcaseComponent {

  userToken$: Observable<NbAuthToken>;
  isAuthenticated$: Observable<boolean>;
  // afUser$: Observable<User | null>;
  data$: Observable<any>;

  constructor(
    private firebaseApi: FirebaseAPIService,
    private authService: NbAuthService,
  ) {
    this.userToken$ = this.authService.onTokenChange();
    this.isAuthenticated$ = this.authService.onAuthenticationChange();
  }

  logout() {
    this.authService.logout('google')
      .pipe(take(1))
      .subscribe((authResult: NbAuthResult) => {});
  }

  loginWithGoogle() {
    this.authService.authenticate('google')
      .pipe(take(1))
      .subscribe((authResult: NbAuthResult) => {});
  }

  getData() {
    this.data$ = this.firebaseApi.getGreeting()
      .pipe(
        take(1),
        catchError((error) => of(error)),
        share(),
      );
  }
}
