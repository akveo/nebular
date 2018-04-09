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

export const nbThemeOptionsToken = new InjectionToken<NbThemeOptions>('NB_THEME_OPTIONS');
export const nbMediaBreakpointsToken = new InjectionToken<NbMediaBreakpoint[]>('NB_MEDIA_BREAKPOINTS');
export const nbBuiltInJSThemesToken = new InjectionToken<NbJSThemeOptions[]>('NB_BUILT_IN_THEMES');
export const nbJSThemesToken = new InjectionToken<NbJSThemeOptions[]>('NB_THEMES');

/**
 * We're providing browser apis with tokens to improve testing capabilities.
 * */
export const NB_WINDOW = new InjectionToken<Window>('NB_WINDOW');
export const NB_DOCUMENT = new InjectionToken<Document>('NB_DOCUMENT');
