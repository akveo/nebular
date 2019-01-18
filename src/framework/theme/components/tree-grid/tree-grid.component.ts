/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, Inject,
  Input,
  IterableDiffers,
} from '@angular/core';
import { CdkTable } from '@angular/cdk/table';
import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { ReplaySubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { NB_DOCUMENT } from '../../theme.options';
import { NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbTreeGridNode } from './data-source/tree-grid-data-source';

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

  // TODO get rid of this
  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<T>,
              differs: IterableDiffers,
              changeDetectorRef: ChangeDetectorRef,
              elementRef: ElementRef,
              @Attribute('role') role: string,
              dir: Directionality,
              @Inject(NB_DOCUMENT) document: any,
              platform: Platform | undefined,
  ) {
    super(differs, changeDetectorRef, elementRef, role, dir, document, platform);
  }

  private _source: NbTreeGridDataSource<T>;

  @Input() set source(data: NbTreeGridNode<T>[]) {
    if (data instanceof NbTreeGridDataSource) {
      this._source = data;
    } else {
      this._source = this.dataSourceBuilder.create(data);
    }
    this.dataSource = this._source;

    this.searchQuery
      .pipe(
        debounceTime(300),
      )
      .subscribe((searchQuery: string) => this._source.filter(searchQuery));
  }
}
