/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

export interface NbTreeGridNode<T> {
  data: T,
  children?: NbTreeGridNode<T>[];
}

export class NbTreeGridPresentationNode<T> {
  public expanded: boolean = false;
  public children: NbTreeGridPresentationNode<T>[] = [];

  get data(): T {
    return this.node.data;
  }

  constructor(readonly node: NbTreeGridNode<T>, public readonly level: number) {
  }

  hasChildren(): boolean {
    return !!this.children && !!this.children.length;
  }
}
