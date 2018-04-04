/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

import {
  nbBuiltInJSThemesToken,
  nbMediaBreakpointsToken,
  NbThemeOptions,
  nbThemeOptionsToken,
  nbJSThemesToken,
  NbDocument,
  NbWindow,
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
import { NbDirectionService, NbDirection, NB_LAYOUT_DIRECTION } from './services/direction.service';

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
   *
   * @returns {ModuleWithProviders}
   */
  static forRoot(nbThemeOptions: NbThemeOptions,
                 nbJSThemes?: NbJSThemeOptions[],
                 nbMediaBreakpoints?: NbMediaBreakpoint[],
                 layoutDirection?: NbDirection): ModuleWithProviders {

    return <ModuleWithProviders> {
      ngModule: NbThemeModule,
      providers: [
        { provide: nbThemeOptionsToken, useValue: nbThemeOptions || {} },
        { provide: nbBuiltInJSThemesToken, useValue: BUILT_IN_THEMES },
        { provide: nbJSThemesToken, useValue: nbJSThemes || [] },
        { provide: nbMediaBreakpointsToken, useValue: nbMediaBreakpoints || DEFAULT_MEDIA_BREAKPOINTS },
        { provide: NbWindow, useFactory: nbWindowFactory },
        { provide: NbDocument, useExisting: DOCUMENT },
        NbJSThemesRegistry,
        NbThemeService,
        NbMediaBreakpointsService,
        NbSpinnerService,
        { provide: NB_LAYOUT_DIRECTION, useValue: layoutDirection || 'ltr' },
        {
          provide: NbDirectionService,
          useClass: NbDirectionService,
          deps: [ NbDocument, NB_LAYOUT_DIRECTION ],
        },
      ],
    };
  }
}
