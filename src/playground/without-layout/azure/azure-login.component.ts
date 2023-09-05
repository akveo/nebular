/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnDestroy } from '@angular/core';
import { NbAuthResult, NbAuthService, NbAuthToken } from '@nebular/auth';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthAzureToken } from './azure-adb2c-auth-strategy';

@Component({
  selector: 'npg-playground-azure',
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-body>
            <p>Current User Authenticated: {{ !!token }}</p>
            <p>Current User Token: {{ token | json }}</p>

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

  private destroy$ = new Subject<void>();

  constructor(private authService: NbAuthService) {
    this.authService
      .onTokenChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((token: NbAuthToken) => {
        this.token = null;
        if (token && token.isValid()) {
          this.token = token as AuthAzureToken;
        }
      });
  }

  login() {
    this.authService
      .authenticate('azure')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {});
  }

  logout() {
    this.authService
      .logout('azure')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authResult: NbAuthResult) => {});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
