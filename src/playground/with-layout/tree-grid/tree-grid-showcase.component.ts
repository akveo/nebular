/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { DATA, PeriodicElement } from './data';

@Component({
  selector: 'nb-tree-grid-showcase',
  templateUrl: './tree-grid-showcase.component.html',
  styleUrls: ['./tree-grid-showcase.component.scss'],
})
export class TreeGridShowcaseComponent {
  customColumn = 'name';
  defaultColumns = ['weight', 'symbol', 'position'];
  get columnsToDisplay(): string[] {
    return [ this.customColumn, ...this.defaultColumns ];
  }

  dataSource: NbTreeGridDataSource<PeriodicElement>;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<PeriodicElement>) {
    this.dataSource = this.dataSourceBuilder.create(DATA);
  }
}
