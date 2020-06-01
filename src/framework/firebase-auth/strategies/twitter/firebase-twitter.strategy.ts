/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { catchError, switchMap } from 'rxjs/operators';
import { NbAuthStrategyClass } from '../../../auth/auth.options';
import { NbAuthStrategyOptions } from '../../../auth/strategies/auth-strategy-options';
import { NbAuthResult } from '../../../auth/services/auth-result';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {
  NbFirebaseIdentityProviderStrategyOptions
} from '../base/firebase-identity-provider-strategy.options';
import { NbFirebaseBaseStrategy } from '../base/firebase-base.strategy';

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

    return fromPromise(this.afAuth.signInWithPopup(provider))
      .pipe(
        switchMap((res) => this.processSuccess(res, module)),
        catchError(error => this.proccessFailure(error, module)),
      );
  }
}
