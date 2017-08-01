/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Inject, Injectable } from '@angular/core';

import 'rxjs/add/operator/publish';

import { ngaBuiltInJSThemesToken, ngaJSThemesToken } from '../theme.options';

/**
 * Js Theme - theme variables accessible from angular components/services
 */
export interface NgaJSTheme {
  name: string;
  base?: string;
  variables?: NgaJSThemeVariable;
}

export interface NgaJSThemeVariable {
  [key: string]: string | string[] | NgaJSThemeVariable;
}

export const BUILT_IN_THEMES: NgaJSTheme[] = [
  {
    name: 'default',
    variables: {
      fontMain: 'Open Sans',
      fontSecondary: 'Exo',

      // TODO: fill in the colors
      colorBg: '#3d3780',
      colorFg: '#a1a1e5',
      colorFgHeading: '#3d3780',
      layoutBg: '#a1a1e5',
      separator: '#342e73',

      colorGray: 'rgba(81, 113, 165, 0.15)',

      colorPrimary: '#7659ff',
      colorSuccess: '#00d977',
      colorInfo: '#0088ff',
      colorWarning: '#eae95f',
      colorDanger: '#ff386a',
    },
  },
  {
    name: 'cosmic',
    base: 'default',
    variables: {
      colorBg: '#3d3780',
      colorFg: '#a1a1e5',
      colorFgHeading: '#ffffff',
      layoutBg: '#2c2961',
      separator: '#342e73',

      colorGray: 'rgba(81, 113, 165, 0.15)',

      colorPrimary: '#7659ff',
      colorSuccess: '#00d977',
      colorInfo: '#0088ff',
      colorWarning: '#eae95f',
      colorDanger: '#ff386a',
    },
  },
  {
    name: 'light',
    base: 'default',
    variables: {
      colorBg: 'white',
      colorFg: '#2f3234',
    },
  },
];

/**
 * Js Themes registry - provides access to the JS themes' variables.
 */
@Injectable()
export class NgaJSThemesRegistry {

  private themes: any = {};

  constructor(@Inject(ngaBuiltInJSThemesToken) private builtInThemes: NgaJSTheme[],
              @Inject(ngaJSThemesToken) private newThemes: NgaJSTheme[] = []) {

    const themes = this.combineByNames(newThemes, builtInThemes);

    themes.forEach((theme: any) => {
      this.register(theme, theme.name, theme.base);
    });
  }

  register(config: any, themeName: string, baseTheme: string) {
    const base = this.has(baseTheme) ? this.get(baseTheme) : {};
    this.themes[themeName] = this.mergeDeep({}, base, config);
  }

  has(themeName: string): boolean {
    return !!this.themes[themeName];
  }

  get(themeName: string): NgaJSTheme {
    if (!this.themes[themeName]) {
      throw Error(`NgaThemeConfig: no theme '${themeName}' found registered.`);
    }
    return JSON.parse(JSON.stringify(this.themes[themeName]));
  }

  private combineByNames(newThemes: NgaJSTheme[], oldThemes: NgaJSTheme[]): NgaJSTheme[] {
    if (newThemes) {
      const mergedThemes: NgaJSTheme[] = [];
      newThemes.forEach((theme: NgaJSTheme) => {
        const sameOld: NgaJSTheme = oldThemes.find((tm: NgaJSTheme) => tm.name === theme.name) || <NgaJSTheme>{};

        const mergedTheme = this.mergeDeep({}, sameOld, theme);
        mergedThemes.push(mergedTheme);
      });

      oldThemes.forEach((theme: NgaJSTheme) => {
        if (!mergedThemes.find((tm: NgaJSTheme) => tm.name === theme.name)) {
          mergedThemes.push(theme);
        }
      });
      return mergedThemes;
    }
    return oldThemes;
  }


  private isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
  }

  // TODO: move to helpers
  private mergeDeep(target, ...sources) {
    if (!sources.length) {
      return target;
    }
    const source = sources.shift();

    if (this.isObject(target) && this.isObject(source)) {
      for (const key in source) {
        if (this.isObject(source[key])) {
          if (!target[key]) {
            Object.assign(target, { [key]: {} });
          }
          this.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }
    return this.mergeDeep(target, ...sources);
  }
}
