/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable } from '@angular/core';

import { NbTreeGridNode, NbTreeGridPresentationNode } from './tree-grid.model';

@Injectable()
export class NbTreeGridDataService<T> {

  toPresentationNodes(nodes: NbTreeGridNode<T>[]): NbTreeGridPresentationNode<T>[] {
    return nodes.map((node: NbTreeGridNode<T>) => {
      const presentationNode = new NbTreeGridPresentationNode(node);

      if (node.children) {
        presentationNode.children = this.toPresentationNodes(node.children);
      }

      return presentationNode;
    });
  }

  flatten(nodes: NbTreeGridPresentationNode<T>[]): T[] {
    return nodes.reduce((res: T[], node: NbTreeGridPresentationNode<T>) => {
      res.push(node.node.data);

      if (node.expanded && node.hasChildren()) {
        res.push(...this.flatten(node.children));
      }

      return res;
    }, []);
  }

  copy(nodes: NbTreeGridPresentationNode<T>[]): NbTreeGridPresentationNode<T>[] {
    return nodes.map((node: NbTreeGridPresentationNode<T>) => {
      const presentationNode = new NbTreeGridPresentationNode(node.node);
      presentationNode.expanded = node.expanded;

      if (node.hasChildren()) {
        presentationNode.children = this.copy(node.children);
      }

      return presentationNode;
    });
  }
}
