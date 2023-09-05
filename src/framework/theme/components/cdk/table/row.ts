import { Component, Directive, HostBinding, Input } from '@angular/core';
import {
  CdkFooterRow,
  CdkFooterRowDef,
  CdkHeaderRow,
  CdkHeaderRowDef,
  CdkRow,
  CdkRowDef,
  CdkCellOutlet,
  DataRowOutlet,
  HeaderRowOutlet,
  FooterRowOutlet,
  NoDataRowOutlet,
} from '@angular/cdk/table';

@Directive({
  selector: '[nbRowOutlet]',
  providers: [{ provide: DataRowOutlet, useExisting: NbDataRowOutletDirective }],
})
export class NbDataRowOutletDirective extends DataRowOutlet {}

@Directive({
  selector: '[nbHeaderRowOutlet]',
  providers: [{ provide: HeaderRowOutlet, useExisting: NbHeaderRowOutletDirective }],
})
export class NbHeaderRowOutletDirective extends HeaderRowOutlet {}

@Directive({
  selector: '[nbFooterRowOutlet]',
  providers: [{ provide: FooterRowOutlet, useExisting: NbFooterRowOutletDirective }],
})
export class NbFooterRowOutletDirective extends FooterRowOutlet {}

@Directive({
  selector: '[nbNoDataRowOutlet]',
  providers: [{ provide: NoDataRowOutlet, useExisting: NbNoDataRowOutletDirective }],
})
export class NbNoDataRowOutletDirective extends NoDataRowOutlet {}

@Directive({
  selector: '[nbCellOutlet]',
  providers: [{ provide: CdkCellOutlet, useExisting: NbCellOutletDirective }],
})
export class NbCellOutletDirective extends CdkCellOutlet {}

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
  template: ` <ng-container nbCellOutlet></ng-container>`,
  providers: [{ provide: CdkHeaderRow, useExisting: NbHeaderRowComponent }],
})
export class NbHeaderRowComponent extends CdkHeaderRow {
  @HostBinding('class.nb-header-row') protected hasNbHeaderRowClass = true;
  @HostBinding('attr.role') protected roleAttribute = 'row';
}

/** Footer template container that contains the cell outlet. Adds the right class and role. */
@Component({
  selector: 'nb-footer-row, tr[nbFooterRow]',
  template: ` <ng-container nbCellOutlet></ng-container>`,
  providers: [{ provide: CdkFooterRow, useExisting: NbFooterRowComponent }],
})
export class NbFooterRowComponent extends CdkFooterRow {
  @HostBinding('class.nb-footer-row') protected hasNbFooterRowClass = true;
  @HostBinding('attr.role') protected roleAttribute = 'row';
}

/** Data row template container that contains the cell outlet. Adds the right class and role. */
@Component({
  selector: 'nb-row, tr[nbRow]',
  template: ` <ng-container nbCellOutlet></ng-container>`,
  providers: [{ provide: CdkRow, useExisting: NbRowComponent }],
})
export class NbRowComponent extends CdkRow {
  @HostBinding('class.nb-row') protected hasNbRowClass = true;
  @HostBinding('attr.role') protected roleAttribute = 'row';
}
