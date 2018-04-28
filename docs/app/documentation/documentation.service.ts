/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Inject, Injectable } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

import { NgdTextService } from '../@theme/services';
import { DOCS, STRUCTURE } from '../app.module';

@Injectable()
export class NgdDocumentationService {

  constructor(private textService: NgdTextService,
              @Inject(STRUCTURE) private structure,
              @Inject(DOCS) private docs) {
  }

  getPreparedMenu(basePath: string): any {
    return this.prepareMenu(this.prepareStructure(this.structure, this.docs), {link: basePath});
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

      if (item.block === 'markdown') {
        item.children = this.textService.splitIntoSections(require(`raw-loader!../../articles/${item.source}`))
          .map((block) => {
            const html = this.textService.mdToHTML(block);
            const title = this.textService.extractTitle(block) || this.textService.extractFirstTwoWords(html);
            const fragment = this.textService.createSlag(title);
            return {
              source: block,
              title: title ? title : this.textService.extractFirstTwoWords(html),
              fragment: fragment,
              html: html,
            }
          });
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
          pathMatch: 'prefix',
          parent: parent,
          data: item,
        };
        menuItem.link = this.createItemLink(menuItem);

        // TODO: not a very good check
        if (item.children && item.children[0] && item.children[0].type === 'page') {
          menuItem.children = this.prepareMenu(item.children, menuItem);
        }

        if (item.type === 'page') {
          menuItem.data.toc = this.prepareToc(menuItem);
        }
        return menuItem;
      });
  }

  protected prepareToc(page: any) {
    return page.data.children.reduce((acc: any[], item: any) => {
      if (item.block === 'markdown') {
        return acc.concat(this.getTocForMd(item, page.link));
      }
      acc.push(item.source.name);
      return acc;
    }, []);
  }

  protected getTocForMd(block: any, baseLink: string) {
    return block.children.map((section: any) => (
      {
        title: section.title,
        link: section.link,
        fragment: section.fragment,
      }
    ));
  }

  protected createItemLink(item: any) {
    const url = this.textService.createSlag(item.title);
    return item.parent ? `${item.parent.link}/${url}` : url;
  }
}
