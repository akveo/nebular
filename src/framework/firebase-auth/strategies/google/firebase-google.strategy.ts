/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { firebaseGoolgeStrategyOptions, NbFirebaseGoogleStrategyOptions } from './firebase-google-strategy.options';
import { Observable, of } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { catchError, map, switchMap } from 'rxjs/operators';
import { NbAuthStrategyClass } from '../../../auth/auth.options';
import { NbAuthStrategyOptions } from '../../../auth/strategies/auth-strategy-options';
import { NbAuthResult } from '../../../auth/services/auth-result';

import { NbFirebasePasswordStrategy } from '../password/firebase-password.strategy';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import UserCredential = firebase.auth.UserCredential;

@Injectable()
export class NbFirebaseGoogleStrategy extends NbFirebasePasswordStrategy {

  protected defaultOptions: NbFirebaseGoogleStrategyOptions = firebaseGoolgeStrategyOptions;

  static setup(options: NbFirebaseGoogleStrategyOptions): [NbAuthStrategyClass, NbAuthStrategyOptions] {
    return [NbFirebaseGoogleStrategy, options];
  }

  constructor(
    protected afAuth: AngularFireAuth,
  ) {
    super(afAuth);
  }

  authenticate(data?: any): Observable<NbAuthResult> {
    const module = 'authenticate';
    const provider = new firebase.auth.GoogleAuthProvider();
    const scopes = this.getOption('scopes');
    scopes.forEach((scope) => provider.addScope(scope));
    provider.setCustomParameters(this.getOption('customParameters'));

    return fromPromise(this.afAuth.signInWithPopup(provider))
      .pipe(
        switchMap((res) => this.processSuccess(res)),
        catchError(error => this.proccessFailure(error, module)),
      );
  }

  register(data?: any): Observable<NbAuthResult> {
    throw new Error('`register` is not supported by `NbFirebaseGoogleStrategy`, use `authenticate`.');
  }

  requestPassword(data?: any): Observable<NbAuthResult> {
    throw new Error('`requestPassword` is not supported by `NbFirebaseGoogleStrategy`, use `authenticate`.');
  }

  resetPassword(data: any = {}): Observable<NbAuthResult> {
    throw new Error('`resetPassword` is not supported by `NbFirebaseGoogleStrategy`, use `authenticate`.');
  }

  protected processSuccess(res: UserCredential | null): Observable<NbAuthResult> {
    return this.afAuth.idToken
      .pipe(map(token => {
        return new NbAuthResult(
          true,
          res,
          this.getOption('redirect.success'),
          [],
          this.getOption('defaultMessages'),
          this.createToken(token),
        );
      }));
  }
}
