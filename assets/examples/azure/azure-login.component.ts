import { Component, OnDestroy } from '@angular/core';
import { NbAuthResult, NbAuthService } from '@nebular/auth';
import { takeWhile } from 'rxjs/operators';
import { AuthAzureToken } from './azure-adb2c-auth-strategy';

@Component({
  selector: 'nb-playground-azure',
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-body>
            <p>Current User Authenticated: {{ !!token }}</p>
            <p>Current User Token: {{ token|json }}</p>

            <button nbButton status="success" *ngIf="!token" (click)="login()">Sign In with Azure</button>
            <button nbButton status="warning" *ngIf="token" (click)="logout()">Sign Out</button>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class AzureLoginComponent implements OnDestroy {

  token: AuthAzureToken;

  alive = true;

  constructor(private authService: NbAuthService) {
    this.authService.onTokenChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe((token: AuthAzureToken) => {
        this.token = null;
        if (token && token.isValid()) {
          this.token = token;
        }
      });
  }

  login() {
    this.authService.authenticate('azure')
      .pipe(takeWhile(() => this.alive))
      .subscribe((authResult: NbAuthResult) => {
      });
  }

  logout() {
    this.authService.logout('azure')
      .pipe(takeWhile(() => this.alive))
      .subscribe((authResult: NbAuthResult) => {
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
