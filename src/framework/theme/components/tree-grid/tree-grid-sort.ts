/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, Directive, Inject, Input } from '@angular/core';

import { NB_SORT_HEADER_COLUMN_DEF } from './tree-grid-cell';

/** Column definition associated with a `NbSortHeaderDirective`. */
interface NbSortHeaderColumnDef {
  name: string;
}

export interface NbSortRequest {
  column: string;
  direction: NbSortDirection;
}

export interface NbSortable {
  sort(sortRequest: NbSortRequest);
}

export type NbSortDirection = 'asc' | 'desc' | '';
const sortDirections: NbSortDirection[] = ['asc', 'desc', ''];

@Directive({ selector: '[nbSort]' })
export class NbSortDirective {
  @Input('nbSort') sortable: NbSortable;

  sort(sortRequest: NbSortRequest) {
    this.sortable.sort(sortRequest);
  }
}

@Component({
  selector: '[nbSortHeader]',
  template: `
    <button type="button" (click)="sortData()">
      <ng-content></ng-content>
      <span *ngIf="direction === 'asc'">⬆</span>
      <span *ngIf="direction === 'desc'">⬇</span>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbSortHeaderDirective {

  @Input('nbSortHeader') direction: NbSortDirection = '';

  constructor(private sort: NbSortDirective,
              @Inject(NB_SORT_HEADER_COLUMN_DEF) private columnDef: NbSortHeaderColumnDef) {
  }

  sortData() {
    const sortRequest = this.createSortRequest();
    this.sort.sort(sortRequest);
  }

  private createSortRequest(): NbSortRequest {
    this.direction = this.getNextDirection();
    return { direction: this.direction, column: this.columnDef.name };
  }

  private getNextDirection(): NbSortDirection {
    const sortDirectionCycle = sortDirections;
    let nextDirectionIndex = sortDirectionCycle.indexOf(this.direction) + 1;
    if (nextDirectionIndex >= sortDirectionCycle.length) {
      nextDirectionIndex = 0;
    }
    return sortDirectionCycle[nextDirectionIndex];
  }
}
