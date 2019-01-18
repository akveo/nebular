/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CdkTable } from '@angular/cdk/table';

import { NbTreeGridDataSource, NbTreeGridNode } from './tree-grid-data-source';
import { ReplaySubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

// TODO do we need to move search in the separate component and make it configurable?
@Component({
  selector: 'nb-tree-grid, table[nb-tree-grid]',
  template: `
    <input nbInput (input)="searchQuery.next($event.target.value)">
    <table>
      <ng-container headerRowOutlet></ng-container>
      <ng-container rowOutlet></ng-container>
      <ng-container footerRowOutlet></ng-container>
    </table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbTreeGridComponent<T> extends CdkTable<T> {
  readonly searchQuery = new ReplaySubject();

  private _source: NbTreeGridDataSource<T>;

  @Input() set source(source: NbTreeGridNode<T>[]) {
    if (source instanceof NbTreeGridDataSource) {
      this._source = source;
    } else {
      this._source = new NbTreeGridDataSource<T>(source);
    }
    this.dataSource = this._source;

    this.searchQuery
      .pipe(
        debounceTime(300),
      )
      .subscribe((searchQuery: string) => this._source.filter(searchQuery));
  }
}
