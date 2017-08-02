import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { NbAuthResult } from '../services/auth.service';
import { NbAbstractAuthProvider } from './abstract-auth.provider';

export interface NbDummyAuthProviderConfig {
  delay?: number;
  alwaysFail?: boolean;
}

@Injectable()
export class NbDummyAuthProvider extends NbAbstractAuthProvider {

  protected defaultConfig: NbDummyAuthProviderConfig = {
    delay: 1000,
  };

  authenticate(data?: any): Observable<NbAuthResult> {
    return Observable.of(this.createDummyResult(data))
      .delay(this.getConfigValue('delay'));
  }

  register(data?: any): Observable<NbAuthResult> {
    return Observable.of(this.createDummyResult(data))
      .delay(this.getConfigValue('delay'));
  }

  requestPassword(data?: any): Observable<NbAuthResult> {
    return Observable.of(this.createDummyResult(data))
      .delay(this.getConfigValue('delay'));
  }

  resetPassword(data?: any): Observable<NbAuthResult> {
    return Observable.of(this.createDummyResult(data))
      .delay(this.getConfigValue('delay'));
  }

  logout(data?: any): Observable<NbAuthResult> {
    return Observable.of(this.createDummyResult(data))
      .delay(this.getConfigValue('delay'));
  }

  protected createDummyResult(data?: any): NbAuthResult {
    if (this.getConfigValue('alwaysFail')) {
      return new NbAuthResult(false,
        this.createFailResponse(data),
        null,
        ['Something went wrong.']);
    }

    return new NbAuthResult(true, this.createSuccessResponse(data), '/', ['Successfully logged in.']);
  }
}
