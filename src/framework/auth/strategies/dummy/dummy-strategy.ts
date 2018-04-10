import { Injectable } from '@angular/core';

import { Observable, of as observableOf } from 'rxjs';
import { delay } from 'rxjs/operators';

import { NbAuthStrategy } from '../auth-strategy';
import { NbAuthResult } from '../../services/auth-result';
import { NbDummyAuthStrategyOptions } from './dummy-strategy-options';


@Injectable()
export class NbDummyAuthStrategy extends NbAuthStrategy {

  protected defaultConfig: NbDummyAuthStrategyOptions = {
    delay: 1000,
  };

  authenticate(data?: any): Observable<NbAuthResult> {
    return observableOf(this.createDummyResult(data))
      .pipe(
        delay(this.getConfigValue('delay')),
      );
  }

  register(data?: any): Observable<NbAuthResult> {
    return observableOf(this.createDummyResult(data))
      .pipe(
        delay(this.getConfigValue('delay')),
      );
  }

  requestPassword(data?: any): Observable<NbAuthResult> {
    return observableOf(this.createDummyResult(data))
      .pipe(
        delay(this.getConfigValue('delay')),
      );
  }

  resetPassword(data?: any): Observable<NbAuthResult> {
    return observableOf(this.createDummyResult(data))
      .pipe(
        delay(this.getConfigValue('delay')),
      );
  }

  logout(data?: any): Observable<NbAuthResult> {
    return observableOf(this.createDummyResult(data))
      .pipe(
        delay(this.getConfigValue('delay')),
      );
  }

  refreshToken(data?: any): Observable<NbAuthResult> {
    return observableOf(this.createDummyResult(data))
      .pipe(
        delay(this.getConfigValue('delay')),
      );
  }

  protected createDummyResult(data?: any): NbAuthResult {
    if (this.getConfigValue('alwaysFail')) {
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
