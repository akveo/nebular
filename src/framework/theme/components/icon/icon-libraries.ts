/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';
import { NbFontIconPackParams, NbIconPack, NbIconPackParams, NbIconPackType, NbIcons } from './icon-pack';
import { NbFontIcon, NbIcon, NbSvgIcon } from './icon';

export class NbIconDefinition {
  name: string;
  type: string;
  pack: string;
  icon: NbIcon;
}

function throwPackNotFoundError(name: string) {
  throw Error(`Icon Pack '${name}' is not registered`);
}

function throwNoDefaultPackError() {
  throw Error('Default pack is not registered.');
}

function throwIconNotFoundError(name: string, pack: string) {
  throw Error(`Icon '${name}' is not registered in pack '${pack}'. Check icon name or consider switching icon pack.`);
}

function throwWrongPackTypeError(name: string, type: string, desiredType: string) {
  throw Error(`Pack '${name}' is not an '${desiredType}' Pack and its type is '${type}'`);
}

/**
 * This service allows to register multiple icon packs to use them later within `<nb-icon></nb-icon>` component.
 */
@Injectable({providedIn: 'root'})
export class NbIconLibraries {

  protected packs: Map<string, NbIconPack> = new Map();
  protected defaultPack: NbIconPack;

  /**
   * Registers new Svg icon pack
   * @param {string} name
   * @param {NbIcon} icons
   * @param {NbIconPackParams} params
   */
  registerSvgPack(name: string, icons: NbIcons, params: NbIconPackParams= {}) {
    this.packs.set(name, {
      name,
      icons: new Map(Object.entries(icons)),
      params,
      type: NbIconPackType.SVG,
    });
  }

  /**
   * Registers new font pack
   * @param {string} name
   * @param {NbIconPackParams} params
   */
  registerFontPack(name: string, params: NbFontIconPackParams = {}) {
    this.packs.set(name, {
      name,
      params,
      icons: new Map(),
      type: NbIconPackType.FONT,
    });
  }

  /**
   * Returns pack by name
   * @param {string} name
   */
  getPack(name: string): NbIconPack {
    return this.packs.get(name);
  }

  /**
   * Sets pack as a default
   * @param {string} name
   */
  setDefaultPack(name: string) {
    if (!this.packs.has(name)) {
      throwPackNotFoundError(name);
    }

    this.defaultPack = this.packs.get(name);
  }

  /**
   * Returns Svg icon
   * @param {string} name
   * @param {string} pack
   *
   * @returns NbIconDefinition
   */
  getSvgIcon(name: string, pack?: string): NbIconDefinition {
    const iconsPack = pack ? this.getPackOrThrow(pack) : this.getDefaultPackOrThrow();

    if (iconsPack.type !== NbIconPackType.SVG) {
      throwWrongPackTypeError(iconsPack.name, iconsPack.type, 'SVG');
    }

    const icon = this.getIconFromPack(name, iconsPack);

    return {
      name,
      pack: iconsPack.name,
      type: NbIconPackType.SVG,
      icon: this.createSvgIcon(name, icon, iconsPack.params),
    };
  }

  /**
   * Returns Font icon
   * @param {string} name
   * @param {string} pack
   *
   * @returns NbIconDefinition
   */
  getFontIcon(name: string, pack?: string): NbIconDefinition {
    const iconsPack = pack ? this.getPackOrThrow(pack) : this.getDefaultPackOrThrow();

    if (iconsPack.type !== NbIconPackType.FONT) {
      throwWrongPackTypeError(iconsPack.name, iconsPack.type, 'Font');
    }

    const icon = this.getIconFromPack(name, iconsPack, false);

    return {
      name,
      pack: iconsPack.name,
      type: NbIconPackType.FONT,
      icon: this.createFontIcon(name, icon ? icon : '', iconsPack.params),
    };
  }

  /**
   * Returns an icon
   * @param {string} name
   * @param {string} pack
   *
   * @returns NbIconDefinition
   */
  getIcon(name: string, pack?: string): NbIconDefinition {
    const iconsPack = pack ? this.getPackOrThrow(pack) : this.getDefaultPackOrThrow();

    if (iconsPack.type === NbIconPackType.SVG) {
      return this.getSvgIcon(name, pack);
    }

    return this.getFontIcon(name, pack);
  }

  protected createSvgIcon(name: string, content: NbIcon | string, params: NbIconPackParams): NbSvgIcon {
    return content instanceof NbSvgIcon ? content : new NbSvgIcon(name, content, params);
  }

  protected createFontIcon(name: string, content: NbIcon | string, params: NbFontIconPackParams): NbFontIcon {
    return content instanceof NbFontIcon ? content : new NbFontIcon(name, content, params);
  }

  protected getPackOrThrow(name: string): NbIconPack {

    const pack: NbIconPack = this.packs.get(name);
    if (!pack) {
      throwPackNotFoundError(name);
    }
    return pack;
  }

  protected getDefaultPackOrThrow(): NbIconPack {

    if (!this.defaultPack) {
      throwNoDefaultPackError();
    }
    return this.defaultPack;
  }

  protected getIconFromPack(name: string, pack: NbIconPack, shouldThrow = true): NbIcon | string {
    if (shouldThrow && !pack.icons.has(name)) {
      throwIconNotFoundError(name, pack.name);
    }

    return pack.icons.get(name);
  }
}
