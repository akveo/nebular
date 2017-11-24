/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';

import * as firebase from 'firebase';
import {NgEmailPassAuthProviderConfig} from './firebase-auth.options';
import {NbAbstractAuthProvider} from './abstract-auth.provider';
import {NbAuthResult} from '../services/auth.service';

/**
 * Firebase authentication provider for email/password strategy.
 *
 *
 * @example
 *
 *
 *  Firebase settings and default settings object. This object should be located into `config` object.
 *
 * ```
 * {
 *  firebase: {
 *    apiKey: 'your firebase api key',
 *    authDomain: 'your firebase auth domain',
 *    databaseURL: 'your firebase database url',
 *    projectId: 'your firebase project id',
 *    storageBucket: 'your firebase storage bucket',
 *    messagingSenderId: 'your firebase messaging sender id'
 *   },
 *  login: {
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    }
 *  },
 *  register: {
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    }
 *  },
 *  logout: {
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    },
 *  requestPass: {
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    },
 *  resetPass: {
 *    redirect: {
 *      success: '/',
 *      failure: null,
 *    }
 *  }
 *}
 *
 * // Note, there is no need to copy over the whole object to change the settings you need.
 * // Also, this.getConfigValue call won't work outside of the default config declaration
 * // (which is inside of the `NbFirebaseAuthProvider` class), so you have to replace it with a custom helper function
 * // if you need it.
 * ```
 */
@Injectable()
export class NbFirebaseAuthProvider extends NbAbstractAuthProvider {

  protected defaultConfig: NgEmailPassAuthProviderConfig = {
    login: {
      redirect: {
        success: '/',
        failure: null,
      },
    },
    register: {
      redirect: {
        success: '/',
        failure: null,
      },
    },
    requestPass: {
      redirect: {
        success: '/auth/login',
        failure: null,
      },
    },
    resetPass: {
      redirect: {
        success: '/auth/login',
        failure: '/auth/reset-password',
      },
    },
    logout: {
      redirect: {
        success: '/auth/login',
        failure: null,
      },
    },
  };


  /**
   *The method initializes the 'firebase' object with user parameters.
   *
   */
  init() {
    firebase.initializeApp(this.getConfigValue('firebase'));
  }

  /**
   * Firebase authentication.
   *
   * @param data any
   * @returns Observable<NbAuthResult>
   */
  authenticate(data?: any): Observable<NbAuthResult> {
    return Observable.fromPromise(firebase.auth().signInWithEmailAndPassword(data.email, data.password))
      .map((res) => {
        return this.processSuccess(res, this.getConfigValue('login.redirect.success'), [res.message]);
      })
      .catch((res) => {
        return Observable.of(
          this.processFailure(res, this.getConfigValue('login.redirect.failure'), [res.message]),
        );
      });
  }

  /**
   * Firebase registration.
   *
   * @param data any
   * @returns Observable<NbAuthResult>
   */
  register(data?: any): Observable<NbAuthResult> {
    return Observable.fromPromise(firebase.auth().createUserWithEmailAndPassword(data.email, data.password))
      .map((res) => {
        return Observable.fromPromise(firebase.auth().currentUser.updateProfile({
          displayName: data.fullName,
          photoURL: '',
        })).map((update) => {
          return this.processSuccess(res, this.getConfigValue('register.redirect.success'), [res.message]);
        });
      })
      .catch((res) => {
        return Observable.of(
          this.processFailure(res, this.getConfigValue('register.redirect.failure'), [res.message]),
        );
      });
  }

  /**
   * Firebase restore password.
   *
   * @param data any
   * @returns Observable<NbAuthResult>
   */
  requestPassword(data?: any): Observable<NbAuthResult> {
    return Observable.fromPromise(firebase.auth().sendPasswordResetEmail(data.email))
      .map((res) => {
        return this.processSuccess(res, this.getConfigValue('requestPass.redirect.success'), []);
      })
      .catch((res) => {
        return Observable.of(this.processFailure(res,  this.getConfigValue('requestPass.redirect.failure'),
          [res.message]));
      });
  }

  /**
   * Firebase reset password.
   *
   * @param data any
   * @returns Observable<NbAuthResult>
   */
  resetPassword(data?: any): Observable<NbAuthResult> {
    if (firebase.auth().currentUser) {
      return Observable.fromPromise(firebase.auth().currentUser.updatePassword(data.password))
        .map((res) => {
          return this.processSuccess(res, this.getConfigValue('resetPass.redirect.success'), []);
        })
        .catch((res) => {
          return Observable.of(this.processFailure(res,  this.getConfigValue('resetPass.redirect.failure'),
            [res.message]));
        });
    }

    return Observable.of(this.processFailure([],  this.getConfigValue('resetPass.redirect.failure'),
      ['Please, sign in to be able to reset your password']));
  }

  /**
   * Firebase logout.
   *
   * @param data any
   * @returns Observable<NbAuthResult>
   */
  logout(data?: any): Observable<NbAuthResult> {
    return Observable.fromPromise(firebase.auth().signOut())
      .map((res) => {
        return this.processSuccess(res, this.getConfigValue('logout.redirect.success'),  []);
      })
      .catch((res) => {
        return Observable.of(this.processFailure(res, this.getConfigValue('logout.redirect.failure'),
          [res.message]));
      });
  }

  private processSuccess(response?: any, redirect?: any, messages?: any): NbAuthResult {
    return new NbAuthResult(true, response, redirect, [], messages);
  }

  private processFailure(response?: any, redirect?: any, errors?: any): NbAuthResult {
    return new NbAuthResult(false, response, redirect, errors, []);
  }
}
