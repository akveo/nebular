import { Directive, Input } from '@angular/core';
import { NbCdkRowDef, NbRowDefDirective } from '../cdk/table';

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
