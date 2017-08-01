/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { InjectionToken } from '@angular/core';
import { NbMediaBreakpoint } from './services/breakpoints.service';
import { NbJSTheme } from './services/js-themes-registry.service';

export interface NbThemeOptions {
  name: string;
}

export const nbThemeOptionsToken = new InjectionToken<NbThemeOptions>('NB_THEME_OPTIONS');
export const nbMediaBreakpointsToken = new InjectionToken<NbMediaBreakpoint[]>('NB_MEDIA_BREAKPOINTS');
export const nbBuiltInJSThemesToken = new InjectionToken<NbJSTheme[]>('NB_BUILT_IN_THEMES');
export const nbJSThemesToken = new InjectionToken<NbJSTheme[]>('NB_THEMES');
