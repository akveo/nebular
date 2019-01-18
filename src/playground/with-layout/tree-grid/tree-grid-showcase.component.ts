/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import {
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder,
} from '@nebular/theme/components/tree-grid/data-source/tree-grid-data-source';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  childrenElements?: PeriodicElement[];
  collapsed: boolean;
  padding?: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', collapsed: true },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', collapsed: true },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', collapsed: true },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', collapsed: true },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', collapsed: true },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', collapsed: true },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', collapsed: true },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', collapsed: true },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', collapsed: true },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', collapsed: true },
];

const data = [
  {
    data: {
      position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', collapsed: true,
    },
    children: [
      {
        data: {
          position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', collapsed: true,
          level: 1,
        },
      },
      {
        data: {
          position: 5, name: 'Boron', weight: 10.811, symbol: 'B', collapsed: true,
          level: 1,
        },
        children: [
          {
            data: {
              position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', collapsed: true,
              level: 2,
            },
          },
        ],
      },
      {
        data: {
          position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', collapsed: true,
          level: 1,
        },
      },
    ],
  },
  {
    data: { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', collapsed: true },
    children: [
      {
        data: {
          position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', collapsed: true,
          level: 1,
        },
      },
      {
        data: {
          position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', collapsed: true,
          level: 1,
        },
      },
    ],
  },
  {
    data: { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', collapsed: true },
    children: [
      {
        data: {
          position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', collapsed: true,
          level: 1,
        },
      },
    ],
  },
];


@Component({
  selector: 'nb-tree-grid-showcase',
  templateUrl: './tree-grid-showcase.component.html',
  styles: [`
    table {
      width: 100%;
    }

    tr:hover {
      background-color: red;
    }
  `],
})
export class TreeGridShowcaseComponent {
  columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  cols = ['weight', 'symbol', 'position'];
  dataSource: NbTreeGridDataSource<PeriodicElement>;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<PeriodicElement>) {
    this.dataSource = this.dataSourceBuilder.create(data);
  }

  toggle(element: PeriodicElement) {
    this.dataSource.toggle(element);
  }
}
