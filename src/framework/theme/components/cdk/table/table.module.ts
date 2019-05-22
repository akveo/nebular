import { Attribute, ChangeDetectorRef, ElementRef, Inject, IterableDiffers, NgModule } from '@angular/core';
import { CdkTable, CdkTableModule } from '@angular/cdk/table';
import { NbBidiModule } from '../bidi/bidi.module';
import { NbDirectionality } from '../bidi/bidi-service';
import { NbPlatformModule } from '../platform/platform.module';
import { NbPlatform } from '../platform/platform-service';
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

export const NB_TABLE_TEMPLATE = `
  <ng-container nbHeaderRowOutlet></ng-container>
  <ng-container nbRowOutlet></ng-container>
  <ng-container nbFooterRowOutlet></ng-container>`;

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
