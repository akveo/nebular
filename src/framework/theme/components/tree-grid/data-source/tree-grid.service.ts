/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */


import { Injectable } from '@angular/core';

import { NbTreeGridPresentationNode } from './tree-grid-data-source';

@Injectable()
export class NbTreeGridService<T> {
  expand(data: NbTreeGridPresentationNode<T>[], row: T) {
    const node: NbTreeGridPresentationNode<T> = this.find(data, row);
    node.expanded = true;
  }

  collapse(data: NbTreeGridPresentationNode<T>[], row: T) {
    const node: NbTreeGridPresentationNode<T> = this.find(data, row);
    node.expanded = false;
  }

  toggle(data: NbTreeGridPresentationNode<T>[], row: T) {
    const node: NbTreeGridPresentationNode<T> = this.find(data, row);
    node.expanded = !node.expanded;
  }

  private find(data: NbTreeGridPresentationNode<T>[], row: T): NbTreeGridPresentationNode<T> {
    const toCheck: NbTreeGridPresentationNode<T>[] = [...data];

    for (const node of toCheck) {
      if (node.node.data === row) {
        return node;
      }

      toCheck.push(...node.children);
    }
  }
}
