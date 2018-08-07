/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS } from '../../auth.options';
import { getDeepFromObject } from '../../helpers';

import { NbAuthService } from '../../services/auth.service';
import { NbAuthResult } from '../../services/auth-result';

@Component({
  selector: 'nb-request-password-page',
  styleUrls: ['./request-password.component.scss'],
  template: `
    <nb-auth-block>
      <h2 class="title">Forgot Password</h2>
      <small class="form-text sub-title">Enter your email address and we’ll send a link to reset your password</small>
      <form (ngSubmit)="requestPass()" #requestPassForm="ngForm">

        <nb-alert *ngIf="showMessages.error && errors?.length && !submitted" outline="danger">
          <div><strong>Oh snap!</strong></div>
          <div *ngFor="let error of errors">{{ error }}</div>
        </nb-alert>

        <nb-alert *ngIf="showMessages.success && messages.length && !submitted" outline="success">
          <div><strong>Hooray!</strong></div>
          <div *ngFor="let message of messages">{{ message }}</div>
        </nb-alert>

        <div class="form-group">
          <label for="input-email" class="sr-only">Enter your email address</label>
          <input nbInput
                 #email="ngModel"
                 [(ngModel)]="user.email"
                 id="input-email"
                 name="email"
                 placeholder="Email address"
                 autofocus
                 fullWidth
                 pattern=".+@.+\..+"
                 [status]="email.dirty ? (email.invalid  ? 'danger' : 'success') : ''"
                 [required]="getConfigValue('forms.validation.email.required')">
          <small class="form-text error" *ngIf="email.invalid && email.touched && email.errors?.required">
            Email is required!
          </small>
          <small class="form-text error"
                 *ngIf="email.invalid && email.touched && email.errors?.pattern">
            Email should be the real one!
          </small>
        </div>

        <button nbButton
                status="success"
                fullWidth
                [disabled]="submitted || !requestPassForm.valid"
                [class.btn-pulse]="submitted">
          Request password
        </button>
      </form>

      <div class="links col-sm-12">
        <small class="form-text">
          Already have an account? <a routerLink="../login"><strong>Sign In</strong></a>
        </small>
        <small class="form-text">
          <a routerLink="../register"><strong>Sign Up</strong></a>
        </small>
      </div>
    </nb-auth-block>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbRequestPasswordComponent {

  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected cd: ChangeDetectorRef,
              protected router: Router) {

    this.redirectDelay = this.getConfigValue('forms.requestPassword.redirectDelay');
    this.showMessages = this.getConfigValue('forms.requestPassword.showMessages');
    this.strategy = this.getConfigValue('forms.requestPassword.strategy');
  }

  requestPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.requestPassword(this.strategy, this.user).subscribe((result: NbAuthResult) => {
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
      this.cd.detectChanges();
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
