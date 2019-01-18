/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
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

  private readonly _searchQuery = new BehaviorSubject<string>('');

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

  filter(searchQuery: string) {
    this._searchQuery.next(searchQuery);
  }

  connect(collectionViewer: CollectionViewer): Observable<T[] | ReadonlyArray<T>> {
    return this._renderData;
  }

  disconnect(collectionViewer: CollectionViewer) {
  }

  protected updateChangeSubscription() {
    const dataStream = this._data.pipe(
      map((nodes: NbTreeGridPresentationNode<T>[]) => this.copy(nodes)),
    );

    const filteredData = combineLatest(dataStream, this._searchQuery)
      .pipe(
        map(([data]) => this.filterData(data)),
      );

    filteredData
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

  private filterData(data: NbTreeGridPresentationNode<T>[]): NbTreeGridPresentationNode<T>[] {
    if (!this._searchQuery.value) {
      return data;
    }

    return data.reduce((filtered: NbTreeGridPresentationNode<T>[], node: NbTreeGridPresentationNode<T>) => {
      const filteredChildren = this.filterData(node.children);

      node.children = filteredChildren;

      node.expanded = false;

      if (filteredChildren && filteredChildren.length) {
        node.expanded = true;
        filtered.push(node);
      } else if (this.filterPredicate(node.node.data, this._searchQuery.value)) {
        filtered.push(node);
      }

      return filtered;
    }, []);
  }

  private filterPredicate(data: T, searchQuery: string): boolean {
    const preparedQuery = searchQuery.trim().toLocaleLowerCase();
    for (const val of Object.values(data)) {
      const preparedVal = `${val}`.trim().toLocaleLowerCase();
      if (preparedVal.includes(preparedQuery)) {
        return true;
      }
    }

    return false;
  }

  private copy(nodes: NbTreeGridPresentationNode<T>[]): NbTreeGridPresentationNode<T>[] {
    return nodes.map((node: NbTreeGridPresentationNode<T>) => {
      const presentationNode = new NbTreeGridPresentationNode(node.node);
      presentationNode.expanded = node.expanded;

      if (node.children) {
        presentationNode.children = this.copy(node.children);
      }

      return presentationNode;
    });
  }
}
