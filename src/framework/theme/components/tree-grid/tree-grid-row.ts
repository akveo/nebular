/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */


import { ChangeDetectionStrategy, Component, Directive, Input } from '@angular/core';
import { CdkFooterRow, CdkFooterRowDef, CdkHeaderRow, CdkHeaderRowDef, CdkRow, CdkRowDef } from '@angular/cdk/table';

/**
 * Header row definition for the nb-table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
@Directive({
  selector: '[nbHeaderRowDef]',
  providers: [{ provide: CdkHeaderRowDef, useExisting: NbHeaderRowDefDirective }],
})
export class NbHeaderRowDefDirective extends CdkHeaderRowDef {
  @Input('nbHeaderRowDef') columns: Iterable<string>;
  @Input('nbHeaderRowDefSticky') sticky: boolean;
}

/**
 * Footer row definition for the nb-table.
 * Captures the footer row's template and other footer properties such as the columns to display.
 */
@Directive({
  selector: '[nbFooterRowDef]',
  providers: [{ provide: CdkFooterRowDef, useExisting: NbFooterRowDefDirective }],
})
export class NbFooterRowDefDirective extends CdkFooterRowDef {
  @Input('nbFooterRowDef') columns: Iterable<string>;
  @Input('nbFooterRowDefSticky') sticky: boolean;
}

/**
 * Data row definition for the nb-table.
 * Captures the data row's template and other properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
@Directive({
  selector: '[nbRowDef]',
  providers: [{ provide: CdkRowDef, useExisting: NbRowDefDirective }],
})
export class NbRowDefDirective<T> extends CdkRowDef<T> {
  @Input('nbRowDefColumns') columns: Iterable<string>;
  @Input('nbRowDefWhen') when: (index: number, rowData: T) => boolean;
}

/** Footer template container that contains the cell outlet. Adds the right class and role. */
@Component({
  selector: 'nb-header-row, tr[nbHeaderRow]',
  template: `
    <ng-container cdkCellOutlet></ng-container>`,
  host: {
    'class': 'nb-header-row',
    'role': 'row',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: CdkHeaderRow, useExisting: NbHeaderRowComponent }],
})
export class NbHeaderRowComponent extends CdkHeaderRow {
}

/** Footer template container that contains the cell outlet. Adds the right class and role. */
@Component({
  selector: 'nb-footer-row, tr[nbFooterRow]',
  template: `
    <ng-container cdkCellOutlet></ng-container>`,
  host: {
    'class': 'nb-footer-row',
    'role': 'row',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: CdkFooterRow, useExisting: NbFooterRowComponent }],
})
export class NbFooterRowComponent extends CdkFooterRow {
}

/** Data row template container that contains the cell outlet. Adds the right class and role. */
@Component({
  selector: 'nb-row, tr[nbRow]',
  template: `
    <ng-container cdkCellOutlet></ng-container>`,
  host: {
    'class': 'nb-row',
    'role': 'row',
  },
  providers: [{ provide: CdkRow, useExisting: NbRowComponent }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbRowComponent extends CdkRow {
}
