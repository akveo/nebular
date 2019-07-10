/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { TestBed, inject, async } from '@angular/core/testing';

import { DEFAULT_MEDIA_BREAKPOINTS, NbMediaBreakpointsService } from './breakpoints.service';
import { NbThemeService } from './theme.service';
import { BUILT_IN_THEMES, NbJSThemesRegistry } from './js-themes-registry.service';
import {
  NB_BUILT_IN_JS_THEMES, NB_JS_THEMES, NB_MEDIA_BREAKPOINTS,
  NB_THEME_OPTIONS,
} from '../theme.options';

describe('theme-service', () => {
  let breakpointService: NbMediaBreakpointsService;
  let themeService: NbThemeService;

  beforeEach(() => {
    // Configure testbed to prepare services
    TestBed.configureTestingModule({
      providers: [
        { provide: NB_MEDIA_BREAKPOINTS, useValue: DEFAULT_MEDIA_BREAKPOINTS },
        NbMediaBreakpointsService,
        { provide: NB_JS_THEMES, useValue: [] },
        { provide: NB_BUILT_IN_JS_THEMES, useValue: BUILT_IN_THEMES },
        NbJSThemesRegistry,
        { provide: NB_THEME_OPTIONS, useValue: { name: 'default' } },
        NbThemeService,
      ],
    });
  });

// Single async inject to save references; which are used in all tests below
  beforeEach(async(inject(
    [NbMediaBreakpointsService, NbThemeService],
    (_breakpointService, _themeService) => {
      breakpointService = _breakpointService;
      themeService = _themeService;
    },
  )));

  it('returns default theme specified in options', () => {
    let current: any;

    const subscription = themeService.onThemeChange()
      .subscribe((change: any) => {
        current = change;
      });
    try {
      expect(current.name).toEqual('default');
      expect(current.previous).toBeUndefined();
    } finally {
      subscription.unsubscribe();
    }
  });

  it('listens to theme change, saving a previous one', () => {
    let current: any;

    const subscription = themeService.onThemeChange()
      .subscribe((change: any) => {
        current = change;
      });
    try {
      expect(current.name).toEqual('default');
      expect(current.previous).toBeUndefined();

      themeService.changeTheme('cosmic');
      expect(current.name).toEqual('cosmic');
      expect(current.previous).toEqual('default');

      themeService.changeTheme('foobar');
      expect(current.name).toEqual('foobar');
      expect(current.previous).toEqual('cosmic');
    } finally {
      subscription.unsubscribe();
    }
  });

  it('listens to window media query change', () => {
    let current: any;

    const subscription = themeService.onMediaQueryChange()
      .subscribe((change: any) => {
        current = change;
      });
    try {
      expect(current).toBeUndefined();

      themeService.changeWindowWidth(1920);
      expect(current[0].name).toEqual(breakpointService.getByWidth(undefined).name);

      const xs = 200;
      themeService.changeWindowWidth(xs);
      expect(current[1].name).toEqual(breakpointService.getByWidth(xs).name);

      const sm = 576;
      themeService.changeWindowWidth(sm);
      expect(current[0].name).toEqual(breakpointService.getByWidth(xs).name);
      expect(current[1].name).toEqual(breakpointService.getByWidth(sm).name);
    } finally {
      subscription.unsubscribe();
    }
  });

  it('listens to theme variables change', () => {
    let current: any;

    const subscription = themeService.getJsTheme()
      .subscribe((change: any) => {
        current = change.variables;
      });
    try {
      // TODO could be rewrite with usage of done()
      expect(current).not.toBeUndefined();
      expect(current.fontMain).toEqual('Open Sans, sans-serif');
      expect(current.bg).toEqual('#ffffff');

      themeService.changeTheme('cosmic');
      expect(current.bg).toEqual('#323259');

      themeService.changeTheme('corporate');
      expect(current.bg).toEqual('#ffffff');

    } finally {
      subscription.unsubscribe();
    }
  });

});
