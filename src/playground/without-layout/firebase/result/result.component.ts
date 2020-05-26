import { Component, OnInit } from '@angular/core';
import { NbAuthService } from '../../../../framework/auth/services/auth.service';
import { NbAuthToken } from '../../../../framework/auth/services/token/token';
import { Observable } from 'rxjs';

@Component({
  selector: 'nb-firebase-auth-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class FirebaseAuthResultComponent implements OnInit {

  userToken$: Observable<NbAuthToken>;

  constructor(
    private authService: NbAuthService,
  ) {
    this.userToken$ = this.authService.onTokenChange();
  }

  ngOnInit(): void {
  }

}
