/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Inject } from '@angular/core';
import {
  NbAuthOAuth2Token,
  NbAuthResult,
  NbAuthService,
  NB_AUTH_OPTIONS,
  nbAuthCreateToken,
  NbAuthJWTToken,
} from '@nebular/auth';
import { Router } from '@angular/router';
import { getDeepFromObject } from '../../framework/auth/helpers';

@Component({
  selector: 'nb-playground-auth',
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card *ngIf="token">
          <nb-card-body><h2 class="title">{{getClaims(token.getValue()).email | json}} is currently authenticated</h2>
            <p></p>
            <p>Current User Access Token: {{ token.getValue() | json }}</p>
            <p>Current User Access Token Payload : {{getClaims(token.getValue()) | json}}</p>
            <p>Current User Refresh Token: {{ token.getRefreshToken() | json }}</p>
            <button class="btn btn-warning" *ngIf="token" (click)="logout()">Sign Out</button>
          </nb-card-body>
          <nb-card-body *ngIf="! token"><p>No User Authenticated</p></nb-card-body>
        </nb-card>
        <nb-card *ngIf="!token">
          <nb-card-body class="col-xl-4 col-lg-6 col-md-8 col-sm-12" style="margin:auto;">
            <nb-auth-block><h2 class="title">OAuth2 Sign In with email/password</h2>
              <small class="form-text sub-title">Hello! Sign in with your username or email</small>
              <form (ngSubmit)="login()" #form="ngForm" autocomplete="nope">
                <div *ngIf="showMessages.error && errors && errors.length > 0 && !submitted" class="alert alert-danger"
                     role="alert">
                  <div><strong>Oh snap!</strong></div>
                  <div *ngFor="let error of errors">{{ error }}</div>
                </div>
                <div *ngIf="showMessages.success && messages && messages.length > 0 && !submitted"
                     class="alert alert-success" role="alert">
                  <div><strong>Hooray!</strong></div>
                  <div *ngFor="let message of messages">{{ message }}</div>
                </div>
                <div class="form-group"><label for="input-email" class="sr-only">Email address</label> <input
                  name="email" [(ngModel)]="user.email" id="input-email" pattern=".+@.+\..+" class="form-control"
                  placeholder="Email address" #email="ngModel"
                  [class.form-control-danger]="email.invalid && email.touched" autofocus
                  [required]="getConfigValue('forms.validation.email.required')">
                  <small class="form-text error" *ngIf="email.invalid && email.touched && email.errors?.required">
                    Email is required!</small>
                  <small class="form-text error" *ngIf="email.invalid && email.touched && email.errors?.pattern">
                    Email should be the real one!
                  </small>
                </div>
                <div class="form-group"><label for="input-password" class="sr-only">Password</label> <input
                  name="password" [(ngModel)]="user.password" type="password" id="input-password" class="form-control"
                  placeholder="Password" #password="ngModel"
                  [class.form-control-danger]="password.invalid && password.touched"
                  [required]="getConfigValue('forms.validation.password.required')"
                  [minlength]="getConfigValue('forms.validation.password.minLength')"
                  [maxlength]="getConfigValue('forms.validation.password.maxLength')">
                  <small class="form-text error" *ngIf="password.invalid && password.touched"> Password is required!
                  </small>
                  <small class="form-text error" *ngIf="password.invalid && password.touched"> Password should contains
                    from {{ getConfigValue('forms.validation.password.minLength') }} to
                    {{ getConfigValue('forms.validation.password.maxLength') }} characters
                  </small>
                </div>
                <button [disabled]="submitted || !form.valid" class="btn btn-block btn-hero-success"
                        [class.btn-pulse]="submitted"> Sign In
                </button>
              </form>
            </nb-auth-block>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>    `,
})
export class NbOAuth2PasswordLoginComponent {

  token: NbAuthOAuth2Token;
  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;

  constructor(private authService: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected router: Router) {
    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.strategy = this.getConfigValue('forms.login.strategy');
    this.authService.onTokenChange()
      .subscribe((token: NbAuthOAuth2Token) => {
        this.token = null;
        if (token && token.isValid()) {
          this.token = token;
        }
      });
  }

  login(): void  {

    this.errors = this.messages = [];
    this.submitted = true;

    this.authService.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    });
  }


  logout() {
    this.authService.logout('password')
      .subscribe((authResult: NbAuthResult) => {
      });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  getClaims(rawToken: string): string {
    return nbAuthCreateToken(NbAuthJWTToken, rawToken).getPayload();
  }
}
