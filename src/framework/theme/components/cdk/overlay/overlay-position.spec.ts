import { TestBed } from '@angular/core/testing';
import { Component, NgModule } from '@angular/core';
import {
  NbThemeModule,
  NbOverlayModule,
  NbPositionBuilderService,
  NbOverlayService,
  NbComponentPortal,
  NbLayoutModule, NbLayoutComponent,
} from '@nebular/theme';
import {
  NbAdjustableConnectedPositionStrategy,
  NbPosition,
  NbAdjustment,
} from '@nebular/theme/components/cdk/overlay/overlay-position';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  template: `portal-component`,
})
export class PortalComponent {}

@NgModule({
  declarations: [ PortalComponent ],
  exports: [ PortalComponent ],
  entryComponents: [ PortalComponent ],
})
export class PortalModule {}

describe('NbAdjustableConnectedPositionStrategy', () => {
  let strategy: NbAdjustableConnectedPositionStrategy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NbThemeModule.forRoot(),
        NbOverlayModule.forRoot(),
        NbLayoutModule,
        PortalModule,
        RouterTestingModule.withRoutes([]),
      ],
    });

    // Have to create layout component as it's required for scroll service to work properly.
    // Also it registers overlay container so we don't have to create it manually.
    TestBed.createComponent(NbLayoutComponent);

    const hostElement = document.createElement('div');
    hostElement.style.width = '10px';
    hostElement.style.height = '10px';
    hostElement.style.backgroundColor = 'red';
    document.body.appendChild(hostElement);

    const positionBuilderService: NbPositionBuilderService = TestBed.get(NbPositionBuilderService);
    strategy = positionBuilderService.connectedTo({ nativeElement: hostElement });
  });

  it('should create strategy with position start and adjustment noop', () => {
    const withPositionsSpy = spyOn(strategy, 'withPositions').and.callThrough();

    strategy.position(NbPosition.START).adjustment(NbAdjustment.NOOP);

    const overlayService: NbOverlayService = TestBed.get(NbOverlayService);
    const overlayRef = overlayService.create({ positionStrategy: strategy });
    overlayRef.attach(new NbComponentPortal(PortalComponent));

    expect(withPositionsSpy).toHaveBeenCalledTimes(1);
    expect(withPositionsSpy).toHaveBeenCalledWith(jasmine.objectContaining([{
      originX: 'start',
      originY: 'center',
      overlayX: 'end',
      overlayY: 'center',
      offsetX: -15,
    }]));
  });

  it('should create strategy with position end and adjustment noop', () => {
    const withPositionsSpy = spyOn(strategy, 'withPositions').and.callThrough();

    strategy.position(NbPosition.END).adjustment(NbAdjustment.NOOP);

    const overlayService: NbOverlayService = TestBed.get(NbOverlayService);
    const overlayRef = overlayService.create({ positionStrategy: strategy });
    overlayRef.attach(new NbComponentPortal(PortalComponent));

    expect(withPositionsSpy).toHaveBeenCalledTimes(1);
    expect(withPositionsSpy).toHaveBeenCalledWith(jasmine.objectContaining([{
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center',
      offsetX: 15,
    }]));
  });

  it('should apply center positions first', () => {
    const withPositionsSpy = spyOn(strategy, 'withPositions').and.callThrough();

    strategy.position(NbPosition.START).adjustment(NbAdjustment.CLOCKWISE);

    const overlayService: NbOverlayService = TestBed.get(NbOverlayService);
    const overlayRef = overlayService.create({ positionStrategy: strategy });
    overlayRef.attach(new NbComponentPortal(PortalComponent));

    expect(withPositionsSpy).toHaveBeenCalledWith(jasmine.objectContaining([
      { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -15 },
      { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top', offsetX: -15 },
      { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'bottom', offsetX: -15 },
      { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -15 },
      { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -15 },
      { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -15 },
      { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 15 },
      { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'bottom', offsetX: 15 },
      { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top', offsetX: 15 },
      { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: 15 },
      { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 15 },
      { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 15 },
    ]));
  });

  it('should map left position to start', () => {
    const withPositionsSpy = spyOn(strategy, 'withPositions').and.callThrough();

    strategy.position(NbPosition.LEFT).adjustment(NbAdjustment.HORIZONTAL);

    const overlayService: NbOverlayService = TestBed.get(NbOverlayService);
    const overlayRef = overlayService.create({ positionStrategy: strategy });
    overlayRef.attach(new NbComponentPortal(PortalComponent));

    expect(withPositionsSpy).toHaveBeenCalledWith(jasmine.objectContaining([
      { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -15 },
      { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 15 },
    ]));
  });

  it('should map right position to end', () => {
    const withPositionsSpy = spyOn(strategy, 'withPositions').and.callThrough();

    strategy.position(NbPosition.RIGHT).adjustment(NbAdjustment.HORIZONTAL);

    const overlayService: NbOverlayService = TestBed.get(NbOverlayService);
    const overlayRef = overlayService.create({ positionStrategy: strategy });
    overlayRef.attach(new NbComponentPortal(PortalComponent));

    expect(withPositionsSpy).toHaveBeenCalledWith(jasmine.objectContaining([
      { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: 15 },
      { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -15 },
    ]));
  });
});
