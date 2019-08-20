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
});
