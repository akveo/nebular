/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';

import { NbGetters, NB_DEFAULT_ROW_LEVEL, NbTreeGridPresentationNode } from './tree-grid.model';

@Injectable()
export class NbTreeGridDataService<T> {
  private defaultGetters: NbGetters<any, T> = {
    dataGetter: (node) => node.data,
    childrenGetter: (d) => d.children || undefined,
    expandedGetter: (d) => !!d.expanded,
  };

  toPresentationNodes<N>(
    nodes: N[],
    customGetters?: NbGetters<N, T>,
    level: number = NB_DEFAULT_ROW_LEVEL,
  ): NbTreeGridPresentationNode<T>[] {
    const getters: NbGetters<N, T> = { ...this.defaultGetters, ...customGetters };

    return this.mapNodes(nodes, getters, level);
  }

  private mapNodes<N>(nodes: N[], getters: NbGetters<N, T>, level: number): NbTreeGridPresentationNode<T>[] {
    const { dataGetter, childrenGetter, expandedGetter } = getters;

    return nodes.map((node) => {
      const childrenNodes = childrenGetter(node);
      let children: NbTreeGridPresentationNode<T>[];
      if (childrenNodes) {
        children = this.toPresentationNodes(childrenNodes, getters, level + 1);
      }

      return new NbTreeGridPresentationNode(dataGetter(node), children, expandedGetter(node), level);
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
      let children: NbTreeGridPresentationNode<T>[];
      if (node.hasChildren()) {
        children = this.copy(node.children);
      }
      return new NbTreeGridPresentationNode(node.data, children, node.expanded, node.level);
    });
  }
}
