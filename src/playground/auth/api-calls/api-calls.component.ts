/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {Component, Inject} from '@angular/core';
import { NbAuthResult, NbAuthService, NbAuthToken } from '@nebular/auth';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import { Wine } from './wine';
import { Router } from '@angular/router';
import { getDeepFromObject } from '@nebular/auth/helpers';
import { NB_AUTH_OPTIONS } from '@nebular/auth';

@Component({
  selector: 'nb-playground-api-calls',
  styles: [`
  `],
  template: `
    <router-outlet></router-outlet>
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-body class="col-xl-4 col-lg-6 col-md-8 col-sm-12" style="margin:auto;">
            <h2 style="text-align: center;">You are authenticated</h2>
            <p style="text-align: center">You can call the secured API</p>
              <div style="margin: 10px auto; width: 100px;">
                <button class="btn btn-info" (click)="loadWines()">Call API</button>
              </div>
              <div style="margin: 10px auto; width: 100px;">
                <button class="btn btn-warning"(click)="logout()">Sign Out</button>
              </div>
          </nb-card-body>
        </nb-card>
        <nb-card *ngIf="wines" size="medium">
          <nb-card-header>
            Alain'wines
          </nb-card-header>
          <nb-card-body>
            <nb-list >
              <nb-list-item *ngFor="let wine of wines">
                {{wine.region}}, {{ wine.name }} ({{wine.year}})
              </nb-list-item>
            </nb-list>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})



export class NbPlaygroundApiCallsComponent {

  token: NbAuthToken;
  wines: Wine[];
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
    this.authService.logout(this.strategy).subscribe((result: NbAuthResult) => {
      setTimeout(() => {
        return this.router.navigate(['/auth/login']);
      }, this.redirectDelay);
      // }
    });
  }

  loadWines() {
    this.wines = null;
    this.http.get<Wine[]>('http://localhost:4400/api/wines')
      .pipe(
        map( wines => {
            this.wines = wines;
          },
        ),
        catchError(err => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
             return this.router.navigate(['/auth/login']);
          }
        }),
      ).subscribe();
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
