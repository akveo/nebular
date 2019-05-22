/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

import {
  NB_BUILT_IN_JS_THEMES,
  NB_MEDIA_BREAKPOINTS,
  NbThemeOptions,
  NB_THEME_OPTIONS,
  NB_JS_THEMES,
  NB_DOCUMENT,
  NB_WINDOW,
} from './theme.options';
import { NbThemeService } from './services/theme.service';
import { NbSpinnerService } from './services/spinner.service';
import { NbJSThemeOptions } from './services/js-themes/theme.options';
import { BUILT_IN_THEMES, NbJSThemesRegistry } from './services/js-themes-registry.service';
import {
  DEFAULT_MEDIA_BREAKPOINTS,
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
} from './services/breakpoints.service';
import { NbLayoutDirectionService, NbLayoutDirection, NB_LAYOUT_DIRECTION } from './services/direction.service';
import { NbLayoutScrollService } from './services/scroll.service';
import { NbLayoutRulerService } from './services/ruler.service';
import { NbOverlayModule } from './components/cdk/overlay/overlay.module';

export function nbWindowFactory() {
  return window;
}

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
  ],
})
export class NbThemeModule {

  // TODO: check the options (throw exception?)
  /**
   * Main Theme Module
   *
   * @param nbThemeOptions {NbThemeOptions} Main theme options
   * @param nbJSThemes {NbJSThemeOptions[]} List of JS Themes, will be merged with default themes
   * @param nbMediaBreakpoints {NbMediaBreakpoint} Available media breakpoints
   * @param layoutDirection {NbLayoutDirection} Layout direction
   *
   * @returns {ModuleWithProviders}
   */
  static forRoot(nbThemeOptions: NbThemeOptions = { name: 'default' },
                 nbJSThemes?: NbJSThemeOptions[],
                 nbMediaBreakpoints?: NbMediaBreakpoint[],
                 layoutDirection?: NbLayoutDirection): ModuleWithProviders {

    return <ModuleWithProviders> {
      ngModule: NbThemeModule,
      providers: [
        { provide: NB_THEME_OPTIONS, useValue: nbThemeOptions || {} },
        { provide: NB_BUILT_IN_JS_THEMES, useValue: BUILT_IN_THEMES },
        { provide: NB_JS_THEMES, useValue: nbJSThemes || [] },
        { provide: NB_MEDIA_BREAKPOINTS, useValue: nbMediaBreakpoints || DEFAULT_MEDIA_BREAKPOINTS },
        { provide: NB_WINDOW, useFactory: nbWindowFactory },
        { provide: NB_DOCUMENT, useExisting: DOCUMENT },
        NbJSThemesRegistry,
        NbThemeService,
        NbMediaBreakpointsService,
        NbSpinnerService,
        { provide: NB_LAYOUT_DIRECTION, useValue: layoutDirection || NbLayoutDirection.LTR },
        NbLayoutDirectionService,
        NbLayoutScrollService,
        NbLayoutRulerService,
        ...NbOverlayModule.forRoot().providers,
      ],
    };
  }
}
