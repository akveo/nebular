/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Inject, Injectable } from '@angular/core';

import 'rxjs/add/operator/publish';

import { nbBuiltInJSThemesToken, nbJSThemesToken } from '../theme.options';

/**
 * Js Theme - theme variables accessible from angular components/services
 */
export interface NbJSTheme {
  name: string;
  base?: string;
  variables?: NbJSThemeVariable;
}

export interface NbJSThemeVariable {
  [key: string]: string | string[] | NbJSThemeVariable;
}

export const BUILT_IN_THEMES: NbJSTheme[] = [
  {
    name: 'default',
    variables: {
      fontMain: 'Open Sans',
      fontSecondary: 'Exo',

      colorBg: '#ffffff',
      colorFg: '#b2bac2',
      colorFgHeading: '#222222',
      layoutBg: '#ebeff5',
      separator: '#dddddd',

      colorGray: 'rgba(81, 113, 165, 0.15)',

      colorPrimary: '#8a7fff',
      colorSuccess: '#40dc7e',
      colorInfo: '#4ca6ff',
      colorWarning: '#ffa100',
      colorDanger: '#ff4c6a',
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
      colorWarning: '#ffa100',
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
export class NbJSThemesRegistry {

  private themes: any = {};

  constructor(@Inject(nbBuiltInJSThemesToken) private builtInThemes: NbJSTheme[],
              @Inject(nbJSThemesToken) private newThemes: NbJSTheme[] = []) {

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

  get(themeName: string): NbJSTheme {
    if (!this.themes[themeName]) {
      throw Error(`NbThemeConfig: no theme '${themeName}' found registered.`);
    }
    return JSON.parse(JSON.stringify(this.themes[themeName]));
  }

  private combineByNames(newThemes: NbJSTheme[], oldThemes: NbJSTheme[]): NbJSTheme[] {
    if (newThemes) {
      const mergedThemes: NbJSTheme[] = [];
      newThemes.forEach((theme: NbJSTheme) => {
        const sameOld: NbJSTheme = oldThemes.find((tm: NbJSTheme) => tm.name === theme.name) || <NbJSTheme>{};

        const mergedTheme = this.mergeDeep({}, sameOld, theme);
        mergedThemes.push(mergedTheme);
      });

      oldThemes.forEach((theme: NbJSTheme) => {
        if (!mergedThemes.find((tm: NbJSTheme) => tm.name === theme.name)) {
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
