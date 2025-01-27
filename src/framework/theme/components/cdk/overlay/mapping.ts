import { Directive, Injectable, ModuleWithProviders, NgModule, TemplateRef, ViewContainerRef } from '@angular/core';
import {
  CdkPortal,
  CdkPortalOutlet,
  ComponentPortal,
  Portal,
  PortalInjector,
  PortalModule,
  TemplatePortal,
} from '@angular/cdk/portal';
import {
  ComponentType,
  ConnectedOverlayPositionChange,
  ConnectedPosition,
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayContainer,
  OverlayModule,
  OverlayPositionBuilder,
  OverlayRef,
  PositionStrategy,
  ScrollStrategy,
} from '@angular/cdk/overlay';
import { NbScrollStrategyOptions } from '../adapter/block-scroll-strategy-adapter';

@Directive({
  selector: '[nbPortal]',
  standalone: false,
})
export class NbPortalDirective extends CdkPortal {}

@Directive({
  selector: '[nbPortalOutlet]',
  standalone: false,
})
export class NbPortalOutletDirective extends CdkPortalOutlet {}

export class NbComponentPortal<T = any> extends ComponentPortal<T> {}

@Injectable()
export class NbOverlay extends Overlay {
  scrollStrategies: NbScrollStrategyOptions;
}

@Injectable()
export class NbOverlayPositionBuilder extends OverlayPositionBuilder {}

export class NbTemplatePortal<T = any> extends TemplatePortal<T> {
  constructor(template: TemplateRef<T>, viewContainerRef?: ViewContainerRef, context?: T) {
    super(template, viewContainerRef, context);
  }
}

@Injectable()
export class NbOverlayContainer extends OverlayContainer {}

export class NbFlexibleConnectedPositionStrategy extends FlexibleConnectedPositionStrategy {}

export class NbPortalInjector extends PortalInjector {}

export type NbPortal<T = any> = Portal<T>;
export type NbOverlayRef = OverlayRef;
export type NbComponentType<T = any> = ComponentType<T>;
export type NbPositionStrategy = PositionStrategy;
export type NbConnectedPosition = ConnectedPosition;
export type NbConnectedOverlayPositionChange = ConnectedOverlayPositionChange;
export type NbConnectionPositionPair = ConnectionPositionPair;
export type NbOverlayConfig = OverlayConfig;
export type NbScrollStrategy = ScrollStrategy;

const CDK_MODULES = [OverlayModule, PortalModule];

/**
 * This module helps us to keep all angular/cdk deps inside our cdk module via providing aliases.
 * Approach will help us move cdk in separate npm package and refactor nebular/theme code.
 * */
@NgModule({
  imports: [...CDK_MODULES],
  exports: [...CDK_MODULES, NbPortalDirective, NbPortalOutletDirective],
  declarations: [NbPortalDirective, NbPortalOutletDirective],
})
export class NbCdkMappingModule {
  static forRoot(): ModuleWithProviders<NbCdkMappingModule> {
    return {
      ngModule: NbCdkMappingModule,
      providers: [NbOverlay, NbOverlayPositionBuilder],
    };
  }
}
