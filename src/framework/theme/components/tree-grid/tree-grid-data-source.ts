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

export interface NbSortRequest {
  column: string;
  direction: 'asc' | 'desc';
}

export interface NbSortable {
  sort(sortRequest: NbSortRequest);
}

export class NbTreeGridDataSource<T> extends DataSource<T> implements NbSortable {
  /** Stream that emits when a new data array is set on the data source. */
  private readonly data: BehaviorSubject<NbTreeGridPresentationNode<T>[]>;

  /** Stream emitting render data to the table (depends on ordered data changes). */
  private readonly renderData = new BehaviorSubject<T[]>([]);

  private readonly searchQuery = new BehaviorSubject<string>('');

  private readonly sortRequest = new BehaviorSubject<NbSortRequest>(null);

  constructor(data: NbTreeGridNode<T>[]) {
    super();
    const presentationData: NbTreeGridPresentationNode<T>[] = this.convertToPresentationNodes(data);
    this.data = new BehaviorSubject(presentationData);
    this.updateChangeSubscription();
  }

  expand(row: T) {
    const node: NbTreeGridPresentationNode<T> = this.find(row);
    node.expanded = true;
    this.data.next(this.data.value);
  }

  collapse(row: T) {
    const node: NbTreeGridPresentationNode<T> = this.find(row);
    node.expanded = false;
    this.data.next(this.data.value);
  }

  toggle(row: T) {
    const node: NbTreeGridPresentationNode<T> = this.find(row);
    node.expanded = !node.expanded;
    this.data.next(this.data.value);
  }

  filter(searchQuery: string) {
    this.searchQuery.next(searchQuery);
  }

  connect(collectionViewer: CollectionViewer): Observable<T[] | ReadonlyArray<T>> {
    return this.renderData;
  }

  disconnect(collectionViewer: CollectionViewer) {
  }

  sort(sortRequest: NbSortRequest) {
    this.sortRequest.next(sortRequest);
  }

  protected updateChangeSubscription() {
    const dataStream = this.data.pipe(
      map((nodes: NbTreeGridPresentationNode<T>[]) => this.copy(nodes)),
    );

    const filteredData = combineLatest(dataStream, this.searchQuery)
      .pipe(
        map(([data]) => this.filterData(data)),
      );

    const sortedData = combineLatest(filteredData, this.sortRequest)
      .pipe(
        map(([data]) => this.sortData(data)),
      );

    sortedData
      .pipe(
        map((data: NbTreeGridPresentationNode<T>[]) => this.convertToData(data)),
      )
      .subscribe((data: T[]) => this.renderData.next(data));
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
    const toCheck: NbTreeGridPresentationNode<T>[] = [...this.data.value];

    for (const node of toCheck) {
      if (node.node.data === row) {
        return node;
      }

      toCheck.push(...node.children);
    }
  }

  private filterData(data: NbTreeGridPresentationNode<T>[]): NbTreeGridPresentationNode<T>[] {
    if (!this.searchQuery.value) {
      return data;
    }

    return data.reduce((filtered: NbTreeGridPresentationNode<T>[], node: NbTreeGridPresentationNode<T>) => {
      const filteredChildren = this.filterData(node.children);

      node.children = filteredChildren;

      node.expanded = false;

      if (filteredChildren && filteredChildren.length) {
        node.expanded = true;
        filtered.push(node);
      } else if (this.filterPredicate(node.node.data, this.searchQuery.value)) {
        filtered.push(node);
      }

      return filtered;
    }, []);
  }

  // TODO has to be configurable
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

  private sortData(data: NbTreeGridPresentationNode<T>[]): NbTreeGridPresentationNode<T>[] {
    if (!this.sortRequest.value) {
      return data;
    }

    // TODO provide comparator somehow
    const sorted = data.sort((na, nb) => {
      const key = this.sortRequest.value.column;
      const dir = this.sortRequest.value.direction;
      const a = na.node.data[key];
      const b = nb.node.data[key];

      let res = 0;

      if (a > b) {
        res = 1
      }
      if (a < b) {
        res = -1
      }

      return dir === 'asc' ? res : res * -1;
    });
    for (const node of data) {
      node.children = this.sortData(node.children);
    }
    return sorted;
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
