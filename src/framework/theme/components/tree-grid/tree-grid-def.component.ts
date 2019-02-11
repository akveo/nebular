import { Directive, Input } from '@angular/core';
import {
  NbCdkCellDef,
  NbCdkFooterCellDef,
  NbCdkFooterRowDef,
  NbCdkHeaderCellDef,
  NbCdkHeaderRowDef,
  NbCdkRowDef,
  NbCellDefDirective,
  NbFooterCellDefDirective,
  NbFooterRowDefDirective,
  NbHeaderCellDefDirective,
  NbHeaderRowDefDirective,
  NbRowDefDirective,
} from '../cdk/table';

/**
 * Data row definition for the tree-grid.
 * Captures the header row's template and columns to display.
 */
@Directive({
  selector: '[nbTreeGridRowDef]',
  providers: [{ provide: NbCdkRowDef, useExisting: NbTreeGridRowDefDirective }],
})
export class NbTreeGridRowDefDirective<T> extends NbRowDefDirective<T> {
  /**
   * Columns to be displayed on this row
   */
  @Input('nbTreeGridRowDefColumns') columns: Iterable<string>;
}

@Directive({
  selector: '[nbTreeGridHeaderRowDef]',
  providers: [{ provide: NbCdkHeaderRowDef, useExisting: NbTreeGridHeaderRowDefDirective }],
})
export class NbTreeGridHeaderRowDefDirective extends NbHeaderRowDefDirective {
  /**
   * Columns to be displayed on this row
   */
  @Input('nbTreeGridHeaderRowDef') columns: Iterable<string>;
}

@Directive({
  selector: '[nbTreeGridFooterRowDef]',
  providers: [{ provide: NbCdkFooterRowDef, useExisting: NbTreeGridFooterRowDefDirective }],
})
export class NbTreeGridFooterRowDefDirective extends NbFooterRowDefDirective {
  /**
   * Columns to be displayed on this row
   */
  @Input('nbTreeGridFooterRowDef') columns: Iterable<string>;
}

/**
 * Cell definition for a nb-table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
@Directive({
  selector: '[nbTreeGridCellDef]',
  providers: [{ provide: NbCdkCellDef, useExisting: NbTreeGridCellDefDirective }],
})
export class NbTreeGridCellDefDirective extends NbCellDefDirective {}

/**
 * Header cell definition for the nb-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
@Directive({
  selector: '[nbTreeGridHeaderCellDef]',
  providers: [{ provide: NbCdkHeaderCellDef, useExisting: NbTreeGridHeaderCellDefDirective }],
})
export class NbTreeGridHeaderCellDefDirective extends NbHeaderCellDefDirective {}

/**
 * Footer cell definition for the nb-table.
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 */
@Directive({
  selector: '[nbTreeGridFooterCellDef]',
  providers: [{ provide: NbCdkFooterCellDef, useExisting: NbTreeGridFooterCellDefDirective }],
})
export class NbTreeGridFooterCellDefDirective extends NbFooterCellDefDirective {}
