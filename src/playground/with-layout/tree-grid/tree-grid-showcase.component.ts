/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbTreeGridNode } from '@nebular/theme';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  childrenElements?: PeriodicElement[];
}

const DATA: NbTreeGridNode<PeriodicElement>[] = [
  {
    data: { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  },
  {
    data: { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    children: [
      {
        data: { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
        children: [
          { data: { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' } },
          { data: { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' } },
        ],
      },
    ],
  },
  {
    data: { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    children: [
      { data: { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' } },
      { data: { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' } },
    ],
  },
];

@Component({
  selector: 'nb-tree-grid-showcase',
  templateUrl: './tree-grid-showcase.component.html',
  styles: [`
    button[nbTreeGridRowToggle] {
      background: transparent;
      border: none;
      padding: 0;
    }
  `],
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
