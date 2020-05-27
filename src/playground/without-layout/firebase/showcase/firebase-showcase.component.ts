import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbAuthService } from '../../../../framework/auth/services/auth.service';
import { NbAuthToken } from '../../../../framework/auth/services/token/token';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { FirebaseAPIService } from '../firebase-api.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'nb-firebase-auth-showcase',
  templateUrl: './firebase-showcase.component.html',
  styleUrls: ['./firebase-showcase.component.scss'],
})
export class FirebaseAuthShowcaseComponent implements OnInit, OnDestroy {

  userToken$: Observable<NbAuthToken>;
  afUser$: Observable<User | null>;
  data$: Observable<any>;

  private destroyed$ = new Subject<void>();

  constructor(
    private authService: NbAuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private firebaseApi: FirebaseAPIService,
  ) {
    this.userToken$ = this.authService.onTokenChange();
    this.afUser$ = this.afAuth.authState;
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  logout() {
    this.router.navigateByUrl('/firebase/logout');
  }

  login() {
    this.router.navigateByUrl('/firebase/login');
  }

  refreshToken() {
    this.authService.refreshToken('password')
      .pipe(take(1))
      .subscribe(() => {});
  }

  requestPassword() {
    this.router.navigateByUrl('/firebase/request-password');
  }

  resetPassword() {
    this.router.navigateByUrl('firebase/reset-password');
  }

  loginWithGoogle() {
    this.authService.authenticate('google')
      .pipe(take(1))
      .subscribe(() => {});
  }

  getData() {
    this.data$ = this.firebaseApi.getAdmins();
  }
}
