/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { InjectionToken } from '@angular/core';
import { NbMediaBreakpoint } from './services/breakpoints.service';
import { NbJSThemeOptions } from './services/js-themes/theme.options';

export interface NbThemeOptions {
  name: string;
}

export const NB_THEME_OPTIONS = new InjectionToken<NbThemeOptions>('Nebular Theme Options');
export const NB_MEDIA_BREAKPOINTS = new InjectionToken<NbMediaBreakpoint[]>('Nebular Media Breakpoints');
export const NB_BUILT_IN_JS_THEMES = new InjectionToken<NbJSThemeOptions[]>('Nebular Built-in JS Themes');
export const NB_JS_THEMES = new InjectionToken<NbJSThemeOptions[]>('Nebular JS Themes');

/**
 * We're providing browser apis with tokens to improve testing capabilities.
 * */
export const NB_WINDOW = new InjectionToken<Window>('Window');
export const NB_DOCUMENT = new InjectionToken<Document>('Document');
