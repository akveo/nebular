/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NbAuthOAuth2Token, NbAuthJWTToken, NbAuthSimpleToken } from './token';


describe('auth token', () => {
  describe('NbAuthJWTToken', () => {
    // tslint:disable
    const simpleToken = new NbAuthSimpleToken('token','strategy');
    const validJWTToken = new NbAuthJWTToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY290Y2guaW8iLCJleHAiOjI1MTczMTQwNjYxNzUsIm5hbWUiOiJDaHJpcyBTZXZpbGxlamEiLCJhZG1pbiI6dHJ1ZX0=.03f329983b86f7d9a9f5fef85305880101d5e302afafa20154d094b229f75773', 'strategy');
    const emptyJWTToken = new NbAuthJWTToken('..', 'strategy');
    const invalidBase64JWTToken = new NbAuthJWTToken('h%2BHY.h%2BHY.h%2BHY','strategy');

    const invalidJWTToken = new NbAuthJWTToken('.','strategy');

    const noExpJWTToken = new NbAuthJWTToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY290Y2guaW8iLCJuYW1lIjoiQ2hyaXMgU2V2aWxsZWphIiwiYWRtaW4iOnRydWV9.03f329983b86f7d9a9f5fef85305880101d5e302afafa20154d094b229f75773','strategy');

    const expiredJWTToken = new NbAuthJWTToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY290Y2guaW8iLCJleHAiOjEzMDA4MTkzODAsIm5hbWUiOiJDaHJpcyBTZXZpbGxlamEiLCJhZG1pbiI6dHJ1ZX0.03f329983b86f7d9a9f5fef85305880101d5e302afafa20154d094b229f75773','strategy');
    // tslint:enable

    it('getPayload success', () => {
      expect(validJWTToken.getPayload())
        .toEqual(JSON.parse('{"iss":"scotch.io","exp":2517314066175,"name":"Chris Sevilleja","admin":true}'));
    });

    it('getPayload, not valid JWT token, must consist of three parts', () => {
      expect(() => {
        invalidJWTToken.getPayload();
      })
        .toThrow(new Error(
          `The token ${invalidJWTToken.getValue()} is not valid JWT token and must consist of three parts.`));
    });

    it('getPayload, not valid JWT token, cannot be decoded', () => {
      expect(() => {
        emptyJWTToken.getPayload();
      })
        .toThrow(new Error(
          `The token ${emptyJWTToken.getValue()} is not valid JWT token and cannot be decoded.`));
    });

    it('getPayload, not valid base64 in JWT token, cannot be decoded', () => {
      expect(() => {
        invalidBase64JWTToken.getPayload();
      })
        .toThrow(new Error(
          `The token ${invalidBase64JWTToken.getValue()} is not valid JWT token and cannot be parsed.`));
    });

    it('getExpDate success', () => {
      const date = new Date(0);
      date.setUTCSeconds(2517314066175);
      expect(validJWTToken.getExpDate()).toEqual(date);
    });

    it('getExpDate is empty', () => {
      expect(noExpJWTToken.getExpDate()).toBeNull();
    });

    it('no exp date token is valid', () => {
      expect(noExpJWTToken.isValid()).toEqual(true);
    });

    it('isValid success', () => {
      expect(validJWTToken.isValid()).toEqual(true);
    });

    it('isValid fail', () => {
      // without token
      expect(new NbAuthJWTToken('', 'strategy').isValid()).toBeFalsy();

      // expired date
      expect(expiredJWTToken.isValid()).toBeFalsy();
    });

    it('NbAuthJWTToken name', () => {
      // without token
      expect(NbAuthJWTToken.NAME).toEqual(validJWTToken.getName());
    });

    it('NbAuthSimpleToken name', () => {
      // without token
      expect(NbAuthSimpleToken.NAME).toEqual(simpleToken.getName());
    });

    it('NbAuthSimpleToken has payload', () => {
      // without token
      expect(simpleToken.getPayload()).toEqual(null);
    });

    it('getPayload success', () => {
      expect(validJWTToken.getPayload())
        .toEqual(JSON.parse('{"iss":"scotch.io","exp":2517314066175,"name":"Chris Sevilleja","admin":true}'));
    });

    it('NbAuthJWTToken name', () => {
      // without token
      expect(NbAuthJWTToken.NAME).toEqual(validJWTToken.getName());
    });

    it('NbAuthSimpleToken name', () => {
      // without token
      expect(NbAuthSimpleToken.NAME).toEqual(simpleToken.getName());
    });

    it('NbAuthSimpleToken has payload', () => {
      // without token
      expect(simpleToken.getPayload()).toEqual(null);
    });
  });

  describe('NbAuthOAuth2Token', () => {

    const token = {
      access_token: '2YotnFZFEjr1zCsicMWpAA',
      expires_in: 3600,
      refresh_token: 'tGzv3JOkF0XG5Qx2TlKWIA',
      token_type: 'bearer',
      example_parameter: 'example_value',
    };

    let validToken = new NbAuthOAuth2Token(token, 'strategy');
    const emptyToken = new NbAuthOAuth2Token({}, 'strategy');

    const noExpToken = new NbAuthOAuth2Token({
      access_token: '2YotnFZFEjr1zCsicMWpAA',
      refresh_token: 'tGzv3JOkF0XG5Qx2TlKWIA',
      example_parameter: 'example_value',
    }, 'strategy');

    it('getPayload success', () => {
      expect(validToken.getPayload()).toEqual(token);
    });

    it('getPayload, not valid token, cannot be decoded', () => {
      expect(() => {
        emptyToken.getPayload();
      })
        .toThrow(new Error(
          `Cannot extract payload from an empty token.`));
    });

    it('getExpDate success', () => {
      // recreate it here if we want to be in the same second
      validToken = new NbAuthOAuth2Token(token, 'strategy');
      const date = new Date();
      date.setTime(date.getTime() + 3600000);
      expect(validToken.getExpDate().getFullYear()).toEqual(date.getFullYear());
      expect(validToken.getExpDate().getDate()).toEqual(date.getDate());
      expect(validToken.getExpDate().getMonth()).toEqual(date.getMonth());
      expect(validToken.getExpDate().getMinutes()).toEqual(date.getMinutes());
      expect(validToken.getExpDate().getSeconds()).toEqual(date.getSeconds());
    });

    it('getExpDate is empty', () => {
      expect(noExpToken.getExpDate()).toBeNull();
    });

    it('toString is json', () => {
      expect(String(validToken)).toEqual(JSON.stringify(token));
    });

    it('getExpDate is empty', () => {
      expect(validToken.getType()).toEqual(token.token_type);
    });

    it('getExpDate is empty', () => {
      expect(noExpToken.getRefreshToken()).toEqual(token.refresh_token);
    });

    it('no exp date token is valid', () => {
      expect(noExpToken.isValid()).toEqual(true);
    });

    it('isValid success', () => {
      expect(validToken.isValid()).toEqual(true);
    });

    it('name', () => {
      expect(NbAuthOAuth2Token.NAME).toEqual(validToken.getName());
    });
  });
});
