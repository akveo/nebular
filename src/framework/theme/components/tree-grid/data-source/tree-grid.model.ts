/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

export interface NbTreeGridNode<T> {
  data: T,
  children?: NbTreeGridNode<T>[];
  expanded?: boolean;
}

export const DEFAULT_ROW_LEVEL: number = 0;

export class NbTreeGridPresentationNode<T> {
  get expanded(): boolean {
    return this.node.expanded;
  }
  set expanded(value: boolean) {
    this.node.expanded = value;
  }
  children: NbTreeGridPresentationNode<T>[] = [];

  get data(): T {
    return this.node.data;
  }

  constructor(
    readonly node: NbTreeGridNode<T>,
    public readonly level: number = DEFAULT_ROW_LEVEL,
  ) {}

  hasChildren(): boolean {
    return !!this.children && !!this.children.length;
  }
}
