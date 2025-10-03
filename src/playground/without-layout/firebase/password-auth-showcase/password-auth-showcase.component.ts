import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of, share, take } from 'rxjs';
import { NbAuthService, NbAuthToken } from '@nebular/auth';

import { FirebaseAPIService } from '../firebase-api.service';

@Component({
    selector: 'nb-password-auth-showcase',
    templateUrl: './password-auth-showcase.component.html',
    styleUrls: ['./password-auth-showcase.component.scss'],
    standalone: false
})
export class PasswordAuthShowcaseComponent {

  userToken$: Observable<NbAuthToken>;
  isAuthenticated$: Observable<boolean>;
  data$: Observable<any>;

  constructor(
    private authService: NbAuthService,
    private router: Router,
    private firebaseApi: FirebaseAPIService,
    private route: ActivatedRoute,
  ) {
    this.userToken$ = this.authService.onTokenChange();
    this.isAuthenticated$ = this.authService.isAuthenticated();
  }

  logout() {
    this.router.navigate(['../logout'], { relativeTo: this.route });
  }

  login() {
    this.router.navigate(['../login'], { relativeTo: this.route });
  }

  resetPassword() {
    this.router.navigate(['../reset-password'], { relativeTo: this.route });
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
