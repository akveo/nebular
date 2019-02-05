/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */


import { Injectable } from '@angular/core';

import { NbTreeGridPresentationNode } from './tree-grid.model';
import { NbSortRequest } from '../tree-grid-sort.component';

@Injectable()
export class NbTreeGridSortService<T> {

  sort(request: NbSortRequest, data: NbTreeGridPresentationNode<T>[]): NbTreeGridPresentationNode<T>[] {
    if (!request) {
      return data;
    }

    // TODO provide comparator somehow
    const sorted = data.sort((na, nb) => {
      const key = request.column;
      const dir = request.direction;
      const a = na.node.data[key];
      const b = nb.node.data[key];

      let res = 0;

      if (a > b) {
        res = 1
      }
      if (a < b) {
        res = -1
      }

      return dir === 'asc' ? res : res * -1;
    });
    for (const node of data) {
      node.children = this.sort(request, node.children);
    }
    return sorted;
  }
}
