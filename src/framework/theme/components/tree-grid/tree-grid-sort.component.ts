/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';

import { convertToBoolProperty } from '../helpers';
import { NB_SORT_HEADER_COLUMN_DEF } from '../cdk/table/cell';

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

/**
 * Directive triggers sort method of passed object when sort header changes direction
 */
@Directive({ selector: '[nbSort]' })
export class NbSortDirective {
  @Input('nbSort') sortable: NbSortable;

  @Output() sort: EventEmitter<NbSortRequest> = new EventEmitter<NbSortRequest>();

  emitSort(sortRequest: NbSortRequest) {
    if (this.sortable && this.sortable.sort) {
      this.sortable.sort(sortRequest);
    }
    this.sort.emit(sortRequest);
  }
}

export interface NbSortHeaderIconDirectiveContext {
  $implicit: NbSortDirection;
  isAscending: boolean;
  isDescending: boolean;
  isNone: boolean;
}

/**
 * Directive for headers sort icons. Mark you icon implementation with this structural directive and
 * it'll set template's implicit context with current direction. Context also has `isAscending`,
 * `isDescending` and `isNone` properties.
 */
@Directive({ selector: '[nbSortHeaderIcon]' })
export class NbSortHeaderIconDirective {}

@Component({
  selector: 'nb-sort-icon',
  template: `
    <ng-container *ngIf="isDirectionSet()">
      <nb-icon *ngIf="isAscending()" icon="chevron-down-outline" pack="nebular-essentials" aria-hidden="true"></nb-icon>
      <nb-icon *ngIf="isDescending()" icon="chevron-up-outline" pack="nebular-essentials" aria-hidden="true"></nb-icon>
    </ng-container>
  `,
})
export class NbSortIconComponent {
  @Input() direction: NbSortDirection = NbSortDirection.NONE;

  isAscending(): boolean {
    return this.direction === NbSortDirection.ASCENDING;
  }

  isDescending(): boolean {
    return this.direction === NbSortDirection.DESCENDING;
  }

  isDirectionSet(): boolean {
    return this.isAscending() || this.isDescending();
  }
}

/**
 * Marks header as sort header so it emitting sort event when clicked.
 */
@Component({
  selector: '[nbSortHeader]',
  template: `
    <button
      class="nb-tree-grid-header-change-sort-button"
      type="button"
      [attr.disabled]="getDisabledAttributeValue()"
      (click)="sortData()">
      <ng-content></ng-content>
    </button>
    <nb-sort-icon *ngIf="!sortIcon; else customIcon" [direction]="direction"></nb-sort-icon>
    <ng-template #customIcon [ngTemplateOutlet]="sortIcon" [ngTemplateOutletContext]="getIconContext()"></ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbSortHeaderComponent {

  @ContentChild(NbSortHeaderIconDirective, { read: TemplateRef, static: false })
  sortIcon: TemplateRef<NbSortHeaderIconDirectiveContext>;

  /**
   * Current sort direction. Possible values: `asc`, `desc`, ``(none)
   * @type {NbSortDirection}
   */
  @Input('nbSortHeader') direction: NbSortDirection;

  private disabledValue: boolean = false;

  /**
   * Disable sort header
   */
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
    this.sort.emitSort(sortRequest);
  }

  getIconContext(): NbSortHeaderIconDirectiveContext {
    return {
      $implicit: this.direction,
      isAscending: this.isAscending(),
      isDescending: this.isDescending(),
      isNone: !this.isAscending() && !this.isDescending(),
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
