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
  selector: 'nb-reset-password-page',
  styleUrls: ['./reset-password.component.scss'],
  template: `
    <nb-auth-block>
      <h2 class="title">Change password</h2>
      <small class="form-text sub-title">Please enter a new password</small>
      <form (ngSubmit)="resetPass()" #resetPassForm="ngForm">

        <nb-alert *ngIf="showMessages.error && errors?.length && !submitted" outline="danger">
          <div><strong>Oh snap!</strong></div>
          <div *ngFor="let error of errors">{{ error }}</div>
        </nb-alert>

        <nb-alert *ngIf="showMessages.success && messages?.length && !submitted" outline="success">
          <div><strong>Hooray!</strong></div>
          <div *ngFor="let message of messages">{{ message }}</div>
        </nb-alert>

        <div class="form-group">
          <label for="input-password" class="sr-only">New Password</label>
          <input nbInput
                 [(ngModel)]="user.password"
                 #password="ngModel"
                 type="password"
                 id="input-password"
                 name="password"
                 class="first"
                 placeholder="New Password"
                 autofocus
                 fullWidth
                 [status]="password.dirty ? (password.invalid  ? 'danger' : 'success') : ''"
                 [required]="getConfigValue('forms.validation.password.required')"
                 [minlength]="getConfigValue('forms.validation.password.minLength')"
                 [maxlength]="getConfigValue('forms.validation.password.maxLength')">
          <small class="form-text error" *ngIf="password.invalid && password.touched && password.errors?.required">
            Password is required!
          </small>
          <small
            class="form-text error"
            *ngIf="password.invalid && password.touched && (password.errors?.minlength || password.errors?.maxlength)">
            Password should contains
            from {{getConfigValue('forms.validation.password.minLength')}}
            to {{getConfigValue('forms.validation.password.maxLength')}}
            characters
          </small>
        </div>

        <div class="form-group">
          <label for="input-re-password" class="sr-only">Confirm Password</label>
          <input nbInput
                 [(ngModel)]="user.confirmPassword"
                 #rePass="ngModel"
                 id="input-re-password"
                 name="rePass"
                 type="password"
                 class="last"
                 placeholder="Confirm Password"
                 fullWidth
                 [status]="rePass.touched
                 ? (rePass.invalid || password.value != rePass.value ? 'danger' : 'success')
                 : ''"
                 [required]="getConfigValue('forms.validation.password.required')">
          <small class="form-text error"
                 *ngIf="rePass.invalid && rePass.touched && rePass.errors?.required">
            Password confirmation is required!
          </small>
          <small
            class="form-text error"
            *ngIf="rePass.touched && password.value != rePass.value && !rePass.errors?.required">
            Password does not match the confirm password.
          </small>
        </div>

        <button nbButton
                status="success"
                fullWidth
                [disabled]="submitted || !resetPassForm.valid"
                [class.btn-pulse]="submitted">
          Change password
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
export class NbResetPasswordComponent {

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

    this.redirectDelay = this.getConfigValue('forms.resetPassword.redirectDelay');
    this.showMessages = this.getConfigValue('forms.resetPassword.showMessages');
    this.strategy = this.getConfigValue('forms.resetPassword.strategy');
  }

  resetPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.resetPassword(this.strategy, this.user).subscribe((result: NbAuthResult) => {
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
