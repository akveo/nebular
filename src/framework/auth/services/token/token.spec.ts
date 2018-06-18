/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NbAuthOAuth2Token, NbAuthJWTToken, NbAuthSimpleToken } from './token';


describe('auth token', () => {
  describe('NbAuthJWTToken', () => {
    // tslint:disable
    const simpleToken = new NbAuthSimpleToken('token');
    const validJWTToken = new NbAuthJWTToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY290Y2guaW8iLCJleHAiOjI1MTczMTQwNjYxNzUsIm5hbWUiOiJDaHJpcyBTZXZpbGxlamEiLCJhZG1pbiI6dHJ1ZX0=.03f329983b86f7d9a9f5fef85305880101d5e302afafa20154d094b229f75773');
    const emptyJWTToken = new NbAuthJWTToken('..');
    const invalidBase64JWTToken = new NbAuthJWTToken('h%2BHY.h%2BHY.h%2BHY');

    const invalidJWTToken = new NbAuthJWTToken('.');

    const noExpJWTToken = new NbAuthJWTToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY290Y2guaW8iLCJuYW1lIjoiQ2hyaXMgU2V2aWxsZWphIiwiYWRtaW4iOnRydWV9.03f329983b86f7d9a9f5fef85305880101d5e302afafa20154d094b229f75773');

    const expiredJWTToken = new NbAuthJWTToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY290Y2guaW8iLCJleHAiOjEzMDA4MTkzODAsIm5hbWUiOiJDaHJpcyBTZXZpbGxlamEiLCJhZG1pbiI6dHJ1ZX0.03f329983b86f7d9a9f5fef85305880101d5e302afafa20154d094b229f75773');
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

    it('getTokenExpDate success', () => {
      const date = new Date(0);
      date.setUTCSeconds(2517314066175);
      expect(validJWTToken.getTokenExpDate()).toEqual(date);
    });

    it('getTokenExpDate is empty', () => {
      expect(noExpJWTToken.getTokenExpDate()).toBeNull();
    });

    it('no exp date token is valid', () => {
      expect(noExpJWTToken.isValid()).toEqual(true);
    });

    it('isValid success', () => {
      expect(validJWTToken.isValid()).toEqual(true);
    });

    it('isValid fail', () => {
      // without token
      expect(new NbAuthJWTToken('').isValid()).toBeFalsy();

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

    const validToken = new NbAuthOAuth2Token(token);
    const emptyToken = new NbAuthOAuth2Token({});

    const noExpToken = new NbAuthOAuth2Token({
      access_token: '2YotnFZFEjr1zCsicMWpAA',
      refresh_token: 'tGzv3JOkF0XG5Qx2TlKWIA',
      example_parameter: 'example_value',
    });

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

    it('getTokenExpDate success', () => {
      const date = new Date();
      date.setUTCSeconds(date.getUTCSeconds() + 3600);
      expect(validToken.getTokenExpDate().getFullYear()).toEqual(date.getFullYear());
      expect(validToken.getTokenExpDate().getDate()).toEqual(date.getDate());
      expect(validToken.getTokenExpDate().getMonth()).toEqual(date.getMonth());
      expect(validToken.getTokenExpDate().getMinutes()).toEqual(date.getMinutes());
      expect(validToken.getTokenExpDate().getSeconds()).toEqual(date.getSeconds());
    });

    it('getTokenExpDate is empty', () => {
      expect(noExpToken.getTokenExpDate()).toBeNull();
    });

    it('toString is json', () => {
      expect(String(validToken)).toEqual(JSON.stringify(token));
    });

    it('getTokenExpDate is empty', () => {
      expect(validToken.getType()).toEqual(token.token_type);
    });

    it('getTokenExpDate is empty', () => {
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
