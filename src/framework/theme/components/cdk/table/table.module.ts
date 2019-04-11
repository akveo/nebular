import { Attribute, ChangeDetectorRef, ElementRef, Inject, IterableDiffers, NgModule } from '@angular/core';
import { CdkTable, CdkTableModule } from '@angular/cdk/table';
import { NbBidiModule, NbDirectionality } from '../bidi';
import { NbPlatformModule, NbPlatform } from '../platform';
import { NB_DOCUMENT } from '../../../theme.options';
import {
  NbCellDefDirective,
  NbCellDirective,
  NbColumnDefDirective,
  NbFooterCellDefDirective,
  NbFooterCellDirective,
  NbHeaderCellDefDirective,
  NbHeaderCellDirective,
} from './cell';
import {
  NbCellOutletDirective,
  NbDataRowOutletDirective,
  NbFooterRowOutletDirective,
  NbHeaderRowOutletDirective,
  NbFooterRowComponent,
  NbFooterRowDefDirective,
  NbHeaderRowComponent,
  NbHeaderRowDefDirective,
  NbRowComponent,
  NbRowDefDirective,
} from './row';

export class NbTable<T> extends CdkTable<T> {
  constructor(
    differs: IterableDiffers,
    changeDetectorRef: ChangeDetectorRef,
    elementRef: ElementRef,
    @Attribute('role') role: string,
    dir: NbDirectionality,
    @Inject(NB_DOCUMENT) document: any,
    platform: NbPlatform | undefined,
  ) {
    super(differs, changeDetectorRef, elementRef, role, dir, document, platform);
  }
}

const COMPONENTS = [
  NbTable,

  // Template defs
  NbHeaderCellDefDirective,
  NbHeaderRowDefDirective,
  NbColumnDefDirective,
  NbCellDefDirective,
  NbRowDefDirective,
  NbFooterCellDefDirective,
  NbFooterRowDefDirective,

  // Outlets
  NbDataRowOutletDirective,
  NbHeaderRowOutletDirective,
  NbFooterRowOutletDirective,
  NbCellOutletDirective,

  // Cell directives
  NbHeaderCellDirective,
  NbCellDirective,
  NbFooterCellDirective,

  // Row directives
  NbHeaderRowComponent,
  NbRowComponent,
  NbFooterRowComponent,
];

@NgModule({
  imports: [ NbBidiModule, NbPlatformModule ],
  declarations: [ ...COMPONENTS ],
  exports: [ ...COMPONENTS ],
})
export class NbTableModule extends CdkTableModule {}
