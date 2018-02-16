/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NbAuthJWTToken } from './token';


describe('auth JWT token', () => {
  // tslint:disable
  const validJWTToken = new NbAuthJWTToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY290Y2guaW8iLCJleHAiOjI1MTczMTQwNjYxNzUsIm5hbWUiOiJDaHJpcyBTZXZpbGxlamEiLCJhZG1pbiI6dHJ1ZX0=.03f329983b86f7d9a9f5fef85305880101d5e302afafa20154d094b229f75773');
  const emptyJWTToken = new NbAuthJWTToken('..');

  const invakidJWTToken = new NbAuthJWTToken('.');

  const noExpJWTToken = new NbAuthJWTToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY290Y2guaW8iLCJuYW1lIjoiQ2hyaXMgU2V2aWxsZWphIiwiYWRtaW4iOnRydWV9.03f329983b86f7d9a9f5fef85305880101d5e302afafa20154d094b229f75773');

  const expiredJWTToken = new NbAuthJWTToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzY290Y2guaW8iLCJleHAiOjEzMDA4MTkzODAsIm5hbWUiOiJDaHJpcyBTZXZpbGxlamEiLCJhZG1pbiI6dHJ1ZX0.03f329983b86f7d9a9f5fef85305880101d5e302afafa20154d094b229f75773');
  // tslint:enable

  it('getPayload success', () => {
    expect(validJWTToken.getPayload())
      .toEqual(JSON.parse('{"iss":"scotch.io","exp":2517314066175,"name":"Chris Sevilleja","admin":true}'));
  });

  it('getPayload, not valid JWT token, must consist of three parts', () => {
    expect(() => {
      invakidJWTToken.getPayload();
    })
      .toThrow(new Error(
        `The token ${invakidJWTToken.getValue()} is not valid JWT token and must consist of three parts.`));
  });

  it('getPayload, not valid JWT token, cannot be decoded', () => {
    expect(() => {
      emptyJWTToken.getPayload();
    })
      .toThrow(new Error(
        `The token ${emptyJWTToken.getValue()} is not valid JWT token and cannot be decoded.`));
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
});
