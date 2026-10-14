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
  ProviderToken,
  Type,
  InjectionToken,
} from '@angular/core';
import { CdkTable, CdkTableModule, StickyPositioningListener } from '@angular/cdk/table';
import * as cdkCollections from '@angular/cdk/collections';

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

const CDK_VIEW_REPEATER_STRATEGY: ProviderToken<unknown> | undefined = Reflect.get(
  cdkCollections,
  '_VIEW_REPEATER_STRATEGY',
);
const CDK_DISPOSE_VIEW_REPEATER_STRATEGY: Type<unknown> | undefined = Reflect.get(
  cdkCollections,
  '_DisposeViewRepeaterStrategy',
);

// CDK 21.1 removed its private token. Keep Nebular's exported token while using the CDK token
// on 21.0, where CdkTable still injects it.
export const NB_VIEW_REPEATER_STRATEGY: ProviderToken<unknown> =
  CDK_VIEW_REPEATER_STRATEGY ?? new InjectionToken('_ViewRepeater');

export const NB_TABLE_PROVIDERS: Provider[] =
  CDK_VIEW_REPEATER_STRATEGY && CDK_DISPOSE_VIEW_REPEATER_STRATEGY
    ? [{ provide: NB_VIEW_REPEATER_STRATEGY, useClass: CDK_DISPOSE_VIEW_REPEATER_STRATEGY }]
    : [];

@Component({
  selector: 'nb-table-not-implemented',
  template: ``,
  providers: NB_TABLE_PROVIDERS,
  standalone: false,
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
    _viewportRuler: NbViewportRulerAdapter,
    @Optional()
    @SkipSelf()
    @Inject(NB_STICKY_POSITIONING_LISTENER)
    protected readonly _stickyPositioningListener: StickyPositioningListener,
  ) {
    super(
      differs,
      changeDetectorRef,
      elementRef,
      role,
      dir,
      document,
      platform,
      _viewportRuler,
      _stickyPositioningListener,
    );
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
  imports: [NbBidiModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class NbTableModule extends CdkTableModule {}
