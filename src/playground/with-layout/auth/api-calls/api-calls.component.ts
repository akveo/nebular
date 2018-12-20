/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { NbAuthResult, NbAuthService, NbAuthToken, NB_AUTH_OPTIONS } from '@nebular/auth';
import { getDeepFromObject } from '../../../../framework/auth/helpers';
import { Wine } from './wine';

@Component({
  selector: 'nb-playground-api-calls',
  template: `
    <router-outlet></router-outlet>
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-body>
            <h2>You are authenticated</h2>
            <p>You can call the secured API</p>
            <button nbButton status="primary" (click)="loadWines()">Call API</button>
            <button nbButton status="primary" (click)="logout()">Sign out</button>
          </nb-card-body>
        </nb-card>
        <nb-card *ngIf="(wines$ | async)?.length">
          <nb-card-header>
            Alain'wines
          </nb-card-header>
          <nb-list>
            <nb-list-item *ngFor="let wine of wines$ | async">
              {{ wine.region }}, {{ wine.name }} ({{ wine.year }})
            </nb-list-item>
          </nb-list>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})

export class PlaygroundApiCallsComponent {

  token: NbAuthToken;
  wines$: Observable<Wine[]>;
  redirectDelay: number = 0;
  strategy: string = '';

  constructor(private authService: NbAuthService,
              private http: HttpClient,
              private router: Router,
              @Inject(NB_AUTH_OPTIONS) protected options = {}) {

    this.redirectDelay = this.getConfigValue('forms.logout.redirectDelay');
    this.strategy = this.getConfigValue('forms.logout.strategy');

    this.authService.onTokenChange()
      .subscribe((token: NbAuthToken) => {
        this.token = null;
        if (token && token.isValid()) {
          this.token = token;
        }
      });
  }

  logout() {
    this.authService.logout(this.strategy)
      .pipe(
        delay(this.redirectDelay),
      )
      .subscribe((result: NbAuthResult) => this.router.navigate(['/auth/login']));
  }

  loadWines() {
    this.wines$ = this.http.get<Wine[]>('http://localhost:4400/api/wines')
      .pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.router.navigate(['/auth/login']);
          }
          return observableOf([]);
        }),
      );
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
