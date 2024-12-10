/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { inject, TestBed, waitForAsync } from '@angular/core/testing';

import {
  NbAuthSimpleToken,
  nbAuthCreateToken,
  NbAuthJWTToken,
  NB_AUTH_FALLBACK_TOKEN,
  NbAuthTokenParceler,
  NB_AUTH_TOKENS,
} from '@nebular/auth';

describe('token-parceler', () => {
  let tokenParceler: NbAuthTokenParceler;

  const createdAt = new Date(1532350800000);
  const simpleToken = nbAuthCreateToken(NbAuthSimpleToken, 'test value', 'strategy', createdAt);
  // eslint-disable-next-line
  const wrappedSimple = `{"name":"${
    NbAuthSimpleToken.NAME
  }","ownerStrategyName":"${simpleToken.getOwnerStrategyName()}","createdAt":${simpleToken
    .getCreatedAt()
    .getTime()},"value":"${simpleToken.getValue()}"}`;
  // eslint-disable-next-line
  const jwtToken = nbAuthCreateToken(
    NbAuthJWTToken,
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjZXJlbWEuZnIiLCJpYXQiOjE1MzIzNTA4MDAsImV4cCI6MTUzMjQzNzIwMCwic3ViIjoiQWxhaW4gQ0hBUkxFUyIsImFkbWluIjp0cnVlfQ.iICwNqhvg9KPv3_MSg3HCydyAgAYI9mL3ZejLkY11Ck',
    'strategy',
    createdAt,
  );
  // eslint-disable-next-line
  const wrappedJWT = `{"name":"${
    NbAuthJWTToken.NAME
  }","ownerStrategyName":"${jwtToken.getOwnerStrategyName()}","createdAt":${jwtToken
    .getCreatedAt()
    .getTime()},"value":"${jwtToken.getValue()}"}`;
  // eslint-disable-next-line
  const wrappedNonExisting = `{"name":"non-existing","value":"${simpleToken.getValue()}","ownerStrategyName":"${simpleToken.getOwnerStrategyName()}","createdAt":"${createdAt.getTime()}"}`;
  const wrappedInvalid = `{"name":"non-existing"`;

  describe('default configuration', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: NB_AUTH_FALLBACK_TOKEN, useValue: NbAuthSimpleToken },
          { provide: NB_AUTH_TOKENS, useValue: [NbAuthSimpleToken, NbAuthJWTToken] },
          NbAuthTokenParceler,
        ],
      });
    });

    beforeEach(
      waitForAsync(
        inject([NbAuthTokenParceler], (_tokenParceler) => {
          tokenParceler = _tokenParceler;
        }),
      ),
    );

    it('wraps simple', () => {
      expect(tokenParceler.wrap(simpleToken)).toEqual(wrappedSimple);
    });

    it('wraps jwt', () => {
      expect(tokenParceler.wrap(jwtToken)).toEqual(wrappedJWT);
    });

    it('unwraps simple', () => {
      expect(tokenParceler.unwrap(wrappedSimple)).toEqual(simpleToken);
    });

    it('unwraps jwt', () => {
      expect(tokenParceler.unwrap(wrappedJWT)).toEqual(jwtToken);
    });

    it('unwraps non existing', () => {
      expect(tokenParceler.unwrap(wrappedNonExisting)).toEqual(simpleToken);
    });

    it('unwraps invalid', () => {
      const token = tokenParceler.unwrap(wrappedInvalid);
      expect(token.getName()).toEqual(simpleToken.getName());
      expect(token.getValue()).toEqual('');
    });
  });

  describe('fail configuration', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          { provide: NB_AUTH_FALLBACK_TOKEN, useValue: NbAuthSimpleToken },
          { provide: NB_AUTH_TOKENS, useValue: [] },
          NbAuthTokenParceler,
        ],
      });
    });

    beforeEach(
      waitForAsync(
        inject([NbAuthTokenParceler], (_tokenParceler) => {
          tokenParceler = _tokenParceler;
        }),
      ),
    );

    it('unwraps jwt to fallback simple as none provided', () => {
      const token = tokenParceler.unwrap(wrappedJWT);
      expect(token.getName()).toEqual(simpleToken.getName());

      expect(token.getValue()).toEqual(jwtToken.getValue());
    });
  });
});
