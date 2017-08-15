/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { NbAuthService, NbAuthResult } from '../../services/auth.service';
import { NB_AUTH_OPTIONS_TOKEN } from '../../auth.options';
import { getDeepFromObject } from '../../helpers';

@Component({
  selector: 'nb-login',
  styleUrls: ['./login.component.scss'],
  template: `
    <h2>Please sign in</h2>
    <form (ngSubmit)="login()" #loginForm="ngForm" autocomplete="nope">

      <div *ngIf="showMessages.error && errors && errors.length > 0 && !submitted"
           class="alert alert-danger" role="alert">
        <div><strong>Oh snap!</strong></div>
        <div *ngFor="let error of errors">{{ error }}</div>
      </div>
      <div *ngIf="showMessages.success && messages && messages.length > 0 && !submitted"
           class="alert alert-success" role="alert">
        <div><strong>Hooray!</strong></div>
        <div *ngFor="let message of messages">{{ message }}</div>
      </div>

      <div class="form-group row">
        <label for="input-email" class="sr-only">Email address</label>
        <input name="email" [(ngModel)]="user.email" type="email" id="input-email"
               class="form-control form-control-lg first" placeholder="Email address"
               [required]="getConfigValue('forms.validation.email.required')">
      </div>

      <div class="form-group row">
        <label for="input-password" class="sr-only">Password</label>
        <input name="password" [(ngModel)]="user.password" type="password" id="input-password"
          class="form-control form-control-lg last" placeholder="Password"
               [required]="getConfigValue('forms.validation.password.required')"
               [minlength]="getConfigValue('forms.validation.password.minLength')"
               [maxlength]="getConfigValue('forms.validation.password.maxLength')">
      </div>

      <div class="checkbox">
        <label *ngIf="getConfigValue('forms.login.rememberMe')">
          <input name="rememberMe" [(ngModel)]="user.rememberMe" type="checkbox" value="remember-me"> Remember me
        </label>
        <a routerLink="../request-password">Forgot Password</a>
      </div>
      <button [disabled]="submitted || !loginForm.form.valid"
        class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>

    <div class="links">
      Don't have an account? <a routerLink="../register">Register</a>
    </div>
  `,
})
export class NbLoginComponent {

  redirectDelay: number = 0;
  showMessages: any = {};
  provider: string = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS_TOKEN) protected config = {},
              protected router: Router) {

    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.provider = this.getConfigValue('forms.login.provider');
  }

  login(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.authenticate(this.provider, this.user).subscribe((result: NbAuthResult) => {

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

  getConfigValue(key: string): any {
    return getDeepFromObject(this.config, key, null);
  }
}
