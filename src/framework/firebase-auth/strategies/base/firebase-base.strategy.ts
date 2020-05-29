/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';

import { Observable, of as observableOf } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { fromPromise } from 'rxjs/internal-compatibility';
import { catchError, map } from 'rxjs/operators';
import UserCredential = firebase.auth.UserCredential;
import { NbAuthStrategy } from '../../../auth/strategies/auth-strategy';
import { NbAuthResult } from '../../../auth/services/auth-result';
import { NbAuthIllegalTokenError } from '../../../auth/services/token/token';


@Injectable()
export abstract class NbFirebaseBaseStrategy extends NbAuthStrategy {

  constructor(
    protected afAuth: AngularFireAuth,
  ) {
    super();
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

  register(data?: any): Observable<NbAuthResult> {
    throw new Error(`\`register\` is not supported by \`${this.constructor.name}\`, use \`authenticate\`.`);
  }

  requestPassword(data?: any): Observable<NbAuthResult> {
    throw new Error(`\`requestPassword\` is not supported by \`${this.constructor.name}\`, use \`authenticate\`.`);
  }

  resetPassword(data: any = {}): Observable<NbAuthResult> {
    throw new Error(`\`resetPassword\` is not supported by \`${this.constructor.name}\`, use \`authenticate\`.`);
  }

  refreshToken(data: any = {}): Observable<NbAuthResult> {
    throw new Error(`\`refreshToken\` is not supported by \`${this.constructor.name}\`, use \`authenticate\`.`);
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
