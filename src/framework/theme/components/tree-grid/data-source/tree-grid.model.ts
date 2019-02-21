/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/**
 * Table's data interface
 */
export interface NbTreeGridNode<T> {
  /**
   * Data object which will be available as a context of rows and cell templates
   * @type T
   */
  data: T,
  /**
   * Child rows
   */
  children?: NbTreeGridNode<T>[];
  /**
   * Row expand state
   */
  expanded?: boolean;
}

export const DEFAULT_ROW_LEVEL: number = 0;

/**
 * Implicit context of cells and rows
 */
export class NbTreeGridPresentationNode<T> {
  /**
   * Row expand state
   */
  get expanded(): boolean {
    return this.node.expanded;
  }
  set expanded(value: boolean) {
    this.node.expanded = value;
  }
  children: NbTreeGridPresentationNode<T>[] = [];

  /**
   * Data object associated with row
   */
  get data(): T {
    return this.node.data;
  }

  constructor(
    readonly node: NbTreeGridNode<T>,
    public readonly level: number = DEFAULT_ROW_LEVEL,
  ) {}

  /**
   * True if row has child rows
   */
  hasChildren(): boolean {
    return !!this.children && !!this.children.length;
  }
}
