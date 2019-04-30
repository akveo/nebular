/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */


import { Injectable } from '@angular/core';

import { NbTreeGridPresentationNode } from './tree-grid.model';

/**
 * Service used to filter tree grid data. Searched searchString in all object values.
 * If you need custom filter, you can extend this service and override filterPredicate or whole filter method.
 */
@Injectable()
export class NbTreeGridFilterService<T> {
  filter(query: string, data: NbTreeGridPresentationNode<T>[]): NbTreeGridPresentationNode<T>[] {
    if (!query) {
      return data;
    }

    return data.reduce((filtered: NbTreeGridPresentationNode<T>[], node: NbTreeGridPresentationNode<T>) => {
      let filteredChildren: NbTreeGridPresentationNode<T>[];

      if (node.children) {
        filteredChildren = this.filter(query, node.children);
        node.children = filteredChildren;
      }

      node.expanded = false;

      if (filteredChildren && filteredChildren.length) {
        node.expanded = true;
        filtered.push(node);
      } else if (this.filterPredicate(node.data, query)) {
        filtered.push(node);
      }

      return filtered;
    }, []);
  }

  protected filterPredicate(data: T, searchQuery: string): boolean {
    const preparedQuery = searchQuery.trim().toLocaleLowerCase();
    for (const val of Object.values(data)) {
      const preparedVal = `${val}`.trim().toLocaleLowerCase();
      if (preparedVal.includes(preparedQuery)) {
        return true;
      }
    }

    return false;
  }
}
