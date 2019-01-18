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
import { NbTreeGridDataService } from './tree-grid-data.service';
import { NbSortable, NbSortRequest } from '../tree-grid-sort';
import {
  NbTreeGridNode,
  NbTreeGridPresentationNode,
} from './tree-grid.model';

export interface NbFilterable {
  filter(filterRequest: string);
}

export class NbTreeGridDataSource<T> extends DataSource<T> implements NbSortable, NbFilterable {
  /** Stream that emits when a new data array is set on the data source. */
  private data: BehaviorSubject<NbTreeGridPresentationNode<T>[]>;

  /** Stream emitting render data to the table (depends on ordered data changes). */
  private readonly renderData = new BehaviorSubject<T[]>([]);

  private readonly filterRequest = new BehaviorSubject<string>('');

  private readonly sortRequest = new BehaviorSubject<NbSortRequest>(null);

  constructor(private sortService: NbTreeGridSortService<T>,
              private filterService: NbTreeGridFilterService<T>,
              private treeGridService: NbTreeGridService<T>,
              private treeGridDataService: NbTreeGridDataService<T>) {
    super();
  }

  setData(data: NbTreeGridNode<T>[]) {
    const presentationData: NbTreeGridPresentationNode<T>[] = this.treeGridDataService.toPresentationNodes(data);
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
        map((data: NbTreeGridPresentationNode<T>[]) => this.treeGridDataService.flatten(data)),
      )
      .subscribe((data: T[]) => this.renderData.next(data));
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

  create(data: NbTreeGridNode<T>[]): NbTreeGridDataSource<T> {
    const dataSource = new NbTreeGridDataSource<T>(
      this.sortService,
      this.filterService,
      this.treeGridService,
      this.treeGridDataService,
    );

    dataSource.setData(data);
    return dataSource;
  }
}
