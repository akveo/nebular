/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NbTreeGridSortService } from './tree-grid-sort.service';
import { NbTreeGridFilterService } from './tree-grid-filter.service';
import { NbTreeGridService } from './tree-grid.service';

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
  private data: BehaviorSubject<NbTreeGridPresentationNode<T>[]>;

  /** Stream emitting render data to the table (depends on ordered data changes). */
  private readonly renderData = new BehaviorSubject<T[]>([]);

  private readonly searchQuery = new BehaviorSubject<string>('');

  private readonly sortRequest = new BehaviorSubject<NbSortRequest>(null);

  constructor(private sortService: NbTreeGridSortService<T>,
              private filterService: NbTreeGridFilterService<T>,
              private treeGridService: NbTreeGridService<T>) {
    super();
  }

  setData(data: NbTreeGridNode<T>[]) {
    const presentationData: NbTreeGridPresentationNode<T>[] = this.convertToPresentationNodes(data);
    this.data = new BehaviorSubject(presentationData);
    this.updateChangeSubscription();
  }

  connect(collectionViewer: CollectionViewer): Observable<T[] | ReadonlyArray<T>> {
    return this.renderData;
  }

  disconnect(collectionViewer: CollectionViewer) {
  }

  expand(row: T) {
    this.treeGridService.expand(this.data.value, row);
    this.data.next(this.data.value);
  }

  collapse(row: T) {
    this.treeGridService.collapse(this.data.value, row);
    this.data.next(this.data.value);
  }

  toggle(row: T) {
    this.treeGridService.toggle(this.data.value, row);
    this.data.next(this.data.value);
  }

  sort(sortRequest: NbSortRequest) {
    this.sortRequest.next(sortRequest);
  }

  filter(searchQuery: string) {
    this.searchQuery.next(searchQuery);
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

  private filterData(data: NbTreeGridPresentationNode<T>[]): NbTreeGridPresentationNode<T>[] {
    return this.filterService.filter(this.searchQuery.value, data);
  }

  private sortData(data: NbTreeGridPresentationNode<T>[]): NbTreeGridPresentationNode<T>[] {
    return this.sortService.sort(this.sortRequest.value, data);
  }
}

@Injectable()
export class NbTreeGridDataSourceBuilder<T> {
  constructor(private filterService: NbTreeGridFilterService<T>,
              private sortService: NbTreeGridSortService<T>,
              private treeGridService: NbTreeGridService<T>) {
  }

  create(data: NbTreeGridNode<T>[]): NbTreeGridDataSource<T> {
    const dataSource = new NbTreeGridDataSource<T>(this.sortService, this.filterService, this.treeGridService);
    dataSource.setData(data);
    return dataSource;
  }
}
