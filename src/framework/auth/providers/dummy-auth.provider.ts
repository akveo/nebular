import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators/delay';

import { NbAbstractAuthProvider } from './abstract-auth.provider';
import { NbAuthResult, NbAuthSimpleToken, NbTokenClass } from '../services';
import { NbProviderRegister } from '../auth.options';

export interface NbDummyAuthProviderConfig {
  delay?: number;
  alwaysFail?: boolean;
}

@Injectable()
export class NbDummyAuthProvider extends NbAbstractAuthProvider {

  protected defaultConfig: NbDummyAuthProviderConfig = {
    delay: 1000,
  };

  static register(name: string,
                  config: NbDummyAuthProviderConfig,
                  token: NbTokenClass = NbAuthSimpleToken): NbProviderRegister {
    return [name, NbDummyAuthProvider, config, token];
  }

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

  protected createDummyResult(data?: any): NbAuthResult {
    if (this.getConfigValue('alwaysFail')) {
      // TODO we dont call tokenService clear during logout in case result is not success
      return new NbAuthResult(false,
        this.createFailResponse(data),
        null,
        ['Something went wrong.']);
    }

    return new NbAuthResult(true,
      this.createSuccessResponse(data),
      '/',
      [],
      ['Successfully logged in.'],
      this.createToken('test token'));
  }
}
