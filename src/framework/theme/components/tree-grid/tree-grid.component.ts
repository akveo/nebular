/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CDK_TABLE_TEMPLATE, CdkTable } from '@angular/cdk/table';

import { NbTreeGridDataSource, NbTreeGridNode } from './tree-grid-data-source';

@Component({
  selector: 'nb-tree-grid, table[nb-tree-grid]',
  template: CDK_TABLE_TEMPLATE,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbTreeGridComponent<T> extends CdkTable<T> {
  private _source: NbTreeGridDataSource<T>;

  @Input() set source(source: NbTreeGridNode<T>[]) {
    if (source instanceof NbTreeGridDataSource) {
      this._source = source;
    } else {
      this._source = new NbTreeGridDataSource<T>(source);
    }
    this.dataSource = this._source;
  }
}
