/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

import { STRUCTURE } from '../../structure';
const PARSED_DOCS: any = require('../../output.json');

@Injectable()
export class NgdDocumentationService {

  getStructure(): any {
    return STRUCTURE;
  }

  getParsedDocs(): any {
    return PARSED_DOCS;
  }

  getPreparedMenu(basePath: string): any {
    return this.prepareMenu(this.getStructure(), { link: basePath });
  }

  protected prepareStructure(structure: any, preparedDocs: any): any {
    return structure.map((item: any) => {
      if (item.type === 'block' && typeof item.source === 'string') {
        if (item.block === 'theme') {
          item.source = preparedDocs.themes[item.source];
        }

        if (item.block === 'component') {
          item.source = preparedDocs.classes.find((data) => data.name === item.source);
        }
      }

      if (item.block === 'tabbed' && typeof item.source === 'object' && item.source.length > 0) {
        item.source = item.source.map(source => preparedDocs.classes.find((data) => data.name === source));
      }

      if (item.children) {
        item.children = this.prepareStructure(item.children, preparedDocs);
      }

      return item;
    });
  }

  prepareMenu(structure, parent = null) {
    return structure
      .filter(item => item.name && item.type !== 'block')
      .map((item: any) => {
        const menuItem: NbMenuItem = {
          title: item.name,
          link: this.createItemLink(item),
          pathMatch: 'prefix',
          parent,
          data: item,
        };

        // TODO: not very good check
        if (item.children && item.children[0] && item.children[0].type === 'page') {
          menuItem.children = this.prepareMenu(item.children, item);
        }

        return menuItem;
      });
  }

  protected createItemLink(item: any) {
    const url = item.name.replace(/[^a-zA-Z0-9\s]+/g, '').replace(/\s/g, '-').toLowerCase();
    return item.parent ? `${item.parent.link}/${url}` : url;
  }
}
