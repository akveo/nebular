/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { STRUCTURE } from '../../structure';

const PARSEDDOCS: any = require('../../output.json');

@Injectable()
export class DocsService {

  private fragments$ = new Subject();

  getStructure(): any {
    return STRUCTURE;
  }

  getPreparedMenu(prependMenu?: any): any {
    return this.prepareMenu(this.getStructure(), '/docs', prependMenu);
  }

  getParsedDocs(): any {
    return PARSEDDOCS;
  }

  getPreparedStructure(): any {
    return this.prepareStructure(this.getStructure(), this.getParsedDocs());
  }

  emitFragment(fragment: string): void {
    this.fragments$.next(fragment);
  }

  onFragmentClick(): Observable<string> {
    return this.fragments$.share();
  }

  mapThemedValues(classStyles: any): any {
    return classStyles.map(item => {
      item.styles.map(prop => {
        prop.themedValues = [];
        for (const themeName in PARSEDDOCS.themes) {
          if (PARSEDDOCS.themes.hasOwnProperty(themeName)) {
            prop.themedValues.push({
              theme: PARSEDDOCS.themes[themeName].name,
              value: PARSEDDOCS.themes[themeName].data[prop.name].value,
            });
          }
        }
        return prop;
      });
      return item;
    })
  }

  protected prepareStructure(structure: any , preparedDocs: any): any {
    structure.map((item: any) => {
      if (item.type === 'block' && typeof item.blockData === 'string') {
        if (item.block === 'theme') {
          item.blockData = preparedDocs.themes[item.blockData];
        } else {
          item.blockData = preparedDocs.classes.find((data) => data.name === item.blockData );
        }
      }
      if (item.children) {
        item.children = this.prepareStructure(item.children, preparedDocs);
      }
    });
    return structure;
  }

  protected prepareMenu(structure, parentLink?: string, prependMenu?: any, parentItem?: any): any {

    let menuItems = structure.map((item: any) => {
      if (item.name) {
        const menuItem: any = {};
        const name = item.name.replace(/[^a-zA-Z0-9\s]+/g, '').replace(/\s/g, '-').toLowerCase();
        const itemLink = item.type === 'block' ? parentLink : `${parentLink ? parentLink : ''}/${name}`;

        if (item.type !== 'section' || !item.isSubpages) {
          menuItem['link'] = itemLink;
        }
        (item.type === 'block') ? menuItem['data'] = parentItem : menuItem['data'] = item;
        if (item.type === 'block') {
          menuItem['fragment'] = item.name;
        }
        menuItem['pathMatch'] = 'prefix';
        menuItem['title'] = item.name;

        if (item.children && item.children[0] && item.children[0].type === 'page') {
          menuItem['children'] = this.prepareMenu(item.children, itemLink);
        }
        if (item.children && item.type === 'page' && item.isSubpages) {
          menuItem['children'] = this.prepareMenu(item.children, itemLink, null, item);
        }
        return menuItem;
      }
    });

    if (prependMenu) {
      menuItems = prependMenu.concat(menuItems);
    }

    return menuItems;
  }
}
