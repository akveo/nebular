/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { TestBed, inject, async } from '@angular/core/testing';

import { NbJSThemeOptions } from './js-themes/theme.options';
import { BUILT_IN_THEMES, NbJSThemesRegistry } from './js-themes-registry.service';
import { NB_BUILT_IN_JS_THEMES, NB_JS_THEMES } from '../theme.options';

describe('js-themes-registry-service', () => {
  let jsThemesRegistry: NbJSThemesRegistry;
  const customThemes: NbJSThemeOptions[] = [
    {
      name: 'default',
      base: 'default',
      variables: {
        someNewValue: 'black',
        colorBg: 'yellow',
      },
    },
    {
      name: 'cosmic',
      base: 'default',
      variables: {
        someNewValueForCosmic: 'red',
      },
    },
    {
      name: 'corporate',
      base: 'default',
      variables: {
        someNewValueForCorporate: 'green',
      },
    },
    {
      name: 'super-new-theme',
      variables: {
        someNewValueForCosmic: 'blue',
      },
    },
  ];
  beforeEach(() => {
    // Configure testbed to prepare services
    TestBed.configureTestingModule({
      providers: [
        { provide: NB_JS_THEMES, useValue: customThemes },
        { provide: NB_BUILT_IN_JS_THEMES, useValue: BUILT_IN_THEMES },
        NbJSThemesRegistry,
      ],
    });
  });

// Single async inject to save references; which are used in all tests below
  beforeEach(async(inject(
    [NbJSThemesRegistry],
    (_jsThemesRegistry) => {
      jsThemesRegistry = _jsThemesRegistry;
    },
  )));

  it('has built in themes', () => {
    expect(jsThemesRegistry.get('default')).not.toBeUndefined();
    expect(jsThemesRegistry.get('cosmic')).not.toBeUndefined();
    expect(jsThemesRegistry.get('corporate')).not.toBeUndefined();

    expect(jsThemesRegistry.has('default')).toBeTruthy();
    expect(jsThemesRegistry.has('cosmic')).toBeTruthy();
    expect(jsThemesRegistry.has('corporate')).toBeTruthy();
  });

  it('has built in themes with inherited font', () => {
    expect(jsThemesRegistry.get('default').variables.fontMain)
      .toEqual('Open Sans, sans-serif');
    expect(jsThemesRegistry.get('cosmic').variables.fontMain)
      .toEqual('Open Sans, sans-serif');
    expect(jsThemesRegistry.get('corporate').variables.fontMain)
      .toEqual('Open Sans, sans-serif');
  });

  it('has also new themes', () => {
    expect(jsThemesRegistry.get('super-new-theme')).not.toBeUndefined();
    expect(jsThemesRegistry.has('super-new-theme')).toBeTruthy();
    expect(jsThemesRegistry.get('super-new-theme').variables.someNewValueForCosmic).toEqual('blue');
  });

  it('has changes from custom settings', () => {
    expect(jsThemesRegistry.get('default').variables.colorBg).toEqual('yellow');
  });

  it('has new values from custom settings', () => {
    expect(jsThemesRegistry.get('cosmic').variables.someNewValueForCosmic).toEqual('red');
    expect(jsThemesRegistry.get('default').variables.someNewValue).toEqual('black');
    expect(jsThemesRegistry.get('corporate').variables.someNewValueForCorporate).toEqual('green');
  });
});
