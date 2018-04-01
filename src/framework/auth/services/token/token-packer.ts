import { Inject, Injectable } from '@angular/core';

import { NB_AUTH_TOKENS } from '../../auth.options';
import { NbAuthSimpleToken, NbAuthToken, nbCreateToken } from './token';

interface NbTokenPack {
  class: string,
  value: string,
}

/**
 *
 */
@Injectable()
export class NbAuthTokenPacker {

  constructor(@Inject(NB_AUTH_TOKENS) private availableTokens) {
  }

  pack(token: NbAuthToken): string {
    return JSON.stringify({
      class: token.constructor.name,
      value: token.toString(),
    });
  }

  unpack(rawToken: string): NbAuthToken {
    let tokenPack: NbTokenPack;
    try {
      tokenPack = JSON.parse(rawToken);
    } catch (e) {
      console.warn('NbAuthToken: Can not unpack token, using empty `NbAuthSimpleToken`.');
    }

    let tokenClass = NbAuthSimpleToken;
    let tokenValue = '';
    // if we don't have any value stored, we cannot guess a token class, so we set it to default
    if (tokenPack && tokenPack.class) {
      tokenClass = this.availableTokens[tokenPack.class] || tokenClass;
      tokenValue = tokenPack.value;
    }
    return nbCreateToken(tokenClass, tokenValue);
  }
}
