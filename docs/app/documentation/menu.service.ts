/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

import { NgdStructureService, NgdTextService } from '../@theme/services';

@Injectable()
export class NgdMenuService {

  constructor(private structureService: NgdStructureService,
              private textService: NgdTextService) {
  }

  getPreparedMenu(basePath: string): any {
    return this.prepareMenu(this.structureService.getPreparedStructure(), { link: basePath });
  }

  prepareMenu(structure, parent = null) {
    return structure
      .filter(item => item.name && item.type !== 'block')
      .map((item: any) => {
        const menuItem: NbMenuItem = {
          title: item.name,
          pathMatch: 'prefix',
          parent: parent,
          data: item,
        };
        menuItem.link = this.createItemLink(menuItem);

        if (item.children && item.children.some(child => child.type === 'page' || child.type === 'tabs')) {
          menuItem.children = this.prepareMenu(item.children, menuItem);
        }

        return menuItem;
      });
  }

  protected prepareToc(item: any) {
    return item.children.reduce((acc: any[], child: any) => {
      if (child.block === 'markdown') {
        return acc.concat(this.getTocForMd(child));
      } else if (child.block === 'tabbed') {
        return acc.concat(this.getTocForTabbed(child));
      }
      acc.push(child.source.name);
      return acc;
    }, []);
  }

  protected getTocForMd(block: any) {
    return block.children.map((section: any) => ({
      title: section.title,
      fragment: section.fragment,
    }));
  }

  protected getTocForTabbed(block: any) {
    return block.children.map((component: any) => (
      {
        title: component.name,
        fragment: this.textService.createSlag(component.name),
      }
    ));
  }

  protected createItemLink(item: any) {
    const url = this.textService.createSlag(item.title);
    return item.parent ? `${item.parent.link}/${url}` : url;
  }
}
