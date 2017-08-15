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
  selector: 'nb-reset-password-page',
  styleUrls: ['./reset-password.component.scss'],
  template: `
    <h2>Change password</h2>
    <form (ngSubmit)="resetPass()" #resetPassForm="ngForm">

      <div *ngIf="errors && errors.length > 0 && !submitted" class="alert alert-danger" role="alert">
        <div><strong>Oh snap!</strong></div>
        <div *ngFor="let error of errors">{{ error }}</div>
      </div>
      <div *ngIf="messages && messages.length > 0 && !submitted" class="alert alert-success" role="alert">
        <div><strong>Hooray!</strong></div>
        <div *ngFor="let message of messages">{{ message }}</div>
      </div>

      <label for="input-password" class="sr-only">New Password</label>
      <input name="password" [(ngModel)]="user.password" type="password" id="input-password"
        class="form-control form-control-lg first" placeholder="New Password" required
             [required]="getConfigValue('forms.validation.password.required')"
             [minlength]="getConfigValue('forms.validation.password.minLength')"
             [maxlength]="getConfigValue('forms.validation.password.maxLength')"
             autofocus>

      <label for="input-re-password" class="sr-only">Confirm Password</label>
      <input name="confirmPassword" [(ngModel)]="user.confirmPassword" type="password" id="input-re-password"
        class="form-control form-control-lg last" placeholder="Confirm Password"
             [required]="getConfigValue('forms.validation.password.required')"
             [minlength]="getConfigValue('forms.validation.password.minLength')"
             [maxlength]="getConfigValue('forms.validation.password.maxLength')">

      <div class="checkbox"></div>

      <button [disabled]="submitted || !resetPassForm.form.valid"
        class="btn btn-lg btn-primary btn-block" type="submit">Change password</button>
    </form>

    <div class="links">
      <a routerLink="../login">Login</a> or <a routerLink="../register">Register</a>
    </div>
  `,
})
export class NbResetPasswordComponent {

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

    this.redirectDelay = this.getConfigValue('forms.resetPassword.redirectDelay');
    this.showMessages = this.getConfigValue('forms.resetPassword.showMessages');
    this.provider = this.getConfigValue('forms.resetPassword.provider');
  }

  resetPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.resetPassword(this.provider, this.user).subscribe((result: NbAuthResult) => {
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
