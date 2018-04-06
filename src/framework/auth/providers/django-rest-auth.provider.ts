/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */


import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {FieldErrors} from '../services';
import {deepExtend} from '../helpers';
import {NbEmailPassAuthProvider} from './email-pass-auth.provider';


/**
 * Provider for django-rest-auth
 * See https://django-rest-auth.readthedocs.io/en/latest/
 */
@Injectable()
export class NbDjangoRestAuthProvider extends NbEmailPassAuthProvider {

  protected extraDefaultConfig = {
    baseEndpoint: '/api/auth/',
    login: {
      endpoint: 'login/',
      fieldErrorsMap: {
        email: 'email',
        password: 'password',
      },
    },
    register: {
      endpoint: 'registration/',
      fieldErrorsMap: {
        username: 'fullName',
        email: 'email',
        password1: 'password',
        password2: 'rePass',
      },
    },
    logout: {
      method: 'post',
      endpoint: 'logout/',
    },
    requestPass: {
      endpoint: 'password/reset/',
      fieldErrorsMap: {
        email: 'email',
      },
    },
    resetPass: {
      endpoint: 'password/reset/confirm/',
      method: 'post',
      resetPasswordTokenKey: 'token',
      fieldErrorsMap: {
        new_password1: 'password',
        new_password2: 'confirmPassword',
      },
    },
    errors: {
      key: 'non_field_errors',
    },
    fieldErrors: {
      key: '',
    },
    messages: {
      key: 'detail',
    },
    token: {
      key: 'key',
    },
  };


  constructor(protected http: HttpClient, protected route: ActivatedRoute) {
    super(http, route);
    this.defaultConfig = deepExtend({}, this.getDefaultConfig(), this.extraDefaultConfig);
  }

  protected getErrorMessages(module: string, response: HttpErrorResponse): [string[], FieldErrors] {
    let errors = [];
    let fieldErrors = {};
    [errors, fieldErrors] = super.getErrorMessages(module, response);

    const fieldErrorsMap = this.getConfigValue(`${module}.fieldErrorsMap`);

    let mappedFieldErrors = {};
    if (fieldErrors && fieldErrorsMap) {
      for (const k in fieldErrors) {
        if (!fieldErrors.hasOwnProperty(k)) {
          continue;
        }

        if (k === 'non_field_errors') {
          continue;
        }

        if (k in fieldErrorsMap) {
          mappedFieldErrors[fieldErrorsMap[k]] = fieldErrors[k];
        } else {
          errors.push(`${k}: ${fieldErrors[k]}`);
        }
      }
    } else {
      mappedFieldErrors = fieldErrors;
    }

    return [errors, mappedFieldErrors];
  }

  protected modifyResetPasswordData(data) {
    const tokenKey = this.getConfigValue('resetPass.resetPasswordTokenKey');
    const params = this.route.firstChild.firstChild.snapshot.params;
    return {
      new_password1: data['password'],
      new_password2: data['confirmPassword'],
      [tokenKey]: params[tokenKey],
      uid: params['uid'],
    };
  }

  protected modifyRegisterData(data) {
    return {
      'username': data['fullName'],
      'email': data['email'],
      'password1': data['password'],
      'password2': data['confirmPassword'],
    }
  }

}
