/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';

import {
  ChildrenGetter,
  DataGetter,
  DEFAULT_ROW_LEVEL,
  ExpandedGetter,
  NbTreeGridPresentationNode,
} from './tree-grid.model';

@Injectable()
export class NbTreeGridDataService<T> {

  toPresentationNodes<N>(
    nodes: N[],
    dataGetter: DataGetter<N, T> = node => node.data,
    childrenGetter: ChildrenGetter<N, T> = d => d.children || undefined,
    expandedGetter: ExpandedGetter<T> = d => d.expanded,
    level: number = DEFAULT_ROW_LEVEL,
  ): NbTreeGridPresentationNode<T>[] {
    return nodes.map(node => {
      const children = childrenGetter(node);
      const presentationChildren: NbTreeGridPresentationNode<T>[] = children
        ? this.toPresentationNodes(children, dataGetter, childrenGetter, expandedGetter, level + 1)
        : undefined;

      return new NbTreeGridPresentationNode(dataGetter(node), presentationChildren, expandedGetter(node), level);
    });
  }

  flattenExpanded(nodes: NbTreeGridPresentationNode<T>[]): NbTreeGridPresentationNode<T>[] {
    return nodes.reduce((res: NbTreeGridPresentationNode<T>[], node: NbTreeGridPresentationNode<T>) => {
      res.push(node);

      if (node.expanded && node.hasChildren()) {
        res.push(...this.flattenExpanded(node.children));
      }

      return res;
    }, []);
  }

  copy(nodes: NbTreeGridPresentationNode<T>[]): NbTreeGridPresentationNode<T>[] {
    return nodes.map((node: NbTreeGridPresentationNode<T>) => {
      const children: NbTreeGridPresentationNode<T>[] = node.hasChildren()
        ? this.copy(node.children)
        : undefined;

      return new NbTreeGridPresentationNode(node.data, children, node.expanded, node.level);
    });
  }
}
