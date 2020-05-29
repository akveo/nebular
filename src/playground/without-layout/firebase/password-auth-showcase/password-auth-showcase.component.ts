import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbAuthService } from '../../../../framework/auth/services/auth.service';
import { NbAuthToken } from '../../../../framework/auth/services/token/token';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseAPIService } from '../firebase-api.service';
import { catchError, share, take, tap } from 'rxjs/operators';

@Component({
  selector: 'nb-password-auth-showcase',
  templateUrl: './password-auth-showcase.component.html',
  styleUrls: ['./password-auth-showcase.component.scss'],
})
export class PasswordAuthShowcaseComponent {

  userToken$: Observable<NbAuthToken>;
  isAuthenticated$: Observable<boolean>;
  data$: Observable<any>;

  constructor(
    private authService: NbAuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private firebaseApi: FirebaseAPIService,
  ) {
    this.userToken$ = this.authService.onTokenChange().pipe(tap((isAuth) => console.log(isAuth)));
    this.isAuthenticated$ = this.authService.isAuthenticated().pipe(tap((isAuth) => console.log(isAuth)));
  }

  logout() {
    this.router.navigateByUrl('/firebase/logout');
  }

  login() {
    this.router.navigateByUrl('/firebase/login');
  }

  resetPassword() {
    this.router.navigateByUrl('firebase/reset-password');
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
