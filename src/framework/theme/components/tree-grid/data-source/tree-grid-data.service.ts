/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';

import { DEFAULT_ROW_LEVEL, NbTreeGridNode, NbTreeGridPresentationNode } from './tree-grid.model';

@Injectable()
export class NbTreeGridDataService<T> {

  toPresentationNodes(nodes: NbTreeGridNode<T>[], level: number = DEFAULT_ROW_LEVEL): NbTreeGridPresentationNode<T>[] {
    return nodes.map((node: NbTreeGridNode<T>) => {
      const presentationNode = new NbTreeGridPresentationNode(node, level);

      if (node.children) {
        presentationNode.children = this.toPresentationNodes(node.children, level + 1);
      }

      return presentationNode;
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
      const presentationNode = new NbTreeGridPresentationNode(node.node, node.level);
      presentationNode.expanded = node.expanded;

      if (node.hasChildren()) {
        presentationNode.children = this.copy(node.children);
      }

      return presentationNode;
    });
  }
}
