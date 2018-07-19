import { Inject, Injectable, InjectionToken } from '@angular/core';

import { nbAuthCreateToken, NbAuthToken, NbAuthTokenClass } from './token';
import { NB_AUTH_TOKENS } from '../../auth.options';

export interface NbTokenPack {
  name: string,
  strategyName: string,
  expDate: Date;
  value: string,
}

export const NB_AUTH_FALLBACK_TOKEN = new InjectionToken<NbAuthTokenClass>('Nebular Auth Options');

/**
 * Creates a token parcel which could be stored/restored
 */
@Injectable()
export class NbAuthTokenParceler {

  constructor(@Inject(NB_AUTH_FALLBACK_TOKEN) private fallbackClass: NbAuthTokenClass,
              @Inject(NB_AUTH_TOKENS) private tokenClasses: NbAuthTokenClass[]) {
  }

  wrap(token: NbAuthToken): string {
    const theToken = {
      name: token.getName(),
      strategyName: token.getStrategyName(),
      value: token.getValue(),
    }
    if (token.getExpDate()) {
      theToken['expDate'] = token.getExpDate();
    }
    return JSON.stringify(theToken);
  }

  unwrap(value: string): NbAuthToken {
    let tokenClass: NbAuthTokenClass = this.fallbackClass;
    let tokenValue = '';
    let tokenStrategyName = '';
    let tokenExpDate: Date;

    const tokenPack: NbTokenPack = this.parseTokenPack(value);
    if (tokenPack) {
      tokenClass = this.getClassByName(tokenPack.name) || this.fallbackClass;
      tokenValue = tokenPack.value;
      tokenExpDate = tokenPack.expDate;
      tokenStrategyName = tokenPack.strategyName;
    }

    return nbAuthCreateToken(tokenClass, tokenValue, tokenStrategyName, tokenExpDate);
  }

  // TODO: this could be moved to a separate token registry
  protected getClassByName(name): NbAuthTokenClass {
    return this.tokenClasses.find((tokenClass: NbAuthTokenClass) => tokenClass.NAME === name);
  }

  protected parseTokenPack(value): NbTokenPack {
    try {
      return JSON.parse(value);
    } catch (e) { }
    return null;
  }
}
