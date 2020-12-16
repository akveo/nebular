/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { NbAuthStrategyClass, NbAuthResult, NbAuthStrategyOptions } from '@nebular/auth';

import { NbFirebaseBaseStrategy } from '../base/firebase-base.strategy';
import { NbFirebaseIdentityProviderStrategyOptions } from '../base/firebase-identity-provider-strategy.options';

import firebase from 'firebase/app';
import 'firebase/auth';

@Injectable()
export class NbFirebaseTwitteStrategy extends NbFirebaseBaseStrategy {

  protected defaultOptions: NbFirebaseIdentityProviderStrategyOptions = new NbFirebaseIdentityProviderStrategyOptions();

  static setup(options: NbFirebaseIdentityProviderStrategyOptions): [NbAuthStrategyClass, NbAuthStrategyOptions] {
    return [NbFirebaseTwitteStrategy, options];
  }

  authenticate(data?: any): Observable<NbAuthResult> {
    const module = 'authenticate';
    const provider = new firebase.auth.TwitterAuthProvider();
    provider.setCustomParameters(this.getOption('customParameters'));

    return from(this.afAuth.signInWithPopup(provider))
      .pipe(
        switchMap((res) => this.processSuccess(res, module)),
        catchError(error => this.processFailure(error, module)),
      );
  }
}
