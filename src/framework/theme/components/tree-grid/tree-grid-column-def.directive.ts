import { Directive, Input } from '@angular/core';
import { NbCdkColumnDef, NB_SORT_HEADER_COLUMN_DEF, NbColumnDefDirective } from '../cdk/table';

/**
 * Column definition for the tree-grid.
 * Defines a set of cells available for a table column.
 */
@Directive({
  selector: '[nbTreeGridColumnDef]',
  providers: [
    { provide: NbCdkColumnDef, useExisting: NbTreeGridColumnDefDirective },
    { provide: NB_SORT_HEADER_COLUMN_DEF, useExisting: NbTreeGridColumnDefDirective },
  ],
})
export class NbTreeGridColumnDefDirective extends NbColumnDefDirective {
  /**
   * Column name
   */
  @Input('nbTreeGridColumnDef') name: string;
}
