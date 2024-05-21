/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NbAuthOAuth2Token, NbAuthJWTToken, NbAuthSimpleToken, NbAuthOAuth2JWTToken } from '@nebular/auth';

describe('auth token', () => {
  describe('NbAuthJWTToken', () => {
    const now = new Date();

    /* eslint-disable */
    const simpleToken = new NbAuthSimpleToken('token', 'strategy');
    const validJWTToken = new NbAuthJWTToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjZXJlbWEuZnIiLCJpYXQiOjE1MzIzNTA4MDAsImV4cCI6MjUzMjM1MDgwMCwic3ViIjoiQWxhaW4gQ0hBUkxFUyIsImFkbWluIjp0cnVlfQ.Rgkgb4KvxY2wp2niXIyLJNJeapFp9z3tCF-zK6Omc8c',
      'strategy',
    );

    const noIatJWTToken = new NbAuthJWTToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjZXJlbWEuZnIiLCJleHAiOjE1MzI0MzcyMDAsInN1YiI6IkFsYWluIENIQVJMRVMiLCJhZG1pbiI6dHJ1ZX0.cfwQlKo6xomXkE-U-SOqse2GjdxncOuhdd1VWIOiYzA',
      'strategy',
    );

    const noExpJWTToken = new NbAuthJWTToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjZXJlbWEuZnIiLCJpYXQiOjE1MzIzNTA4MDAsInN1YiI6IkFsYWluIENIQVJMRVMiLCJhZG1pbiI6dHJ1ZX0.heHVXkHexwqbPCPUAvkJlXO6tvxzxTKf4iP0OWBbp7Y',
      'strategy',
    );

    const expiredJWTToken = new NbAuthJWTToken(
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY290Y2guaW8iLCJleHAiOjEzMDA4MTkzODAsIm5hbWUiOiJDaHJpcyBTZXZpbGxlamEiLCJhZG1pbiI6dHJ1ZX0.03f329983b86f7d9a9f5fef85305880101d5e302afafa20154d094b229f75773',
      'strategy',
    );

    /* eslint-enable */

    it('JWT Token constructor, not valid JWT token, must consist of three parts', () => {
      expect(() => {
        new NbAuthJWTToken('.', 'strategy');
      }).toThrow(new Error(`The payload . is not valid JWT payload and must consist of three parts.`));
    });

    it('JWT Token constructor,, not valid JWT token, cannot be decoded', () => {
      expect(() => {
        new NbAuthJWTToken('..', 'strategy');
      }).toThrow(new Error(`The payload .. is not valid JWT payload and cannot be decoded.`));
    });

    it('getPayload, not valid base64 in JWT token, cannot be decoded', () => {
      expect(() => {
        new NbAuthJWTToken('h%2BHY.h%2BHY.h%2BHY', 'strategy');
      }).toThrow(new Error(`The payload h%2BHY.h%2BHY.h%2BHY is not valid JWT payload and cannot be parsed.`));
    });

    it('getPayload success', () => {
      expect(validJWTToken.getPayload())
        // eslint-disable-next-line
        .toEqual(
          JSON.parse('{"iss":"cerema.fr","iat":1532350800,"exp":2532350800,"sub":"Alain CHARLES","admin":true}'),
        );
    });

    it('getCreatedAt success : now for simpleToken', () => {
      // we consider dates are the same if differing from minus than 10 ms
      expect(simpleToken.getCreatedAt().getTime() - now.getTime()).toBeLessThan(10);
    });

    it('getCreatedAt success : exp for validJWTToken', () => {
      const date = new Date();
      date.setTime(1532350800000);
      expect(validJWTToken.getCreatedAt()).toEqual(date);
    });

    it('getCreatedAt success : now for noIatJWTToken', () => {
      // we consider dates are the same if differing from minus than 10 ms
      expect(noIatJWTToken.getCreatedAt().getTime() - now.getTime()).toBeLessThan(10);
    });

    it('getCreatedAt success : now for simpleToken', () => {
      // we consider dates are the same if differing from minus than 10 ms
      expect(simpleToken.getCreatedAt().getTime() - now.getTime()).toBeLessThan(10);
    });

    it('getCreatedAt success : exp for validJWTToken', () => {
      const date = new Date();
      date.setTime(1532350800000);
      expect(validJWTToken.getCreatedAt()).toEqual(date);
    });

    it('getCreatedAt success : now for noIatJWTToken', () => {
      // we consider dates are the same if differing from minus than 10 ms
      expect(noIatJWTToken.getCreatedAt().getTime() - now.getTime()).toBeLessThan(10);
    });

    it('getTokenExpDate success', () => {
      const date = new Date(0);
      date.setTime(2532350800000);
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
      expect(new NbAuthJWTToken('', 'strategy', new Date()).isValid()).toBeFalsy();

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
        // eslint-disable-next-line
        .toEqual(
          JSON.parse('{"iss":"cerema.fr","iat":1532350800,"exp":2532350800,"sub":"Alain CHARLES","admin":true}'),
        );
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

    const noExpToken = new NbAuthOAuth2Token(
      {
        access_token: '2YotnFZFEjr1zCsicMWpAA',
        refresh_token: 'tGzv3JOkF0XG5Qx2TlKWIA',
        example_parameter: 'example_value',
      },
      'strategy',
    );

    it('getPayload success', () => {
      expect(validToken.getPayload()).toEqual(token);
    });

    it('empty token constructor, not valid token, cannot be decoded', () => {
      expect(() => {
        new NbAuthOAuth2Token({}, 'strategy');
      }).toThrow(new Error(`Cannot extract payload from an empty token.`));
    });

    it('getExpDate success', () => {
      // recreate it here if we want to be in the same second
      validToken = new NbAuthOAuth2Token(token, 'strategy');
      const date = new Date();
      date.setTime(date.getTime() + 3600 * 1000);
      expect(validToken.getTokenExpDate().getTime() - date.getTime()).toBeLessThan(10);
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

  describe('NbAuthOAuth2JWTToken', () => {
    const exp = 2532350800;
    const iat = 1532350800;
    const expires_in = 1000000000;

    const accessTokenPayload = {
      iss: 'cerema.fr',
      iat: 1532350800,
      exp: 2532350800,
      sub: 'Alain CHARLES',
      admin: true,
    };

    const validPayload = {
      // eslint-disable-next-line
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjZXJlbWEuZnIiLCJpYXQiOjE1MzIzNTA4MDAsImV4cCI6MjUzMjM1MDgwMCwic3ViIjoiQWxhaW4gQ0hBUkxFUyIsImFkbWluIjp0cnVlfQ.Rgkgb4KvxY2wp2niXIyLJNJeapFp9z3tCF-zK6Omc8c',
      expires_in: 1000000000,
      refresh_token: 'tGzv3JOkF0XG5Qx2TlKWIA',
      token_type: 'bearer',
      example_parameter: 'example_value',
    };

    const noExpButIatPayload = {
      // eslint-disable-next-line
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjZXJlbWEuZnIiLCJpYXQiOjE1MzIzNTA4MDAsInN1YiI6IkFsYWluIENIQVJMRVMiLCJhZG1pbiI6dHJ1ZX0.heHVXkHexwqbPCPUAvkJlXO6tvxzxTKf4iP0OWBbp7Y',
      expires_in: expires_in,
      refresh_token: 'tGzv3JOkF0XG5Qx2TlKWIA',
      token_type: 'bearer',
      example_parameter: 'example_value',
    };

    const noExpNoIatPayload = {
      // eslint-disable-next-line
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjZXJlbWEuZnIiLCJzdWIiOiJBbGFpbiBDSEFSTEVTIiwiYWRtaW4iOnRydWV9.LKZggkN-r_5hnEcCg5GzbSqZz5_SUHEB1Bf9Sy1qJd4',
      expires_in: expires_in,
      refresh_token: 'tGzv3JOkF0XG5Qx2TlKWIA',
      token_type: 'bearer',
      example_parameter: 'example_value',
    };

    const permanentPayload = {
      // eslint-disable-next-line
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjZXJlbWEuZnIiLCJzdWIiOiJBbGFpbiBDSEFSTEVTIiwiYWRtaW4iOnRydWV9.LKZggkN-r_5hnEcCg5GzbSqZz5_SUHEB1Bf9Sy1qJd4',
      token_type: 'bearer',
      example_parameter: 'example_value',
    };

    const validToken = new NbAuthOAuth2JWTToken(validPayload, 'strategy');
    let noExpButIatToken = new NbAuthOAuth2JWTToken(noExpButIatPayload, 'strategy');
    const permanentToken = new NbAuthOAuth2JWTToken(permanentPayload, 'strategy');

    it('getPayload success', () => {
      expect(validToken.getPayload()).toEqual(validPayload);
    });

    it('getAccessTokenPayload success', () => {
      expect(validToken.getAccessTokenPayload()).toEqual(accessTokenPayload);
    });

    it('empty token constructor, not valid token, cannot be decoded', () => {
      expect(() => {
        new NbAuthOAuth2JWTToken({}, 'strategy');
      }).toThrow(new Error(`Cannot extract payload from an empty token.`));
    });

    it('getCreatedAt success for valid token', () => {
      const date = new Date(0);
      date.setUTCSeconds(iat);
      expect(validToken.getCreatedAt()).toEqual(date);
    });

    it('getCreatedAt success for no iat token', () => {
      noExpButIatToken = new NbAuthOAuth2JWTToken(noExpButIatPayload, 'strategy');
      const date = new Date();
      expect(noExpButIatToken.getCreatedAt().getTime() - date.getTime()).toBeLessThan(10);
    });

    it('getExpDate success when exp is set', () => {
      const date = new Date(0);
      date.setUTCSeconds(exp);
      expect(validToken.getTokenExpDate()).toEqual(date);
    });

    it('getExpDate success when exp is not set but iat and expires_in are set', () => {
      const date = new Date(0);
      date.setUTCSeconds(iat + expires_in);
      expect(noExpButIatToken.getTokenExpDate()).toEqual(date);
    });

    it('getExpDate success when only expires_in is set', () => {
      const NoExpNoIatToken = new NbAuthOAuth2JWTToken(noExpNoIatPayload, 'strategy');
      const date = new Date();
      date.setTime(date.getTime() + expires_in * 1000);
      expect(NoExpNoIatToken.getTokenExpDate().getTime() - date.getTime()).toBeLessThan(10);
    });

    it('getTokenExpDate is empty', () => {
      expect(permanentToken.getTokenExpDate()).toBeNull();
    });

    it('name', () => {
      expect(NbAuthOAuth2JWTToken.NAME).toEqual(validToken.getName());
    });
  });
});
