/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

export const NB_DEFAULT_ROW_LEVEL: number = 0;

export type NbDataGetter<N, T> = (N) => T;
export type NbChildrenGetter<N, T> = (N) => (T[] | undefined);
export type NbExpandedGetter<N> = (N) => boolean;

export interface NbGetters<N, T> {
  dataGetter?: NbDataGetter<N, T>;
  childrenGetter?: NbChildrenGetter<N, T>;
  expandedGetter?: NbExpandedGetter<N>;
}

/**
 * Implicit context of cells and rows
 */
export class NbTreeGridPresentationNode<T> {
  constructor(
    /**
     * Data object associated with row
     */
    public readonly data: T,
    public children: NbTreeGridPresentationNode<T>[] | undefined,
    /**
     * Row expand state
     */
    public expanded: boolean,
    public readonly level: number,
  ) {}

  /**
   * True if row has child rows
   */
  hasChildren(): boolean {
    return !!this.children && !!this.children.length;
  }
}
