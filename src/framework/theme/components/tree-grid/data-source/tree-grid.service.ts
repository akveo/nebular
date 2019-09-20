/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */


import { Injectable } from '@angular/core';

import { NbTreeGridPresentationNode } from './tree-grid.model';

export interface NbToggleOptions {
  deep?: boolean;
}

@Injectable()
export class NbTreeGridService<T> {
  expand(data: NbTreeGridPresentationNode<T>[], row: T, options: NbToggleOptions = {}) {
    const node: NbTreeGridPresentationNode<T> = this.find(data, row);
    node.expanded = true;

    if (options.deep && node.hasChildren()) {
      node.children.forEach((n: NbTreeGridPresentationNode<T>) => this.expand(data, n.data, options));
    }
  }

  collapse(data: NbTreeGridPresentationNode<T>[], row: T, options: NbToggleOptions = {}) {
    const node: NbTreeGridPresentationNode<T> = this.find(data, row);
    node.expanded = false;

    if (options.deep && node.hasChildren()) {
      node.children.forEach((n: NbTreeGridPresentationNode<T>) => this.collapse(data, n.data, options));
    }
  }

  toggle(data: NbTreeGridPresentationNode<T>[], row: T, options: NbToggleOptions = {}) {
    const node: NbTreeGridPresentationNode<T> = this.find(data, row);
    if (node.expanded) {
      this.collapse(data, row, options);
    } else {
      this.expand(data, row, options);
    }
  }

  private find(data: NbTreeGridPresentationNode<T>[], row: T): NbTreeGridPresentationNode<T> {
    const toCheck: NbTreeGridPresentationNode<T>[] = [...data];

    for (const node of toCheck) {
      if (node.data === row) {
        return node;
      }

      if (node.hasChildren()) {
        toCheck.push(...node.children);
      }
    }
  }
}
