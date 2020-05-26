import { Component, OnInit } from '@angular/core';
import { NbAuthService } from '../../../../framework/auth/services/auth.service';
import { NbAuthToken } from '../../../../framework/auth/services/token/token';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'nb-firebase-auth-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class FirebaseAuthResultComponent implements OnInit {

  userToken$: Observable<NbAuthToken>;

  private destroyed$ = new Subject<void>();

  constructor(
    private authService: NbAuthService,
    private router: Router,
  ) {
    this.userToken$ = this.authService.onTokenChange();
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
}
