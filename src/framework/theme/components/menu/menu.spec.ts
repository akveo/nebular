/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { isUrlPathContain, isUrlPathEqual } from './url-matching-helpers';


describe('menu URL helpers', () => {
  it('isUrlPathContain should work by url segments', () => {
    expect(isUrlPathContain('/a/ba', '/a/b')).toBeFalsy();
    expect(isUrlPathContain('/a/b/c', '/a/b')).toBeTruthy();
  });

  it('isUrlPathContain should work for url with fragments', () => {
    expect(isUrlPathContain('/a/b#fragment', '/a/b')).toBeTruthy();
  });

  it('isUrlPathContain should work for url with query strings', () => {
    expect(isUrlPathContain('/a/b?a=1;b=2&c=3', '/a/b')).toBeTruthy();
  });

  it('isUrlPathEqual should work for identical paths', () => {
    expect(isUrlPathEqual('/a/b/c', '/a/b')).toBeFalsy();
    expect(isUrlPathEqual('/a/b/c', '/a/b/c')).toBeTruthy();
  });

  it('isUrlPathEqual should work for url with fragments', () => {
    expect(isUrlPathEqual('/a/b/c#fragment', '/a/b/c')).toBeTruthy();
  });

  it('isUrlPathEqual should work for url with query strings', () => {
    expect(isUrlPathEqual('/a/b/c?a=1;b=2&c=3', '/a/b/c')).toBeTruthy();
  });

})


