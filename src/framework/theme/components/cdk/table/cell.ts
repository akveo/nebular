/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license infornbion.
 */

import { Directive, ElementRef, InjectionToken, Input } from '@angular/core';
import {
  CdkCell,
  CdkCellDef,
  CdkColumnDef,
  CdkFooterCell,
  CdkFooterCellDef,
  CdkHeaderCell,
  CdkHeaderCellDef,
} from '@angular/cdk/table';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

/**
 * Cell definition for the nb-table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
@Directive({
  selector: '[nbCellDef]',
  providers: [{ provide: CdkCellDef, useExisting: NbCellDefDirective }],
  standalone: false,
})
export class NbCellDefDirective extends CdkCellDef {}

/**
 * Header cell definition for the nb-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
@Directive({
  selector: '[nbHeaderCellDef]',
  providers: [{ provide: CdkHeaderCellDef, useExisting: NbHeaderCellDefDirective }],
  standalone: false,
})
export class NbHeaderCellDefDirective extends CdkHeaderCellDef {}

/**
 * Footer cell definition for the nb-table.
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 */
@Directive({
  selector: '[nbFooterCellDef]',
  providers: [{ provide: CdkFooterCellDef, useExisting: NbFooterCellDefDirective }],
  standalone: false,
})
export class NbFooterCellDefDirective extends CdkFooterCellDef {}

export const NB_SORT_HEADER_COLUMN_DEF = new InjectionToken('NB_SORT_HEADER_COLUMN_DEF');

/**
 * Column definition for the nb-table.
 * Defines a set of cells available for a table column.
 */
@Directive({
  selector: '[nbColumnDef]',
  providers: [
    { provide: CdkColumnDef, useExisting: NbColumnDefDirective },
    { provide: NB_SORT_HEADER_COLUMN_DEF, useExisting: NbColumnDefDirective },
  ],
  standalone: false,
})
export class NbColumnDefDirective extends CdkColumnDef {
  private _hasStickyCellChanged = false;

  /** Unique name for this column. */
  @Input('nbColumnDef')
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._setNameInput(value);
  }

  /** Whether this column should be sticky positioned at the start of the row */
  @Input()
  get sticky(): boolean {
    return this._stickyCell;
  }
  set sticky(value: boolean) {
    if (value !== this._stickyCell) {
      this._stickyCell = value;
      this._hasStickyCellChanged = true;
    }
  }
  private _stickyCell = false;

  /** Whether this column should be sticky positioned on the end of the row */
  @Input()
  get stickyEnd(): boolean {
    return this._stickyEnd;
  }
  set stickyEnd(value: boolean) {
    const prevValue = this._stickyEnd;
    this._stickyEnd = coerceBooleanProperty(value);
    this._hasStickyCellChanged = prevValue !== this._stickyEnd;
  }

  /** Whether the sticky state has changed. */
  hasStickyChanged(): boolean {
    const hasStickyChanged = this._hasStickyCellChanged;
    this.resetStickyChanged();
    return hasStickyChanged;
  }

  /** Resets the sticky changed state. */
  resetStickyChanged(): void {
    this._hasStickyCellChanged = false;
  }
}

/** Header cell template container that adds the right classes and role. */
@Directive({
  selector: 'nb-header-cell, th[nbHeaderCell]',
  host: {
    class: 'nb-header-cell',
    role: 'columnheader',
  },
  standalone: false,
})
export class NbHeaderCellDirective extends CdkHeaderCell {
  constructor(columnDef: NbColumnDefDirective, elementRef: ElementRef<HTMLElement>) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(`nb-column-${columnDef.cssClassFriendlyName}`);
  }
}

/** Footer cell template container that adds the right classes and role. */
@Directive({
  selector: 'nb-footer-cell, td[nbFooterCell]',
  host: {
    class: 'nb-footer-cell',
    role: 'gridcell',
  },
  standalone: false,
})
export class NbFooterCellDirective extends CdkFooterCell {
  constructor(columnDef: NbColumnDefDirective, elementRef: ElementRef) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(`nb-column-${columnDef.cssClassFriendlyName}`);
  }
}

/** Cell template container that adds the right classes and role. */
@Directive({
  selector: 'nb-cell, td[nbCell]',
  host: {
    class: 'nb-cell',
    role: 'gridcell',
  },
  standalone: false,
})
export class NbCellDirective extends CdkCell {
  constructor(columnDef: NbColumnDefDirective, elementRef: ElementRef<HTMLElement>) {
    super(columnDef, elementRef);
    elementRef.nativeElement.classList.add(`nb-column-${columnDef.cssClassFriendlyName}`);
  }
}
