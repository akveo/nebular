/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { async, inject, TestBed } from '@angular/core/testing';

import { NbAuthSimpleToken, nbAuthCreateToken, NbAuthJWTToken } from './token';
import { NB_AUTH_FALLBACK_TOKEN, NbAuthTokenParceler } from './token-parceler';
import { NB_AUTH_TOKENS } from '../../auth.options';

describe('token-parceler', () => {

  let tokenParceler: NbAuthTokenParceler;
  const simpleToken = nbAuthCreateToken(NbAuthSimpleToken, 'test value');
  const wrappedSimple = `{"name":"${NbAuthSimpleToken.NAME}","value":"${simpleToken.getValue()}"}`;
  // tslint:disable-next-line
  const jwtToken = nbAuthCreateToken(NbAuthJWTToken, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY290Y2guaW8iLCJleHAiOjI1MTczMTQwNjYxNzUsIm5hbWUiOiJDaHJpcyBTZXZpbGxlamEiLCJhZG1pbiI6dHJ1ZX0=.03f329983b86f7d9a9f5fef85305880101d5e302afafa20154d094b229f75773');
  const wrappedJWT = `{"name":"${NbAuthJWTToken.NAME}","value":"${jwtToken.getValue()}"}`;

  const wrappedNonExisting = `{"name":"non-existing","value":"${simpleToken.getValue()}"}`;
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

    beforeEach(async(inject(
      [NbAuthTokenParceler],
      (_tokenParceler) => {
        tokenParceler = _tokenParceler;
      },
    )));

    it('wraps simple', () => {
      expect(tokenParceler.wrap(simpleToken))
        .toEqual(wrappedSimple);
    });

    it('wraps jwt', () => {
      expect(tokenParceler.wrap(jwtToken))
        .toEqual(wrappedJWT);
    });

    it('unwraps simple', () => {
      expect(tokenParceler.unwrap(wrappedSimple))
        .toEqual(simpleToken);
    });

    it('unwraps jwt', () => {
      expect(tokenParceler.unwrap(wrappedJWT))
        .toEqual(jwtToken);
    });

    it('unwraps non existing', () => {
      expect(tokenParceler.unwrap(wrappedNonExisting))
        .toEqual(simpleToken);
    });

    it('unwraps invalid', () => {
      const token = tokenParceler.unwrap(wrappedInvalid);
      expect(token.getName())
        .toEqual(simpleToken.getName());
      expect(token.getValue())
        .toEqual('');
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

    beforeEach(async(inject(
      [NbAuthTokenParceler],
      (_tokenParceler) => {
        tokenParceler = _tokenParceler;
      },
    )));

    it('unwraps jwt to fallback simple as none provided', () => {

      const token = tokenParceler.unwrap(wrappedJWT);
      expect(token.getName())
        .toEqual(simpleToken.getName());

      expect(token.getValue())
        .toEqual(jwtToken.getValue());
    });

  });
});
