/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NbCollectionViewer } from '../../cdk/collections/collection-viewer';
import { NbDataSource } from '../../cdk/table/data-source';
import { NbSortable, NbSortRequest } from '../tree-grid-sort.component';
import { NbTreeGridDataService } from './tree-grid-data.service';
import { NbTreeGridFilterService } from './tree-grid-filter.service';
import { NbTreeGridSortService } from './tree-grid-sort.service';
import { NbGetters, NB_DEFAULT_ROW_LEVEL, NbTreeGridPresentationNode } from './tree-grid.model';
import { NbToggleOptions, NbTreeGridService } from './tree-grid.service';

export interface NbFilterable {
  filter(filterRequest: string);
}

export class NbTreeGridDataSource<T> extends NbDataSource<NbTreeGridPresentationNode<T>>
                                     implements NbSortable, NbFilterable {
  /** Stream that emits when a new data array is set on the data source. */
  private data: BehaviorSubject<NbTreeGridPresentationNode<T>[]>;

  /** Stream emitting render data to the table (depends on ordered data changes). */
  private readonly renderData = new BehaviorSubject<NbTreeGridPresentationNode<T>[]>([]);

  private readonly filterRequest = new BehaviorSubject<string>('');

  private readonly sortRequest = new BehaviorSubject<NbSortRequest>(null);

  constructor(private sortService: NbTreeGridSortService<T>,
              private filterService: NbTreeGridFilterService<T>,
              private treeGridService: NbTreeGridService<T>,
              private treeGridDataService: NbTreeGridDataService<T>) {
    super();
  }

  setData<N>(data: N[], customGetters?: NbGetters<N, T>) {
    let presentationData: NbTreeGridPresentationNode<T>[] = [];
    if (data) {
      presentationData = this.treeGridDataService.toPresentationNodes(data, customGetters);
    }

    this.data = new BehaviorSubject(presentationData);
    this.updateChangeSubscription();
  }

  connect(
    collectionViewer: NbCollectionViewer,
  ): Observable<NbTreeGridPresentationNode<T>[] | ReadonlyArray<NbTreeGridPresentationNode<T>>> {
    return this.renderData;
  }

  disconnect(collectionViewer: NbCollectionViewer) {
  }

  expand(row: T) {
    this.treeGridService.expand(this.data.value, row);
    this.data.next(this.data.value);
  }

  collapse(row: T) {
    this.treeGridService.collapse(this.data.value, row);
    this.data.next(this.data.value);
  }

  toggle(row: T, options?: NbToggleOptions) {
    this.treeGridService.toggle(this.data.value, row, options);
    this.data.next(this.data.value);
  }

  toggleByIndex(dataIndex: number, options?: NbToggleOptions) {
    const node: NbTreeGridPresentationNode<T> = this.renderData.value && this.renderData.value[dataIndex];
    if (node) {
      this.toggle(node.data, options);
    }
  }

  getLevel(rowIndex: number): number {
    const row = this.renderData.value[rowIndex];
    return row ? row.level : NB_DEFAULT_ROW_LEVEL;
  }

  sort(sortRequest: NbSortRequest) {
    this.sortRequest.next(sortRequest);
  }

  filter(searchQuery: string) {
    this.filterRequest.next(searchQuery);
  }

  protected updateChangeSubscription() {
    const dataStream = this.data;

    const filteredData = combineLatest(dataStream, this.filterRequest)
      .pipe(
        map(([data]) => this.treeGridDataService.copy(data)),
        map(data => this.filterData(data)),
      );

    const sortedData = combineLatest(filteredData, this.sortRequest)
      .pipe(
        map(([data]) => this.sortData(data)),
      );

    sortedData
      .pipe(
        map((data: NbTreeGridPresentationNode<T>[]) => this.treeGridDataService.flattenExpanded(data)),
      )
      .subscribe((data: NbTreeGridPresentationNode<T>[]) => this.renderData.next(data));
  }

  private filterData(data: NbTreeGridPresentationNode<T>[]): NbTreeGridPresentationNode<T>[] {
    return this.filterService.filter(this.filterRequest.value, data);
  }

  private sortData(data: NbTreeGridPresentationNode<T>[]): NbTreeGridPresentationNode<T>[] {
    return this.sortService.sort(this.sortRequest.value, data);
  }
}

@Injectable()
export class NbTreeGridDataSourceBuilder<T> {
  constructor(private filterService: NbTreeGridFilterService<T>,
              private sortService: NbTreeGridSortService<T>,
              private treeGridService: NbTreeGridService<T>,
              private treeGridDataService: NbTreeGridDataService<T>) {
  }

  create<N>(data: N[], customGetters?: NbGetters<N, T>): NbTreeGridDataSource<T> {
    const dataSource = new NbTreeGridDataSource<T>(
      this.sortService,
      this.filterService,
      this.treeGridService,
      this.treeGridDataService,
    );

    dataSource.setData(data, customGetters);
    return dataSource;
  }
}
