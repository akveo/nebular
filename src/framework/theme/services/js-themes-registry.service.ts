/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Inject, Injectable } from '@angular/core';


import { NbJSThemeOptions } from './js-themes/theme.options';
import { DEFAULT_THEME } from './js-themes/default.theme';
import { COSMIC_THEME } from './js-themes/cosmic.theme';
import { CORPORATE_THEME } from './js-themes/corporate.theme';
import { DARK_THEME } from './js-themes/dark.theme';
import { NB_BUILT_IN_JS_THEMES, NB_JS_THEMES } from '../theme.options';

export const BUILT_IN_THEMES: NbJSThemeOptions[] = [
  DEFAULT_THEME,
  COSMIC_THEME,
  CORPORATE_THEME,
  DARK_THEME,
];

/**
 * Js Themes registry - provides access to the JS themes' variables.
 * Usually shouldn't be used directly, but through the NbThemeService class methods (getJsTheme).
 */
@Injectable()
export class NbJSThemesRegistry {

  private themes: any = {};

  constructor(@Inject(NB_BUILT_IN_JS_THEMES) builtInThemes: NbJSThemeOptions[],
              @Inject(NB_JS_THEMES) newThemes: NbJSThemeOptions[] = []) {

    const themes = this.combineByNames(newThemes, builtInThemes);

    themes.forEach((theme: any) => {
      this.register(theme, theme.name, theme.base);
    });
  }

  /**
   * Registers a new JS theme
   * @param config any
   * @param themeName string
   * @param baseTheme string
   */
  register(config: any, themeName: string, baseTheme: string) {
    const base = this.has(baseTheme) ? this.get(baseTheme) : {};
    this.themes[themeName] = this.mergeDeep({}, base, config);
  }

  /**
   * Checks whether the theme is registered
   * @param themeName
   * @returns boolean
   */
  has(themeName: string): boolean {
    return !!this.themes[themeName];
  }

  /**
   * Return a theme
   * @param themeName
   * @returns NbJSThemeOptions
   */
  get(themeName: string): NbJSThemeOptions {
    if (!this.themes[themeName]) {
      throw Error(`NbThemeConfig: no theme '${themeName}' found registered.`);
    }
    return JSON.parse(JSON.stringify(this.themes[themeName]));
  }

  private combineByNames(newThemes: NbJSThemeOptions[], oldThemes: NbJSThemeOptions[]): NbJSThemeOptions[] {
    if (newThemes) {
      const mergedThemes: NbJSThemeOptions[] = [];
      newThemes.forEach((theme: NbJSThemeOptions) => {
        const sameOld: NbJSThemeOptions = oldThemes.find((tm: NbJSThemeOptions) => tm.name === theme.name)
          || <NbJSThemeOptions>{};

        const mergedTheme = this.mergeDeep({}, sameOld, theme);
        mergedThemes.push(mergedTheme);
      });

      oldThemes.forEach((theme: NbJSThemeOptions) => {
        if (!mergedThemes.find((tm: NbJSThemeOptions) => tm.name === theme.name)) {
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
