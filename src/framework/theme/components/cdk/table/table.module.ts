import {
  Attribute,
  ChangeDetectorRef,
  ElementRef,
  Inject,
  IterableDiffers,
  NgModule,
  Component,
  Optional,
  Provider,
  SkipSelf,
} from '@angular/core';
import {
  _COALESCED_STYLE_SCHEDULER,
  _CoalescedStyleScheduler,
  CdkTable,
  CdkTableModule,
  RenderRow,
  RowContext,
  StickyPositioningListener,
} from '@angular/cdk/table';
import { _DisposeViewRepeaterStrategy, _VIEW_REPEATER_STRATEGY, _ViewRepeater } from '@angular/cdk/collections';

import { NbBidiModule } from '../bidi/bidi.module';
import { NbDirectionality } from '../bidi/bidi-service';
import { NbPlatform } from '../platform/platform-service';
import { NB_DOCUMENT } from '../../../theme.options';
import { NbViewportRulerAdapter } from '../adapter/viewport-ruler-adapter';
import { NB_STICKY_POSITIONING_LISTENER } from '../../cdk/table/type-mappings';
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

export const NB_VIEW_REPEATER_STRATEGY = _VIEW_REPEATER_STRATEGY;
export const NB_COALESCED_STYLE_SCHEDULER = _COALESCED_STYLE_SCHEDULER;

export const NB_TABLE_PROVIDERS: Provider[] = [
  { provide: NB_VIEW_REPEATER_STRATEGY, useClass: _DisposeViewRepeaterStrategy },
  { provide: NB_COALESCED_STYLE_SCHEDULER, useClass: _CoalescedStyleScheduler },
];

@Component({
  selector: 'nb-table-not-implemented',
  template: ``,
  providers: NB_TABLE_PROVIDERS,
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class NbTable<T> extends CdkTable<T> {
  constructor(
    differs: IterableDiffers,
    changeDetectorRef: ChangeDetectorRef,
    elementRef: ElementRef,
    @Attribute('role') role: string,
    dir: NbDirectionality,
    @Inject(NB_DOCUMENT) document: any,
    platform: NbPlatform,
    @Inject(_VIEW_REPEATER_STRATEGY)
    protected readonly _viewRepeater: _ViewRepeater<T, RenderRow<T>, RowContext<T>>,
    @Inject(_COALESCED_STYLE_SCHEDULER)
    protected readonly _coalescedStyleScheduler: _CoalescedStyleScheduler,
    _viewportRuler: NbViewportRulerAdapter,
    @Optional() @SkipSelf() @Inject(NB_STICKY_POSITIONING_LISTENER)
    protected readonly _stickyPositioningListener: StickyPositioningListener,
  ) {
    super(differs, changeDetectorRef, elementRef, role, dir, document, platform, _viewRepeater,
          _coalescedStyleScheduler, _viewportRuler, _stickyPositioningListener);
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
  imports: [ NbBidiModule ],
  declarations: [ ...COMPONENTS ],
  exports: [ ...COMPONENTS ],
})
export class NbTableModule extends CdkTableModule {}
