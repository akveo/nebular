/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface NbTreeGridNode<T> {
  data: T,
  children?: NbTreeGridNode<T>[];
}

export class NbTreeGridPresentationNode<T> {
  public expanded: boolean = false;
  public children: NbTreeGridPresentationNode<T>[] = [];

  constructor(readonly node: NbTreeGridNode<T>) {
  }

  hasChildren(): boolean {
    return !!this.children && !!this.children.length;
  }
}

export type NbTreeGridDataSourceInput<T> =
  NbTreeGridDataSource<NbTreeGridNode<T>> |
  Observable<NbTreeGridNode<T>[]> |
  NbTreeGridNode<T>[];

export class NbTreeGridDataSource<T> extends DataSource<T> {
  /** Stream that emits when a new data array is set on the data source. */
  private readonly _data: BehaviorSubject<NbTreeGridPresentationNode<T>[]>;

  /** Stream emitting render data to the table (depends on ordered data changes). */
  private readonly _renderData = new BehaviorSubject<T[]>([]);

  constructor(data: NbTreeGridNode<T>[]) {
    super();
    const presentationData: NbTreeGridPresentationNode<T>[] = this.convertToPresentationNodes(data);
    this._data = new BehaviorSubject(presentationData);
    this.updateChangeSubscription();
  }

  expand(row: T) {
    const node: NbTreeGridPresentationNode<T> = this.find(row);
    node.expanded = true;
    this._data.next(this._data.value);
  }

  collapse(row: T) {
    const node: NbTreeGridPresentationNode<T> = this.find(row);
    node.expanded = false;
    this._data.next(this._data.value);
  }

  toggle(row: T) {
    const node: NbTreeGridPresentationNode<T> = this.find(row);
    node.expanded = !node.expanded;
    this._data.next(this._data.value);
  }

  connect(collectionViewer: CollectionViewer): Observable<T[] | ReadonlyArray<T>> {
    return this._renderData;
  }

  disconnect(collectionViewer: CollectionViewer) {
  }

  protected updateChangeSubscription() {
    this._data
      .pipe(
        map((data: NbTreeGridPresentationNode<T>[]) => this.convertToData(data)),
      )
      .subscribe((data: T[]) => this._renderData.next(data));
  }

  private convertToPresentationNodes(nodes: NbTreeGridNode<T>[]): NbTreeGridPresentationNode<T>[] {
    return nodes.map((node: NbTreeGridNode<T>) => {
      const presentationNode = new NbTreeGridPresentationNode(node);

      if (node.children) {
        presentationNode.children = this.convertToPresentationNodes(node.children);
      }

      return presentationNode;
    });
  }

  private convertToData(nodes: NbTreeGridPresentationNode<T>[]): T[] {
    return nodes.reduce((res: T[], node: NbTreeGridPresentationNode<T>) => {
      res.push(node.node.data);

      if (node.expanded && node.hasChildren()) {
        res.push(...this.convertToData(node.children));
      }

      return res;
    }, []);
  }

  private find(row: T): NbTreeGridPresentationNode<T> {
    const toCheck: NbTreeGridPresentationNode<T>[] = [...this._data.value];

    for (const node of toCheck) {
      if (node.node.data === row) {
        return node;
      }

      toCheck.push(...node.children);
    }
  }
}
