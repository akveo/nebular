/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BehaviorSubject } from 'rxjs';

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

const data = ELEMENT_DATA.map((element: PeriodicElement) => {
  return {
    ...element,
    childrenElements: ELEMENT_DATA.map((el: PeriodicElement) => {
      return {
        ...el,
        padding: 16,
        childrenElements: ELEMENT_DATA.map((el1: PeriodicElement) => {
          return {
            ...el1,
            padding: 32,
          }
        }),
      }
    }),
  };
});


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
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TreeGridShowcaseComponent {
  columnsToDisplay = ['name', 'weight', 'symbol', 'position'];
  cols = ['weight', 'symbol', 'position'];
  expandedElement: PeriodicElement | null;
  dataSource = new BehaviorSubject(data);

  toggle(element: PeriodicElement) {
    if (!element.childrenElements || !element.childrenElements.length) {
      return;
    }

    if (element.collapsed) {
      this.expand(element);
    } else {
      this.collapse(element);
    }
  }

  private expand(element: PeriodicElement) {
    element.collapsed = false;
    const expandedIndex = data.findIndex((e: PeriodicElement) => e === element);
    data.splice(expandedIndex + 1, 0, ...element.childrenElements as any);
    this.dataSource.next(data);
  }

  private collapse(element: PeriodicElement) {
    element.collapsed = true;
    const expandedIndex = data.findIndex((e: PeriodicElement) => e === element);
    data.splice(expandedIndex + 1, element.childrenElements.length);
    this.dataSource.next(data);
  }
}
