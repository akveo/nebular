import { Component, InjectionToken, NgModule, Provider } from '@angular/core';
import { CdkTable, CdkTableModule } from '@angular/cdk/table';
import { ViewportRuler } from '@angular/cdk/scrolling';

import { NbBidiModule } from '../bidi/bidi.module';
import { NbViewportRulerAdapter } from '../adapter/viewport-ruler-adapter';
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
  NbNoDataRowOutletDirective,
} from './row';

export const NB_TABLE_TEMPLATE = `
  <ng-container nbHeaderRowOutlet></ng-container>
  <ng-container nbRowOutlet></ng-container>
  <ng-container nbNoDataRowOutlet></ng-container>
  <ng-container nbFooterRowOutlet></ng-container>
`;

/** @deprecated CDK 22 selects its view repeater strategy internally. */
export const NB_VIEW_REPEATER_STRATEGY = new InjectionToken('_VIEW_REPEATER_STRATEGY');

export const NB_TABLE_PROVIDERS: Provider[] = [{ provide: ViewportRuler, useExisting: NbViewportRulerAdapter }];

@Component({
  selector: 'nb-table-not-implemented',
  template: ``,
  providers: NB_TABLE_PROVIDERS,
  standalone: false,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class NbTable<T> extends CdkTable<T> {}

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
  NbNoDataRowOutletDirective,
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
  imports: [NbBidiModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class NbTableModule extends CdkTableModule {}
