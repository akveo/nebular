import { Directive, Input } from '@angular/core';
import { NbCdkRowDef, NbRowDefDirective } from '../cdk/table';

@Directive({
  selector: '[nbTreeGridRowDef]',
  providers: [{ provide: NbCdkRowDef, useExisting: NbTreeGridRowDefDirective }],
})
export class NbTreeGridRowDefDirective<T> extends NbRowDefDirective<T> {
  @Input('nbTreeGridRowDefColumns') columns: Iterable<string>;
  @Input('nbTreeGridRowDefWhen') when: (index: number, rowData: T) => boolean;
}
