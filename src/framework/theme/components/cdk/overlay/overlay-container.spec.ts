import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NbComponentPortal, NbOverlayContainerComponent, NbOverlayModule } from '@nebular/theme';

@Component({
  template: `
    <nb-overlay-container></nb-overlay-container>
  `,
})
export class NbOverlayContainerTestComponent {
  @ViewChild(NbOverlayContainerComponent, { static: false }) overlayContainer: NbOverlayContainerComponent;
}

@Component({
  template: `{{ contextProperty }}`,
})
export class NbOverlayTestComponent implements OnInit {
  contextProperty;

  isFirstOnChangesCall = true;
  contextPropertyValueOnFirstCdRun;
  ngOnInit() {
    if (this.isFirstOnChangesCall) {
      this.contextPropertyValueOnFirstCdRun = this.contextProperty;
      this.isFirstOnChangesCall = false;
    }
  }
}

// Has to define test module since there is no way to specify entry components
// in 'TestBed.configureTestingModule'.
@NgModule({
  imports: [ NbOverlayModule.forRoot() ],
  declarations: [ NbOverlayContainerTestComponent, NbOverlayTestComponent ],
  entryComponents: [ NbOverlayTestComponent ],
})
export class NbOverlayTestModule {}

describe('NbOverlayContainerComponent', () => {
  let fixture: ComponentFixture<NbOverlayContainerTestComponent>;
  let overlayContainer: NbOverlayContainerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [ NbOverlayTestModule ] });

    fixture = TestBed.createComponent(NbOverlayContainerTestComponent);
    fixture.detectChanges();
    overlayContainer = fixture.componentInstance.overlayContainer;
  });

  it('should set context before change detection run', () => {
    const context = { contextProperty: 'contextProperty' };
    const portal: NbComponentPortal<NbOverlayTestComponent> = new NbComponentPortal(NbOverlayTestComponent);
    const portalRef = overlayContainer.attachComponentPortal(portal, context);

    expect(portalRef.instance.contextPropertyValueOnFirstCdRun).toEqual(context.contextProperty);
  });
});
