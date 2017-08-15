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
  selector: 'nb-request-password-page',
  styleUrls: ['./request-password.component.scss'],
  template: `
    <h2>Request password reset</h2>
    <form (ngSubmit)="requestPass()" #requestPassForm="ngForm">

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

      <label for="input-email" class="sr-only">Enter your email address</label>
      <input name="email" [(ngModel)]="user.email" type="email" id="input-email"
        class="form-control form-control-lg" placeholder="Email address"
             [required]="getConfigValue('forms.validation.email.required')"
             autofocus>
      <div class="checkbox"></div>

      <button [disabled]="submitted || !requestPassForm.form.valid"
        class="btn btn-lg btn-primary btn-block" type="submit">Request password</button>
    </form>

    <div class="links">
      <a routerLink="../login">Login</a> or <a routerLink="../register">Register</a>
    </div>
  `,
})
export class NbRequestPasswordComponent {

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

    this.redirectDelay = this.getConfigValue('forms.requestPassword.redirectDelay');
    this.showMessages = this.getConfigValue('forms.requestPassword.showMessages');
    this.provider = this.getConfigValue('forms.requestPassword.provider');
  }

  requestPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.requestPassword(this.provider, this.user).subscribe((result: NbAuthResult) => {
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
