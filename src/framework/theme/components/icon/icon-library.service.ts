/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';

export type NbIcon = NbIconDefinition | string;

export class NbIconDefinition {
  icon: string;
  pack?: string;
}

export type NbIcons = Map<string, string>;

export enum NbIconPackType  {
  SVG = 'svg',
  FONT = 'font',
}

export interface NbIconPack {
  name: string;
  type: NbIconPackType;
  icons?: NbIcons;
  classPrefix?: string;
}

function throwPackNotFoundError(name: string) {
  throw Error(`Pack '${name}' is not registered`);
}

function throwIconNotFoundError(name: string, pack: string) {
  throw Error(`Icon '${name}' is not registered in pack '${pack}'`);
}

/**
 * NbIconLibraryService
 */
@Injectable()
export class NbIconLibraryService {

  protected packs: Map<string, NbIconPack> = new Map();
  protected defaultPack: NbIconPack;

  registerSvgPack(name: string, icons: NbIcons) {
    this.packs.set(name, {
      name,
      icons,
      type: NbIconPackType.SVG,
    });
  }

  registerFontPack(name: string, classPrefix: string) {
    this.packs.set(name, {
      name,
      classPrefix,
      type: NbIconPackType.FONT,
    });
  }

  setDefaultPack(name: string) {
    if (!this.packs.has(name)) {
      throwPackNotFoundError(name);
    }

    this.defaultPack = this.packs.get(name);
  }


  /**
   * TODO: animations? fill? etc
   * @param name
   * @param pack
   */
  getSvgIcon(name: string, pack?: string) {

    const iconsPack = this.getPackOrDefault(pack);

    if (iconsPack.type !== NbIconPackType.SVG) {
      throw Error(`Pack '${iconsPack.name}' is not an SVG Pack and its type is '${iconsPack.type}'`);
    }

    return this.getIconFromPack(name, iconsPack);
  }

  getFontIcon(name: string, pack?: string) {
    const iconsPack = this.getPackOrDefault(pack);

    if (iconsPack.type !== NbIconPackType.FONT) {
      throw Error(`Pack '${iconsPack.name}' is not a Font Pack and its type is '${iconsPack.type}'`);
    }

    return this.getIconFromPack(name, iconsPack);
  }


  getIcon(name: string, pack?: string) {

    const iconsPack = this.getPackOrDefault(pack);

    if (iconsPack.type === NbIconPackType.SVG) {
      return this.getSvgIcon(name, pack);
    }

    return this.getFontIcon(name, pack);
  }

  protected getPackOrDefault(name: string) {
    const iconsPack = name ? this.packs.get(name) : this.defaultPack;

    if (!iconsPack) {
      throwPackNotFoundError(name);
    }
    return iconsPack;
  }

  protected getIconFromPack(name: string, pack: NbIconPack) {
    if (!pack.icons.has(name)) {
      throwIconNotFoundError(name, pack.name);
    }

    return pack.icons.get(name);
  }
}
