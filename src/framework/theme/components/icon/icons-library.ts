/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';
import { NbIconPack, NbIconPackParams, NbIconPackType, NbIcons } from './icon-pack';
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
  throw Error(`Icon '${name}' is not registered in pack '${pack}'`);
}

/**
 * NbIconsLibrary
 */
@Injectable({providedIn: 'root'})
export class NbIconsLibrary {

  protected packs: Map<string, NbIconPack> = new Map();
  protected defaultPack: NbIconPack;

  registerSvgPack(name: string, icons: NbIcons, params: NbIconPackParams = { packClass: '' }) {
    this.packs.set(name, {
      name,
      icons: new Map(Object.entries(icons)),
      params,
      type: NbIconPackType.SVG,
    });
  }

  registerFontPack(name: string, params: NbIconPackParams = { packClass: '' }) {
    this.packs.set(name, {
      name,
      params,
      icons: new Map(),
      type: NbIconPackType.FONT,
    });
  }

  setDefaultPack(name: string) {
    if (!this.packs.has(name)) {
      throwPackNotFoundError(name);
    }

    this.defaultPack = this.packs.get(name);
  }

  getSvgIcon(name: string, pack?: string): NbIconDefinition {

    const iconsPack = this.getPackOrDefault(pack);

    if (iconsPack.type !== NbIconPackType.SVG) {
      throw Error(`Pack '${iconsPack.name}' is not an SVG Pack and its type is '${iconsPack.type}'`);
    }

    const icon = this.getIconFromPack(name, iconsPack);

    return {
      name,
      pack: iconsPack.name,
      type: NbIconPackType.SVG,
      icon: this.createSvgIcon(name, icon, iconsPack.params),
    };
  }

  getFontIcon(name: string, pack?: string): NbIconDefinition {
    const iconsPack = this.getPackOrDefault(pack);

    if (iconsPack.type !== NbIconPackType.FONT) {
      throw Error(`Pack '${iconsPack.name}' is not a Font Pack and its type is '${iconsPack.type}'`);
    }

    const icon = this.getIconFromPack(name, iconsPack, false);

    return {
      name,
      pack: iconsPack.name,
      type: NbIconPackType.FONT,
      icon: this.createFontIcon(name, icon ? icon : '', iconsPack.params),
    };
  }

  getIcon(name: string, pack?: string) {

    const iconsPack = this.getPackOrDefault(pack);

    if (iconsPack.type === NbIconPackType.SVG) {
      return this.getSvgIcon(name, pack);
    }

    return this.getFontIcon(name, pack);
  }

  protected createSvgIcon(name: string, content: NbIcon | string, params: NbIconPackParams) {
    return content instanceof NbSvgIcon ? content : new NbSvgIcon(name, content, params);
  }

  protected createFontIcon(name: string, content: NbIcon | string, params: NbIconPackParams) {
    return content instanceof NbFontIcon ? content : new NbFontIcon(name, content, params);
  }

  protected getPackOrDefault(name: string) {
    const iconsPack = name ? this.packs.get(name) : this.defaultPack;

    if (!iconsPack) {

      if (!this.defaultPack) {
        throwNoDefaultPackError();
      } else {
        throwPackNotFoundError(name);
      }
    }
    return iconsPack;
  }

  protected getIconFromPack(name: string, pack: NbIconPack, shouldThrow = true) {
    if (shouldThrow && !pack.icons.has(name)) {
      throwIconNotFoundError(name, pack.name);
    }

    return pack.icons.get(name);
  }
}
