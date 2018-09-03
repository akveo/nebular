import { Directive, Injectable, NgModule, TemplateRef, ViewContainerRef } from '@angular/core';
import { CdkPortal, ComponentPortal, Portal, PortalModule, TemplatePortal } from '@angular/cdk/portal';
import {
  ComponentType,
  ConnectedOverlayPositionChange,
  ConnectedPosition,
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategy,
  GlobalPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayContainer,
  OverlayModule,
  OverlayPositionBuilder,
  OverlayRef,
  PositionStrategy, ScrollStrategyOptions,
} from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';


@Directive({ selector: '[nbPortal]' })
export class NbPortalDirective extends CdkPortal {
}

@Injectable()
export class NbOverlay extends Overlay {
}

@Injectable()
export class NbPlatform extends Platform {
}

@Injectable()
export class NbOverlayPositionBuilder extends OverlayPositionBuilder {
}

export class NbComponentPortal<T = any> extends ComponentPortal<T> {
}

export class NbTemplatePortal<T = any> extends TemplatePortal<T> {
  constructor(template: TemplateRef<T>, viewContainerRef?: ViewContainerRef, context?: T) {
    super(template, viewContainerRef, context);
  }
}

export class NbOverlayContainer extends OverlayContainer {
}

export class NbFlexibleConnectedPositionStrategy extends FlexibleConnectedPositionStrategy {
}

export type NbPortal<T = any> = Portal<T>;
export type NbOverlayRef = OverlayRef;
export type NbComponentType<T = any> = ComponentType<T>;
export type NbGlobalPositionStrategy = GlobalPositionStrategy;
export type NbPositionStrategy = PositionStrategy;
export type NbConnectedPosition = ConnectedPosition;
export type NbConnectedOverlayPositionChange = ConnectedOverlayPositionChange;
export type NbConnectionPositionPair = ConnectionPositionPair;
export type NbOverlayConfig = OverlayConfig;
export type NbScrollStrategyOptions = ScrollStrategyOptions;

const CDK_MODULES = [OverlayModule, PortalModule];

const CDK_PROVIDERS = [
  NbOverlay,
  NbPlatform,
  NbOverlayPositionBuilder,
];

/**
 * This module helps us to keep all angular/cdk deps inside our cdk module via providing aliases.
 * Approach will help us move cdk in separate npm package and refactor nebular/theme code.
 * */
@NgModule({
  imports: [...CDK_MODULES],
  exports: [
    ...CDK_MODULES,
    NbPortalDirective,
  ],
  declarations: [NbPortalDirective],
  providers: [...CDK_PROVIDERS],
})
export class NbCdkMappingModule {
}
