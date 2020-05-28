/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';

import { Observable, of as observableOf } from 'rxjs';
import {
  firebasePasswordStrategyOptions,
  NbFirebasePasswordStrategyOptions,
} from './firebase-password-strategy.options';
import { AngularFireAuth } from '@angular/fire/auth';
import { fromPromise } from 'rxjs/internal-compatibility';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import UserCredential = firebase.auth.UserCredential;
import { User } from 'firebase';
import { NbAuthStrategy } from '../../../auth/strategies/auth-strategy';
import { NbAuthStrategyClass } from '../../../auth/auth.options';
import { NbAuthStrategyOptions } from '../../../auth/strategies/auth-strategy-options';
import { NbAuthResult } from '../../../auth/services/auth-result';
import { NbAuthIllegalTokenError } from '../../../auth/services/token/token';


@Injectable()
export class NbFirebasePasswordStrategy extends NbAuthStrategy {

  protected defaultOptions: NbFirebasePasswordStrategyOptions = firebasePasswordStrategyOptions;

  static setup(options: NbFirebasePasswordStrategyOptions): [NbAuthStrategyClass, NbAuthStrategyOptions] {
    return [NbFirebasePasswordStrategy, options];
  }

  constructor(
    protected afAuth: AngularFireAuth,
  ) {
    super();
  }

  authenticate({ email, password }: any): Observable<NbAuthResult> {
    const module = 'login';
    return fromPromise(this.afAuth.signInWithEmailAndPassword(email, password))
      .pipe(
        switchMap((res) => this.processSuccess(res, module)),
        catchError((error) => this.proccessFailure(error, module)),
      );
  }

  logout(): Observable<NbAuthResult> {
    const module = 'logout';
    return fromPromise(this.afAuth.signOut())
      .pipe(
        map(() => {
          return new NbAuthResult(
            true,
            null,
            this.getOption(`${module}.redirect.success`),
            [],
            this.getOption(`${module}.defaultMessages`),
          )
        }),
        catchError((error) => this.proccessFailure(error, module)),
      );
  }

  refreshToken(data?: any): Observable<NbAuthResult> {
    const module = 'refreshToken';
    return this.afAuth.authState
      .pipe(
        take(1), // need this to prevent loop
        switchMap(user => {
          if (user == null) {
            return observableOf(new NbAuthResult(
              false,
              null,
              this.getOption(`${module}.redirect.failure`),
              ['There is no logged in user so refresh of id token isn\'t possible'],
            ));
          }
          return this.refreshIdToken(user, module);
        }),
      );
  }

  register({ email, password }: any): Observable<NbAuthResult> {
    const module = 'register';
    return fromPromise(this.afAuth.createUserWithEmailAndPassword(email, password))
      .pipe(
        switchMap((res) => this.processSuccess(res, module)),
        catchError((error) => this.proccessFailure(error, module)),
      );
  }

  requestPassword({ email }: any): Observable<NbAuthResult> {
    const module = 'requestPassword';
    return fromPromise(this.afAuth.sendPasswordResetEmail(email))
      .pipe(
        map(() => {
          return new NbAuthResult(
            true,
            null,
            this.getOption(`${module}.redirect.success`),
            [],
            this.getOption(`${module}.defaultMessages`),
          );
        }),
        catchError((error) => this.proccessFailure(error, module)),
      );
  }

  resetPassword({ password }): Observable<NbAuthResult> {
    const module = 'resetPassword';
    return this.afAuth.authState
      .pipe(
        switchMap(user => {
          if (user == null) {
            return observableOf(new NbAuthResult(
              false,
              null,
              this.getOption(`${module}.redirect.failure`),
              ['There is no logged in user so the reset of the password isn\'t possible'],
            ));
          }
          return this.updatePassword(user, password, module);
        }),
      );
  }

  protected updatePassword(user, password, module) {
    return fromPromise(user.updatePassword(password))
      .pipe(
        map(token => {
          return new NbAuthResult(
            true,
            null,
            this.getOption(`${module}.redirect.success`),
            [],
            this.getOption(`${module}.defaultMessages`),
            this.createToken(token),
          );
        }),
        catchError(error => this.proccessFailure(error, module)),
      );
  }

  protected refreshIdToken(user: User, module): Observable<NbAuthResult> {
    return fromPromise(user.getIdToken(true))
      .pipe(
        map(token => {
          return new NbAuthResult(
            true,
            null,
            this.getOption(`${module}.redirect.success`),
            [],
            this.getOption(`${module}.defaultMessages`),
            this.createToken(token),
          );
        }),
        catchError(error => this.proccessFailure(error, module)),
      );
  }

  protected proccessFailure(error: any, module: string): Observable<NbAuthResult> {
    let errorMessages = [];

    if (error instanceof NbAuthIllegalTokenError) {
      errorMessages.push(error.message)
    } else {
      errorMessages.push(this.getOption('errors.getter')(module, error, this.options));
    }

    return observableOf(new NbAuthResult(
      false,
      error,
      this.getOption(`${module}.redirect.failure`),
      errorMessages,
      [],
    ));
  }

  protected processSuccess(res: UserCredential | null, module: string): Observable<NbAuthResult> {
    return this.afAuth.idToken
      .pipe(map(token => {
        return new NbAuthResult(
          true,
          res,
          this.getOption(`${module}.redirect.success`),
          [],
          this.getOption('messages.getter')(module, res, this.options),
          this.createToken(token),
        );
      }));
  }
}
