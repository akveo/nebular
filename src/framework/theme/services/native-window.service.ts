/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { isPlatformBrowser } from '@angular/common';
import {
  ClassProvider,
  FactoryProvider,
  PLATFORM_ID,
} from '@angular/core';

import { NB_WINDOW } from '../theme.options';

/* Define abstract class for obtaining reference to the global window object. */
export abstract class NativeWindowRef {
  get nativeWindow(): Window | Object {
    throw new Error('Not implemented.');
  }
}

/* Define class that implements the abstract class and returns the native window object. */
export class BrowserWindowRef extends NativeWindowRef {

  constructor() {
    super();
  }

  get nativeWindow(): Window | Object {
    return window;
  }

}

/* Create an factory function that returns the native window object. */
export function windowFactory(browserWindowRef: BrowserWindowRef, platformId: Object): Window | Object {
  if (isPlatformBrowser(platformId)) {
    return browserWindowRef.nativeWindow;
  }

  return {};
}

/* Create a injectable provider for the WindowRef token that uses the BrowserWindowRef class. */
const browserWindowProvider: ClassProvider = {
  provide: NativeWindowRef,
  useClass: BrowserWindowRef,
};

/* Create an injectable provider that uses the windowFactory function for returning the native window object. */
const windowProvider: FactoryProvider = {
  provide: NB_WINDOW,
  useFactory: windowFactory,
  deps: [ NativeWindowRef, PLATFORM_ID ],
};

/* Create an array of providers. */
export const WINDOW_PROVIDERS = [
  browserWindowProvider,
  windowProvider,
];
