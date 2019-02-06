import { Directive, Input } from '@angular/core';
import { NbCdkColumnDef, NB_SORT_HEADER_COLUMN_DEF, NbColumnDefDirective } from '../cdk/table';

@Directive({
  selector: '[nbTreeGridColumnDef]',
  providers: [
    { provide: NbCdkColumnDef, useExisting: NbTreeGridColumnDefDirective },
    { provide: NB_SORT_HEADER_COLUMN_DEF, useExisting: NbTreeGridColumnDefDirective },
  ],
})
export class NbTreeGridColumnDefDirective extends NbColumnDefDirective {
  @Input('nbTreeGridColumnDef') name: string;
  @Input() sticky: boolean;
  @Input() stickyEnd: boolean;
}
