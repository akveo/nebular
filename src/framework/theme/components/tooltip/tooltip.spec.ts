import { Component, ElementRef, Input, NgModule, Type, ViewChild } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { NbThemeModule } from '../../theme.module';
import { NbLayoutModule } from '../layout/layout.module';
import { NbAdjustment, NbPosition } from '../cdk/overlay/overlay-position';
import { NbDynamicOverlayHandler } from '../cdk/overlay/dynamic/dynamic-overlay-handler';
import { NbOverlayContent } from '../cdk/overlay/overlay-service';
import { NbRenderableContainer } from '../cdk/overlay/overlay-container';
import { NbTrigger } from '../cdk/overlay/overlay-trigger';
import { NbTooltipDirective } from './tooltip.directive';
import { NbTooltipModule } from './tooltip.module';
import { NbTooltipComponent } from './tooltip.component';
import { NbIconLibraries } from '../icon/icon-libraries';
import { Subject } from 'rxjs';
import createSpy = jasmine.createSpy;
import { NbOverlayConfig } from '@nebular/theme/components/cdk/overlay/mapping';

@Component({
  selector: 'nb-tooltip-default-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <button #button nbTooltip="test">show tooltip</button>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbTooltipDefaultTestComponent {
  @ViewChild('button', { static: false }) button: ElementRef;
  @ViewChild(NbTooltipDirective, { static: false }) tooltip: NbTooltipDirective;
}

@Component({
  selector: 'nb-tooltip-bindings-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <button #button [nbTooltip]="content"
          [nbTooltipTrigger]="trigger"
          [nbTooltipPlacement]="position"
          [nbTooltipAdjustment]="adjustment"
          [nbTooltipStatus]="status"
          [nbTooltipIcon]="icon"
          [nbTooltipClass]="tooltipClass">
        </button>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbTooltipBindingsTestComponent {
  @ViewChild(NbTooltipDirective, { static: false }) tooltip: NbTooltipDirective;
  @ViewChild('button', { static: false }) button: ElementRef;
  @Input() content: any = '';
  @Input() status = 'primary';
  @Input() icon = '';
  @Input() trigger = NbTrigger.CLICK;
  @Input() position = NbPosition.TOP;
  @Input() adjustment = NbAdjustment.CLOCKWISE;
  tooltipClass = '';
}

@Component({
  selector: 'nb-tooltip-instance-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <button #button nbTooltip="test"></button>
      </nb-layout-column>
    </nb-layout>

    <ng-template>Some Template</ng-template>
  `,
})
export class NbTooltipInstanceTestComponent {
  @ViewChild(NbTooltipDirective, { static: false }) tooltip: NbTooltipDirective;
  @ViewChild('button', { static: false }) button: ElementRef;
}

const dynamicOverlayIsShow$ = new Subject();
const dynamicOverlay = {
  show() {},
  hide() {},
  toggle() {},
  destroy() {},
  isShown: dynamicOverlayIsShow$,
};

export class NbDynamicOverlayHandlerMock {
  _componentType: Type<NbRenderableContainer>;
  _host: ElementRef;
  _context: Object = {};
  _content: NbOverlayContent;
  _trigger: NbTrigger = NbTrigger.NOOP;
  _position: NbPosition = NbPosition.TOP;
  _adjustment: NbAdjustment = NbAdjustment.NOOP;
  _offset: number;
  _overlayConfig: NbOverlayConfig = {};

  constructor() {
  }

  host(host: ElementRef) {
    this._host = host;
    return this;
  }

  trigger(trigger: NbTrigger) {
    this._trigger = trigger;
    return this;
  }

  position(position: NbPosition) {
    this._position = position;
    return this;
  }

  adjustment(adjustment: NbAdjustment) {
    this._adjustment = adjustment;
    return this;
  }

  componentType(componentType: Type<NbRenderableContainer>) {
    this._componentType = componentType;
    return this;
  }

  content(content: NbOverlayContent) {
    this._content = content;
    return this;
  }

  context(context: {}) {
    this._context = context;
    return this;
  }

  offset(offset: number) {
    this._offset = offset;
    return this;
  }

  overlayConfig(overlayConfig: NbOverlayConfig) {
    this._overlayConfig = overlayConfig;
    return this;
  }

  build() {
    return dynamicOverlay;
  }

  rebuild() {
    return dynamicOverlay;
  }

  connect() {
  }

  disconnect() {
  }

  destroy() {
  }
}

const TEST_COMPONENTS = [
  NbTooltipDefaultTestComponent,
  NbTooltipBindingsTestComponent,
  NbTooltipInstanceTestComponent,
];

@NgModule({
  imports: [NbLayoutModule, NbTooltipModule],
  exports: [...TEST_COMPONENTS],
  declarations: [...TEST_COMPONENTS],
})
class PopoverTestModule { }

describe('Directive: NbTooltipDirective', () => {

  const overlayHandler = new NbDynamicOverlayHandlerMock();

  beforeEach(async(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([]),
        NbThemeModule.forRoot(),
        PopoverTestModule,
      ],
    });

    const iconLibs: NbIconLibraries = TestBed.get(NbIconLibraries);
    iconLibs.registerSvgPack('test', { 'some-icon': '<svg>some-icon</svg>' });
    iconLibs.setDefaultPack('test')
  }));

  describe('smoke ', () => {

    let fixture: ComponentFixture<any>;

    afterEach(() => {
      fixture.destroy();
    });


    it('should render string', () => {
      fixture = TestBed.createComponent(NbTooltipDefaultTestComponent);
      fixture.detectChanges();
      fixture.componentInstance.tooltip.show();
      fixture.detectChanges();

      const textContainer = fixture.nativeElement.querySelector('nb-tooltip .content span');
      expect(textContainer.textContent).toContain('test');
    });

    it('should hide', () => fakeAsync(() => {
      fixture = TestBed.createComponent(NbTooltipDefaultTestComponent);
      fixture.detectChanges();
      fixture.componentInstance.tooltip.show();
      fixture.detectChanges();


      const textContainer = fixture.nativeElement.querySelector('nb-tooltip .content span');
      expect(textContainer.textContent).toContain('test');
      fixture.componentInstance.tooltip.hide();
      fixture.detectChanges();

      tick(); // we need this tick for animations
      const tooltip = fixture.nativeElement.querySelector('nb-tooltip');
      expect(tooltip).toBeNull();
    }));

    it('should render different content', () => {
      fixture = TestBed.createComponent(NbTooltipDefaultTestComponent);
      fixture.detectChanges();

      fixture.componentInstance.tooltip.show();
      fixture.detectChanges();

      fixture.componentInstance.content = 'new string';
      fixture.detectChanges();
      const textContainer = fixture.nativeElement.querySelector('nb-tooltip .content span');
      expect(textContainer.textContent).toContain('test');
    });

    it('should display icon', () => {
      fixture = TestBed.createComponent(NbTooltipBindingsTestComponent);
      fixture.detectChanges();

      fixture.componentInstance.icon = 'some-icon';
      fixture.detectChanges();
      fixture.componentInstance.tooltip.show();
      fixture.detectChanges();

      const iconContainer = fixture.nativeElement.querySelector('nb-tooltip .content nb-icon');
      expect(iconContainer.textContent).toContain('some-icon');
    });

    it('should display status', () => {
      fixture = TestBed.createComponent(NbTooltipBindingsTestComponent);
      fixture.detectChanges();

      fixture.componentInstance.status = 'danger';
      fixture.detectChanges();
      fixture.componentInstance.tooltip.show();
      fixture.detectChanges();

      const iconContainer = fixture.nativeElement.querySelector('nb-tooltip');
      expect(iconContainer.className).toContain('status-danger');
    });

    it('should emit show state change event when shows up', () => {
      fixture = TestBed.createComponent(NbTooltipDefaultTestComponent);
      fixture.detectChanges();
      const tooltip: NbTooltipDirective = fixture.componentInstance.tooltip;

      const stateChangeSpy = createSpy('stateChangeSpy');
      tooltip.nbTooltipShowStateChange.subscribe(stateChangeSpy);

      tooltip.show();
      fixture.detectChanges();

      expect(stateChangeSpy).toHaveBeenCalledTimes(1);
      expect(stateChangeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ isShown: true }));
    });

    it('should emit show state change event when hides', () => {
      fixture = TestBed.createComponent(NbTooltipDefaultTestComponent);
      fixture.detectChanges();
      const tooltip: NbTooltipDirective = fixture.componentInstance.tooltip;
      tooltip.show();
      fixture.detectChanges();

      const stateChangeSpy = createSpy('stateChangeSpy');
      tooltip.nbTooltipShowStateChange.subscribe(stateChangeSpy);

      tooltip.hide();
      fixture.detectChanges();

      expect(stateChangeSpy).toHaveBeenCalledTimes(1);
      expect(stateChangeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ isShown: false }));
    });

    it('should set isShown to false when hidden', () => {
      fixture = TestBed.createComponent(NbTooltipDefaultTestComponent);
      fixture.detectChanges();
      const tooltip: NbTooltipDirective = fixture.componentInstance.tooltip;

      expect(tooltip.isShown).toEqual(false);
    });

    it('should set isShown to true when shown', () => {
      fixture = TestBed.createComponent(NbTooltipDefaultTestComponent);
      fixture.detectChanges();
      const tooltip: NbTooltipDirective = fixture.componentInstance.tooltip;
      tooltip.show();
      fixture.detectChanges();

      expect(tooltip.isShown).toEqual(true);
    });

  });

  describe('mocked services', () => {

    beforeEach(async(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([]),
          NbThemeModule.forRoot(),
          PopoverTestModule,
        ],
      })
        .overrideComponent(NbTooltipDirective, {
          set: {
            providers: [
              { provide: NbDynamicOverlayHandler, useValue: overlayHandler },
            ],
          },
        });
    }));
    describe('default tooltip', () => {

      let fixture: ComponentFixture<NbTooltipDefaultTestComponent>;

      afterEach(() => {
        fixture.destroy();
      });

      it('should build', () => {
        const componentSpy = spyOn(overlayHandler, 'componentType').and.callThrough();
        const hostSpy = spyOn(overlayHandler, 'host').and.callThrough();
        const positionSpy = spyOn(overlayHandler, 'position').and.callThrough();
        const triggerSpy = spyOn(overlayHandler, 'trigger').and.callThrough();
        const adjustmentSpy = spyOn(overlayHandler, 'adjustment').and.callThrough();
        const contentSpy = spyOn(overlayHandler, 'content').and.callThrough();
        const contextSpy = spyOn(overlayHandler, 'context').and.callThrough();
        const offsetSpy = spyOn(overlayHandler, 'offset').and.callThrough();
        const buildSpy = spyOn(overlayHandler, 'build').and.callThrough();
        const rebuildSpy = spyOn(overlayHandler, 'rebuild').and.callThrough();

        fixture = TestBed.createComponent(NbTooltipDefaultTestComponent);
        fixture.detectChanges();

        expect(componentSpy).toHaveBeenCalledTimes(1);
        expect(componentSpy).toHaveBeenCalledWith(NbTooltipComponent);
        expect(hostSpy).toHaveBeenCalledWith(fixture.componentInstance.button);
        expect(hostSpy).toHaveBeenCalledTimes(1);
        expect(offsetSpy).toHaveBeenCalledTimes(1);
        expect(offsetSpy).toHaveBeenCalledWith(8);
        expect(positionSpy).toHaveBeenCalledTimes(2);
        expect(positionSpy).toHaveBeenCalledWith(NbPosition.TOP);
        expect(triggerSpy).toHaveBeenCalledTimes(2);
        expect(triggerSpy).toHaveBeenCalledWith(NbTrigger.HINT);
        expect(adjustmentSpy).toHaveBeenCalledTimes(2);
        expect(adjustmentSpy).toHaveBeenCalledWith(NbAdjustment.CLOCKWISE);
        expect(contentSpy).toHaveBeenCalledTimes(2);
        expect(contentSpy).toHaveBeenCalledWith('test');
        expect(contextSpy).toHaveBeenCalledTimes(2);
        expect(contextSpy).toHaveBeenCalledWith({});
        expect(buildSpy).toHaveBeenCalledTimes(1);
        expect(rebuildSpy).toHaveBeenCalledTimes(1);
      });

      it('should show/hide/toggle', () => {
        fixture = TestBed.createComponent(NbTooltipDefaultTestComponent);
        fixture.detectChanges();
        const showSpy = spyOn(dynamicOverlay, 'show').and.callThrough();
        const hideSpy = spyOn(dynamicOverlay, 'hide').and.callThrough();
        const toggleSpy = spyOn(dynamicOverlay, 'toggle').and.callThrough();

        fixture.componentInstance.tooltip.show();
        fixture.detectChanges();

        expect(showSpy).toHaveBeenCalledTimes(1);
        expect(hideSpy).toHaveBeenCalledTimes(0);
        expect(toggleSpy).toHaveBeenCalledTimes(0);

        fixture.componentInstance.tooltip.hide();
        fixture.detectChanges();

        expect(showSpy).toHaveBeenCalledTimes(1);
        expect(hideSpy).toHaveBeenCalledTimes(1);
        expect(toggleSpy).toHaveBeenCalledTimes(0);


        fixture.componentInstance.tooltip.toggle();
        fixture.detectChanges();

        expect(showSpy).toHaveBeenCalledTimes(1);
        expect(hideSpy).toHaveBeenCalledTimes(1);
        expect(toggleSpy).toHaveBeenCalledTimes(1);
      });
    });

    describe('binding tooltip', () => {

      let fixture: ComponentFixture<NbTooltipBindingsTestComponent>;

      afterEach(() => {
        fixture.destroy();
      });

      it('should rebuild', () => {

        const componentSpy = spyOn(overlayHandler, 'componentType').and.callThrough();
        const hostSpy = spyOn(overlayHandler, 'host').and.callThrough();
        const positionSpy = spyOn(overlayHandler, 'position').and.callThrough();
        const triggerSpy = spyOn(overlayHandler, 'trigger').and.callThrough();
        const adjustmentSpy = spyOn(overlayHandler, 'adjustment').and.callThrough();
        const contentSpy = spyOn(overlayHandler, 'content').and.callThrough();
        const contextSpy = spyOn(overlayHandler, 'context').and.callThrough();
        const offsetSpy = spyOn(overlayHandler, 'offset').and.callThrough();
        const buildSpy = spyOn(overlayHandler, 'build').and.callThrough();
        const rebuildSpy = spyOn(overlayHandler, 'rebuild').and.callThrough();

        fixture = TestBed.createComponent(NbTooltipBindingsTestComponent);
        fixture.detectChanges();

        fixture.componentInstance.adjustment = NbAdjustment.HORIZONTAL;
        fixture.componentInstance.trigger = NbTrigger.CLICK;
        fixture.componentInstance.content = 'new string';
        fixture.componentInstance.status = 'success';
        fixture.componentInstance.icon = 'home';
        fixture.componentInstance.position = NbPosition.LEFT;

        fixture.detectChanges();

        expect(componentSpy).toHaveBeenCalledTimes(1);
        expect(componentSpy).toHaveBeenCalledWith(NbTooltipComponent);
        expect(hostSpy).toHaveBeenCalledWith(fixture.componentInstance.button);
        expect(hostSpy).toHaveBeenCalledTimes(1);
        expect(offsetSpy).toHaveBeenCalledTimes(1);
        expect(offsetSpy).toHaveBeenCalledWith(8);
        expect(positionSpy).toHaveBeenCalledTimes(3);
        expect(positionSpy).toHaveBeenCalledWith(NbPosition.LEFT);
        expect(triggerSpy).toHaveBeenCalledTimes(3);
        expect(triggerSpy).toHaveBeenCalledWith(NbTrigger.CLICK);
        expect(adjustmentSpy).toHaveBeenCalledTimes(3);
        expect(adjustmentSpy).toHaveBeenCalledWith(NbAdjustment.HORIZONTAL);
        expect(contentSpy).toHaveBeenCalledTimes(3);
        expect(contentSpy).toHaveBeenCalledWith('new string');
        expect(contextSpy).toHaveBeenCalledTimes(3);
        expect(contextSpy).toHaveBeenCalledWith({ status: 'success', icon: 'home' });
        expect(buildSpy).toHaveBeenCalledTimes(1);
        expect(rebuildSpy).toHaveBeenCalledTimes(2);
      });

      it('should accept different content', () => {
        const contentSpy = spyOn(overlayHandler, 'content').and.callThrough();

        fixture = TestBed.createComponent(NbTooltipBindingsTestComponent);
        fixture.detectChanges();

        fixture.componentInstance.content = 'new string';
        fixture.detectChanges();
        expect(contentSpy).toHaveBeenCalledTimes(3);
        expect(contentSpy).toHaveBeenCalledWith('new string');
      });

      it('should set overlay config', () => {
        const tooltipClass = 'custom-popover-class';
        const overlayConfigSpy = spyOn(overlayHandler, 'overlayConfig').and.callThrough();

        fixture = TestBed.createComponent(NbTooltipBindingsTestComponent);
        fixture.componentInstance.tooltipClass = tooltipClass;
        fixture.detectChanges();

        expect(overlayConfigSpy).toHaveBeenCalledWith(jasmine.objectContaining({ panelClass: tooltipClass }));
      });
    });

    describe('instance tooltip', () => {

      let fixture: ComponentFixture<NbTooltipInstanceTestComponent>;

      afterEach(() => {
        fixture.destroy();
      });

      it('should rebuild', () => {

        const componentSpy = spyOn(overlayHandler, 'componentType').and.callThrough();
        const hostSpy = spyOn(overlayHandler, 'host').and.callThrough();
        const positionSpy = spyOn(overlayHandler, 'position').and.callThrough();
        const triggerSpy = spyOn(overlayHandler, 'trigger').and.callThrough();
        const adjustmentSpy = spyOn(overlayHandler, 'adjustment').and.callThrough();
        const contentSpy = spyOn(overlayHandler, 'content').and.callThrough();
        const contextSpy = spyOn(overlayHandler, 'context').and.callThrough();
        const offsetSpy = spyOn(overlayHandler, 'offset').and.callThrough();
        const buildSpy = spyOn(overlayHandler, 'build').and.callThrough();
        const rebuildSpy = spyOn(overlayHandler, 'rebuild').and.callThrough();

        fixture = TestBed.createComponent(NbTooltipInstanceTestComponent);
        fixture.detectChanges();

        fixture.componentInstance.tooltip.adjustment = NbAdjustment.HORIZONTAL;
        fixture.componentInstance.tooltip.trigger = NbTrigger.CLICK;
        fixture.componentInstance.tooltip.content = 'new string';
        fixture.componentInstance.tooltip.status = 'success';
        fixture.componentInstance.tooltip.icon = 'home';
        fixture.componentInstance.tooltip.position = NbPosition.LEFT;

        fixture.componentInstance.tooltip.rebuild();

        expect(componentSpy).toHaveBeenCalledTimes(1);
        expect(componentSpy).toHaveBeenCalledWith(NbTooltipComponent);
        expect(hostSpy).toHaveBeenCalledWith(fixture.componentInstance.button);
        expect(hostSpy).toHaveBeenCalledTimes(1);
        expect(positionSpy).toHaveBeenCalledTimes(3);
        expect(positionSpy).toHaveBeenCalledWith(NbPosition.LEFT);
        expect(triggerSpy).toHaveBeenCalledTimes(3);
        expect(triggerSpy).toHaveBeenCalledWith(NbTrigger.CLICK);
        expect(offsetSpy).toHaveBeenCalledTimes(1);
        expect(offsetSpy).toHaveBeenCalledWith(8);
        expect(adjustmentSpy).toHaveBeenCalledTimes(3);
        expect(adjustmentSpy).toHaveBeenCalledWith(NbAdjustment.HORIZONTAL);
        expect(contentSpy).toHaveBeenCalledTimes(3);
        expect(contentSpy).toHaveBeenCalledWith('new string');
        expect(contextSpy).toHaveBeenCalledTimes(3);
        expect(contextSpy).toHaveBeenCalledWith({ status: 'success', icon: 'home' });
        expect(buildSpy).toHaveBeenCalledTimes(1);
        expect(rebuildSpy).toHaveBeenCalledTimes(2);
      });

    });
  });
});
