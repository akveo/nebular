import { Component, OnInit } from '@angular/core';
import { NbAuthService } from '../../../../framework/auth/services/auth.service';
import { NbAuthToken } from '../../../../framework/auth/services/token/token';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Component({
  selector: 'nb-firebase-auth-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class FirebaseAuthResultComponent implements OnInit {

  userToken$: Observable<NbAuthToken>;
  afUser$: Observable<User | null>;

  private destroyed$ = new Subject<void>();

  constructor(
    private authService: NbAuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
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
      .subscribe((res) => console.log('result of token refresh', res));
  }

  requestPassword() {
    this.router.navigateByUrl('/firebase/request-password');
  }

  resetPassword() {
    this.router.navigateByUrl('firebase/reset-password');
  }
}
