/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Observable, of as observableOf, from } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { NbAuthStrategyOptions, NbAuthStrategyClass, NbAuthResult } from '@nebular/auth';

import { NbFirebaseBaseStrategy } from '../base/firebase-base.strategy';
import {
  firebasePasswordStrategyOptions,
  NbFirebasePasswordStrategyOptions,
} from './firebase-password-strategy.options';

@Injectable()
export class NbFirebasePasswordStrategy extends NbFirebaseBaseStrategy {
  protected defaultOptions: NbFirebasePasswordStrategyOptions = firebasePasswordStrategyOptions;

  static setup(options: NbFirebasePasswordStrategyOptions): [NbAuthStrategyClass, NbAuthStrategyOptions] {
    return [NbFirebasePasswordStrategy, options];
  }

  authenticate({ email, password }: any): Observable<NbAuthResult> {
    const module = 'login';
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      switchMap((res) => this.processSuccess(res, module)),
      catchError((error) => this.processFailure(error, module)),
    );
  }

  refreshToken(data?: any): Observable<NbAuthResult> {
    const module = 'refreshToken';
    return this.afAuth.authState.pipe(
      take(1),
      switchMap((user) => {
        if (user == null) {
          return observableOf(
            new NbAuthResult(false, null, this.getOption(`${module}.redirect.failure`), [
              "There is no logged in user so refresh of id token isn't possible",
            ]),
          );
        }
        return this.refreshIdToken(user, module);
      }),
    );
  }

  register({ email, password }: any): Observable<NbAuthResult> {
    const module = 'register';
    return from(this.afAuth.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap((res) => this.processSuccess(res, module)),
      catchError((error) => this.processFailure(error, module)),
    );
  }

  requestPassword({ email }: any): Observable<NbAuthResult> {
    const module = 'requestPassword';
    return from(this.afAuth.sendPasswordResetEmail(email)).pipe(
      map(() => {
        return new NbAuthResult(
          true,
          null,
          this.getOption(`${module}.redirect.success`),
          [],
          this.getOption(`${module}.defaultMessages`),
        );
      }),
      catchError((error) => this.processFailure(error, module)),
    );
  }

  resetPassword({ code, password }): Observable<NbAuthResult> {
    const module = 'resetPassword';
    return from(this.afAuth.confirmPasswordReset(code, password)).pipe(
      map(() => {
        return new NbAuthResult(
          true,
          null,
          this.getOption(`${module}.redirect.success`),
          [],
          this.getOption(`${module}.defaultMessages`),
        );
      }),
      catchError((error) => this.processFailure(error, module)),
    );
  }

  protected updatePassword(user, password, module) {
    return from(user.updatePassword(password)).pipe(
      map((token) => {
        return new NbAuthResult(
          true,
          null,
          this.getOption(`${module}.redirect.success`),
          [],
          this.getOption(`${module}.defaultMessages`),
          this.createToken(token),
        );
      }),
      catchError((error) => this.processFailure(error, module)),
    );
  }

  protected refreshIdToken(user: firebase.User, module): Observable<NbAuthResult> {
    return from(user.getIdToken(true)).pipe(
      map((token) => {
        return new NbAuthResult(
          true,
          null,
          this.getOption(`${module}.redirect.success`),
          [],
          this.getOption(`${module}.defaultMessages`),
          this.createToken(token),
        );
      }),
      catchError((error) => this.processFailure(error, module)),
    );
  }
}
