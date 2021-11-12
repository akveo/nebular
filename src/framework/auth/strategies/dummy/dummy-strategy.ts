import { Injectable } from '@angular/core';

import { Observable, of as observableOf } from 'rxjs';
import { delay } from 'rxjs/operators';

import { NbAuthStrategy } from '../auth-strategy';
import { NbAuthResult } from '../../services/auth-result';
import { NbDummyAuthStrategyOptions, dummyStrategyOptions } from './dummy-strategy-options';
import { NbAuthStrategyClass } from '../../auth.options';

/**
 * Dummy auth strategy. Could be useful for auth setup when backend is not available yet.
 *
 *
 * Strategy settings.
 *
 * ```ts
 * export class NbDummyAuthStrategyOptions extends NbAuthStrategyOptions {
 *   name = 'dummy';
 *   token = {
 *     class: NbAuthSimpleToken,
 *   };
 *   delay? = 1000;
 *   alwaysFail? = false;
 * }
 * ```
 */
@Injectable()
export class NbDummyAuthStrategy extends NbAuthStrategy {
  protected defaultOptions: NbDummyAuthStrategyOptions = dummyStrategyOptions;

  static setup(options: NbDummyAuthStrategyOptions): [NbAuthStrategyClass, NbDummyAuthStrategyOptions] {
    return [NbDummyAuthStrategy, options];
  }

  authenticate(data?: any): Observable<NbAuthResult> {
    return observableOf(this.createDummyResult(data)).pipe(delay(this.getOption('delay')));
  }

  register(data?: any): Observable<NbAuthResult> {
    return observableOf(this.createDummyResult(data)).pipe(delay(this.getOption('delay')));
  }

  requestPassword(data?: any): Observable<NbAuthResult> {
    return observableOf(this.createDummyResult(data)).pipe(delay(this.getOption('delay')));
  }

  resetPassword(data?: any): Observable<NbAuthResult> {
    return observableOf(this.createDummyResult(data)).pipe(delay(this.getOption('delay')));
  }

  logout(data?: any): Observable<NbAuthResult> {
    return observableOf(this.createDummyResult(data)).pipe(delay(this.getOption('delay')));
  }

  refreshToken(data?: any): Observable<NbAuthResult> {
    return observableOf(this.createDummyResult(data)).pipe(delay(this.getOption('delay')));
  }

  protected createDummyResult(data?: any): NbAuthResult {
    if (this.getOption('alwaysFail')) {
      return new NbAuthResult(false, this.createFailResponse(data), null, ['Something went wrong.']);
    }

    try {
      const token = this.createToken('test token', true);
      return new NbAuthResult(true, this.createSuccessResponse(data), '/', [], ['Successfully logged in.'], token);
    } catch (err) {
      return new NbAuthResult(false, this.createFailResponse(data), null, [(err as Error).message]);
    }
  }
}
