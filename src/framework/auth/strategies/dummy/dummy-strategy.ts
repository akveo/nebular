import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators/delay';

import { NbAuthStrategy } from '../auth-strategy';
import { NbAuthResult } from '../../services/auth-result';
import { defaultOptions } from './dummy-strategy-options';


@Injectable()
export class NbDummyAuthStrategy extends NbAuthStrategy {

  protected defaultOptions = defaultOptions;

  authenticate(data?: any): Observable<NbAuthResult> {
    return observableOf(this.createDummyResult(data))
      .pipe(
        delay(this.getOption('delay')),
      );
  }

  register(data?: any): Observable<NbAuthResult> {
    return observableOf(this.createDummyResult(data))
      .pipe(
        delay(this.getOption('delay')),
      );
  }

  requestPassword(data?: any): Observable<NbAuthResult> {
    return observableOf(this.createDummyResult(data))
      .pipe(
        delay(this.getOption('delay')),
      );
  }

  resetPassword(data?: any): Observable<NbAuthResult> {
    return observableOf(this.createDummyResult(data))
      .pipe(
        delay(this.getOption('delay')),
      );
  }

  logout(data?: any): Observable<NbAuthResult> {
    return observableOf(this.createDummyResult(data))
      .pipe(
        delay(this.getOption('delay')),
      );
  }

  protected createDummyResult(data?: any): NbAuthResult {
    if (this.getOption('alwaysFail')) {
      // TODO we dont call tokenService clear during logout in case result is not success
      return new NbAuthResult(false,
        this.createFailResponse(data),
        null,
        ['Something went wrong.']);
    }

    // TODO is it missed messages here, is it token should be defined
    return new NbAuthResult(true, this.createSuccessResponse(data), '/', ['Successfully logged in.']);
  }
}
