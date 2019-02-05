/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive, HostBinding,
  HostListener,
  Inject,
  Input,
  TemplateRef,
} from '@angular/core';

import { convertToBoolProperty } from '../helpers';
import { NB_SORT_HEADER_COLUMN_DEF } from '../cdk/table';

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

export enum NbSortDirection {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
  NONE = '',
}
const sortDirections: NbSortDirection[] = [
  NbSortDirection.ASCENDING,
  NbSortDirection.DESCENDING,
  NbSortDirection.NONE,
];

@Directive({ selector: '[nbSort]' })
export class NbSortDirective {
  @Input('nbSort') sortable: NbSortable;

  sort(sortRequest: NbSortRequest) {
    this.sortable.sort(sortRequest);
  }
}


export interface NbSortHeaderIconDirectiveContext {
  $implicit: NbSortDirection;
  isAscending: boolean;
  isDescending: boolean;
}

@Directive({ selector: '[nbSortHeaderIcon]' })
export class NbSortHeaderIconDirective {}

@Component({
  selector: '[nbSortHeader]',
  template: `
    <button
      class="change-sort-button"
      type="button"
      [attr.disabled]="getDisabledAttributeValue()"
      (click)="sortData()">
      <ng-content></ng-content>
    </button>
    <ng-container *ngTemplateOutlet="sortIcon; context: getIconContext()"></ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbSortHeaderComponent {

  @ContentChild(NbSortHeaderIconDirective, { read: TemplateRef }) sortIcon: TemplateRef<any>;

  @Input('nbSortHeader') direction: NbSortDirection;

  private disabledValue: boolean = false;

  @Input()
  @HostBinding('class.disabled')
  set disabled(value) {
    this.disabledValue = convertToBoolProperty(value);
  }
  get disabled(): boolean {
    return this.disabledValue;
  }

  @HostListener('click')
  sortIfEnabled() {
    if (!this.disabled) {
      this.sortData();
    }
  }

  constructor(
    private sort: NbSortDirective,
    @Inject(NB_SORT_HEADER_COLUMN_DEF) private columnDef: NbSortHeaderColumnDef,
  ) {}

  isAscending(): boolean {
    return this.direction === NbSortDirection.ASCENDING;
  }

  isDescending(): boolean {
    return this.direction === NbSortDirection.DESCENDING;
  }

  sortData(): void {
    const sortRequest = this.createSortRequest();
    this.sort.sort(sortRequest);
  }

  getIconContext(): NbSortHeaderIconDirectiveContext {
    return {
      $implicit: this.direction,
      isAscending: this.isAscending(),
      isDescending: this.isDescending(),
    };
  }

  getDisabledAttributeValue(): '' | null {
    return this.disabled ? '' : null;
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
