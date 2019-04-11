/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

export function isUrlPathEqual(path, link) {
  const locationPath = getPathPartOfUrl(path);
  return link === locationPath;
}

export function isUrlPathContain(path, link) {
  const locationPath = getPathPartOfUrl(path);
  const endOfUrlSegmentRegExp = /\/|^$/;
  return locationPath.startsWith(link) &&
    locationPath.slice(link.length).charAt(0).search(endOfUrlSegmentRegExp) !== -1;
}

export function getPathPartOfUrl(url): string {
  return url.match(/.*?(?=[?;#]|$)/)[0];
}

export function getFragmentPartOfUrl(url: string): string {
  const matched = url.match(/#(.+)/);
  return matched ? matched[1] : '';
}

export function isFragmentEqual(path: string, fragment: string): boolean {
  return getFragmentPartOfUrl(path) === fragment;
}

export function isFragmentContain(path: string, fragment: string): boolean {
  return getFragmentPartOfUrl(path).includes(fragment);
}
