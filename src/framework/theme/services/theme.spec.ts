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
  nbBuiltInJSThemesToken, nbJSThemesToken, nbMediaBreakpointsToken,
  nbThemeOptionsToken,
} from '../theme.options';

describe('theme-service', () => {
  let breakpointService: NbMediaBreakpointsService;
  let themeService: NbThemeService;

  beforeEach(() => {
    // Configure testbed to prepare services
    TestBed.configureTestingModule({
      providers: [
        { provide: nbMediaBreakpointsToken, useValue: DEFAULT_MEDIA_BREAKPOINTS },
        NbMediaBreakpointsService,
        { provide: nbJSThemesToken, useValue: [] },
        { provide: nbBuiltInJSThemesToken, useValue: BUILT_IN_THEMES },
        NbJSThemesRegistry,
        { provide: nbThemeOptionsToken, useValue: { name: 'default' } },
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

  it('returns default theme specified in config', () => {
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
      expect(current).not.toBeUndefined();
      expect(current.fontMain).toEqual('"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif');
      expect(current.bg).toEqual('#ffffff');

      themeService.changeTheme('cosmic');

      expect(current.bg).toEqual('#3d3780');

    } finally {
      subscription.unsubscribe();
    }
  });

});
