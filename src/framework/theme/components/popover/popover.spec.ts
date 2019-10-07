import { Component, ElementRef, Input, NgModule, TemplateRef, Type, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NbThemeModule } from '../../theme.module';
import { NbLayoutModule } from '../layout/layout.module';
import { NbAdjustment, NbPosition } from '../cdk/overlay/overlay-position';
import { NbDynamicOverlayHandler } from '../cdk/overlay/dynamic/dynamic-overlay-handler';
import { NbOverlayContent } from '../cdk/overlay/overlay-service';
import { NbRenderableContainer } from '../cdk/overlay/overlay-container';
import { NbTrigger } from '../cdk/overlay/overlay-trigger';
import { NbPopoverDirective } from './popover.directive';
import { NbPopoverComponent } from './popover.component';
import { NbPopoverModule } from './popover.module';
import createSpy = jasmine.createSpy;
import { Subject } from 'rxjs';
import { NbOverlayConfig } from '@nebular/theme/components/cdk/overlay/mapping';

@Component({
  selector: 'nb-popover-component-content-test',
  template: 'test, {{ text }}',
})
export class NbPopoverComponentContentTestComponent {
  text: string;
}

@Component({
  selector: 'nb-popover-default-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <button #button nbPopover="test" [nbPopoverClass]="popoverClass">show popover</button>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbPopoverDefaultTestComponent {
  @ViewChild('button', { static: false }) button: ElementRef;
  @ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;

  popoverClass = '';
}

@Component({
  selector: 'nb-popover-bindings-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <button #button [nbPopover]="content"
          [nbPopoverTrigger]="trigger"
          [nbPopoverPlacement]="position"
          [nbPopoverAdjustment]="adjustment"
          [nbPopoverContext]="context">
        </button>
      </nb-layout-column>
    </nb-layout>

    <ng-template let-data>Some Template {{ data.text }}</ng-template>
  `,
})
export class NbPopoverBindingsTestComponent {
  @ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;
  @ViewChild('button', { static: false }) button: ElementRef;
  @ViewChild(TemplateRef, { static: false }) template: TemplateRef<any>;
  @Input() content: any = '';
  @Input() context: any = { text: 'hello world' };
  @Input() trigger = NbTrigger.CLICK;
  @Input() position = NbPosition.TOP;
  @Input() adjustment = NbAdjustment.CLOCKWISE;
}

@Component({
  selector: 'nb-popover-instance-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <button #button nbPopover="test"></button>
      </nb-layout-column>
    </nb-layout>

    <ng-template>Some Template</ng-template>
  `,
})
export class NbPopoverInstanceTestComponent {
  @ViewChild(NbPopoverDirective, { static: false }) popover: NbPopoverDirective;
  @ViewChild('button', { static: false }) button: ElementRef;
  @ViewChild(TemplateRef, { static: false }) template: TemplateRef<any>;
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
  _offset = 15;
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

  offset(offset: number) {
    this._offset = offset;
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
  NbPopoverDefaultTestComponent,
  NbPopoverBindingsTestComponent,
  NbPopoverInstanceTestComponent,
  NbPopoverComponentContentTestComponent,
];

@NgModule({
  imports: [NbLayoutModule, NbPopoverModule],
  exports: [...TEST_COMPONENTS],
  declarations: [...TEST_COMPONENTS],
  entryComponents: [NbPopoverComponentContentTestComponent],
})
class PopoverTestModule { }

describe('Directive: NbPopoverDirective', () => {

  const overlayHandler = new NbDynamicOverlayHandlerMock();

  beforeEach(async(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        NbThemeModule.forRoot(),
        PopoverTestModule,
      ],
    });
  }));

  describe('smoke ', () => {

    let fixture: ComponentFixture<any>;

    afterEach(() => {
      fixture.destroy();
    });


    it('should render string', () => {
      fixture = TestBed.createComponent(NbPopoverDefaultTestComponent);

      fixture.detectChanges();

      fixture.componentInstance.popover.show();
      fixture.detectChanges();
      const primitiveOverlay = fixture.nativeElement.querySelector('.primitive-overlay');
      expect(primitiveOverlay.textContent).toContain('test');
    });

    it('should hide', () => {
      fixture = TestBed.createComponent(NbPopoverDefaultTestComponent);

      fixture.detectChanges();

      fixture.componentInstance.popover.show();
      fixture.detectChanges();

      const openedOverlay = fixture.nativeElement.querySelector('.primitive-overlay');
      expect(openedOverlay.textContent).toContain('test');

      fixture.componentInstance.popover.hide();
      fixture.detectChanges();

      const noOverlay = fixture.nativeElement.querySelector('.primitive-overlay');
      expect(noOverlay).toBeNull();
    });

    it('should render different content type', () => {

      fixture = TestBed.createComponent(NbPopoverBindingsTestComponent);
      fixture.detectChanges();

      fixture.componentInstance.popover.show();
      fixture.detectChanges();

      fixture.componentInstance.content = 'new string';
      fixture.detectChanges();
      const stringPopover = fixture.nativeElement.querySelector('nb-popover');
      expect(stringPopover.textContent).toContain('new string');

      fixture.componentInstance.content = NbPopoverComponentContentTestComponent;
      fixture.detectChanges();
      const componentPopover = fixture.nativeElement.querySelector('nb-popover-component-content-test');
      expect(componentPopover.textContent).toContain('hello world');

      fixture.componentInstance.content = fixture.componentInstance.template;
      fixture.detectChanges();
      const templatePopover = fixture.nativeElement.querySelector('nb-popover');
      expect(templatePopover.textContent).toContain('hello world');
    });

    it('should emit show state change event when shows up', () => {
      fixture = TestBed.createComponent(NbPopoverDefaultTestComponent);
      fixture.detectChanges();
      const popover: NbPopoverDirective = fixture.componentInstance.popover;

      const stateChangeSpy = createSpy('stateChangeSpy');
      popover.nbPopoverShowStateChange.subscribe(stateChangeSpy);

      popover.show();
      fixture.detectChanges();

      expect(stateChangeSpy).toHaveBeenCalledTimes(1);
      expect(stateChangeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ isShown: true }));
    });

    it('should emit show state change event when hides', () => {
      fixture = TestBed.createComponent(NbPopoverDefaultTestComponent);
      fixture.detectChanges();
      const popover: NbPopoverDirective = fixture.componentInstance.popover;
      popover.show();
      fixture.detectChanges();

      const stateChangeSpy = createSpy('stateChangeSpy');
      popover.nbPopoverShowStateChange.subscribe(stateChangeSpy);

      popover.hide();
      fixture.detectChanges();

      expect(stateChangeSpy).toHaveBeenCalledTimes(1);
      expect(stateChangeSpy).toHaveBeenCalledWith(jasmine.objectContaining({ isShown: false }));
    });

    it('should set isShown to false when hidden', () => {
      fixture = TestBed.createComponent(NbPopoverDefaultTestComponent);
      fixture.detectChanges();
      const popover: NbPopoverDirective = fixture.componentInstance.popover;

      expect(popover.isShown).toEqual(false);
    });

    it('should set isShown to true when shown', () => {
      fixture = TestBed.createComponent(NbPopoverDefaultTestComponent);
      fixture.detectChanges();
      const popover: NbPopoverDirective = fixture.componentInstance.popover;
      popover.show();
      fixture.detectChanges();

      expect(popover.isShown).toEqual(true);
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
        .overrideComponent(NbPopoverDirective, {
          set: {
            providers: [
              { provide: NbDynamicOverlayHandler, useValue: overlayHandler },
            ],
          },
        });
    }));
    describe('default popover', () => {

      let fixture: ComponentFixture<NbPopoverDefaultTestComponent>;

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
        const buildSpy = spyOn(overlayHandler, 'build').and.callThrough();
        const rebuildSpy = spyOn(overlayHandler, 'rebuild').and.callThrough();

        fixture = TestBed.createComponent(NbPopoverDefaultTestComponent);
        fixture.detectChanges();

        expect(componentSpy).toHaveBeenCalledTimes(1);
        expect(componentSpy).toHaveBeenCalledWith(NbPopoverComponent);
        expect(hostSpy).toHaveBeenCalledWith(fixture.componentInstance.button);
        expect(hostSpy).toHaveBeenCalledTimes(1);
        expect(positionSpy).toHaveBeenCalledTimes(2);
        expect(positionSpy).toHaveBeenCalledWith(NbPosition.TOP);
        expect(triggerSpy).toHaveBeenCalledTimes(2);
        expect(triggerSpy).toHaveBeenCalledWith(NbTrigger.CLICK);
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
        fixture = TestBed.createComponent(NbPopoverDefaultTestComponent);
        fixture.detectChanges();
        const showSpy = spyOn(dynamicOverlay, 'show').and.callThrough();
        const hideSpy = spyOn(dynamicOverlay, 'hide').and.callThrough();
        const toggleSpy = spyOn(dynamicOverlay, 'toggle').and.callThrough();

        fixture.componentInstance.popover.show();
        fixture.detectChanges();

        expect(showSpy).toHaveBeenCalledTimes(1);
        expect(hideSpy).toHaveBeenCalledTimes(0);
        expect(toggleSpy).toHaveBeenCalledTimes(0);

        fixture.componentInstance.popover.hide();
        fixture.detectChanges();

        expect(showSpy).toHaveBeenCalledTimes(1);
        expect(hideSpy).toHaveBeenCalledTimes(1);
        expect(toggleSpy).toHaveBeenCalledTimes(0);


        fixture.componentInstance.popover.toggle();
        fixture.detectChanges();

        expect(showSpy).toHaveBeenCalledTimes(1);
        expect(hideSpy).toHaveBeenCalledTimes(1);
        expect(toggleSpy).toHaveBeenCalledTimes(1);
      });

      it('should set overlay config', () => {
        const popoverClass = 'custom-popover-class';
        const overlayConfigSpy = spyOn(overlayHandler, 'overlayConfig').and.callThrough();

        fixture = TestBed.createComponent(NbPopoverDefaultTestComponent);
        fixture.componentInstance.popoverClass = popoverClass;
        fixture.detectChanges();

        expect(overlayConfigSpy).toHaveBeenCalledWith(jasmine.objectContaining({ panelClass: popoverClass }));
      });
    });

    describe('binding popover', () => {

      let fixture: ComponentFixture<NbPopoverBindingsTestComponent>;

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
        const buildSpy = spyOn(overlayHandler, 'build').and.callThrough();
        const rebuildSpy = spyOn(overlayHandler, 'rebuild').and.callThrough();

        fixture = TestBed.createComponent(NbPopoverBindingsTestComponent);
        fixture.detectChanges();

        fixture.componentInstance.adjustment = NbAdjustment.HORIZONTAL;
        fixture.componentInstance.trigger = NbTrigger.HINT;
        fixture.componentInstance.content = 'new string';
        fixture.componentInstance.context = { context: 'new' };
        fixture.componentInstance.position = NbPosition.LEFT;

        fixture.detectChanges();

        expect(componentSpy).toHaveBeenCalledTimes(1);
        expect(componentSpy).toHaveBeenCalledWith(NbPopoverComponent);
        expect(hostSpy).toHaveBeenCalledWith(fixture.componentInstance.button);
        expect(hostSpy).toHaveBeenCalledTimes(1);
        expect(positionSpy).toHaveBeenCalledTimes(3);
        expect(positionSpy).toHaveBeenCalledWith(NbPosition.LEFT);
        expect(triggerSpy).toHaveBeenCalledTimes(3);
        expect(triggerSpy).toHaveBeenCalledWith(NbTrigger.HINT);
        expect(adjustmentSpy).toHaveBeenCalledTimes(3);
        expect(adjustmentSpy).toHaveBeenCalledWith(NbAdjustment.HORIZONTAL);
        expect(contentSpy).toHaveBeenCalledTimes(3);
        expect(contentSpy).toHaveBeenCalledWith('new string');
        expect(contextSpy).toHaveBeenCalledTimes(3);
        expect(contextSpy).toHaveBeenCalledWith({ context: 'new' });
        expect(buildSpy).toHaveBeenCalledTimes(1);
        expect(rebuildSpy).toHaveBeenCalledTimes(2);
      });

      it('should accept different content type', () => {
        const contentSpy = spyOn(overlayHandler, 'content').and.callThrough();

        fixture = TestBed.createComponent(NbPopoverBindingsTestComponent);
        fixture.detectChanges();

        fixture.componentInstance.content = 'new string';
        fixture.detectChanges();
        expect(contentSpy).toHaveBeenCalledTimes(3);
        expect(contentSpy).toHaveBeenCalledWith('new string');

        fixture.componentInstance.content = NbPopoverComponentContentTestComponent;
        fixture.detectChanges();

        expect(contentSpy).toHaveBeenCalledTimes(4);
        expect(contentSpy).toHaveBeenCalledWith(NbPopoverComponentContentTestComponent);

        fixture.componentInstance.content = fixture.componentInstance.template;
        fixture.detectChanges();

        expect(contentSpy).toHaveBeenCalledTimes(5);
        expect(contentSpy).toHaveBeenCalledWith(fixture.componentInstance.template);
      });
    });

    describe('instance popover', () => {

      let fixture: ComponentFixture<NbPopoverInstanceTestComponent>;

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
        const buildSpy = spyOn(overlayHandler, 'build').and.callThrough();
        const rebuildSpy = spyOn(overlayHandler, 'rebuild').and.callThrough();

        fixture = TestBed.createComponent(NbPopoverInstanceTestComponent);
        fixture.detectChanges();

        fixture.componentInstance.popover.adjustment = NbAdjustment.HORIZONTAL;
        fixture.componentInstance.popover.trigger = NbTrigger.HINT;
        fixture.componentInstance.popover.content = 'new string';
        fixture.componentInstance.popover.context = { context: 'new' };
        fixture.componentInstance.popover.position = NbPosition.LEFT;

        fixture.componentInstance.popover.rebuild();

        expect(componentSpy).toHaveBeenCalledTimes(1);
        expect(componentSpy).toHaveBeenCalledWith(NbPopoverComponent);
        expect(hostSpy).toHaveBeenCalledWith(fixture.componentInstance.button);
        expect(hostSpy).toHaveBeenCalledTimes(1);
        expect(positionSpy).toHaveBeenCalledTimes(3);
        expect(positionSpy).toHaveBeenCalledWith(NbPosition.LEFT);
        expect(triggerSpy).toHaveBeenCalledTimes(3);
        expect(triggerSpy).toHaveBeenCalledWith(NbTrigger.HINT);
        expect(adjustmentSpy).toHaveBeenCalledTimes(3);
        expect(adjustmentSpy).toHaveBeenCalledWith(NbAdjustment.HORIZONTAL);
        expect(contentSpy).toHaveBeenCalledTimes(3);
        expect(contentSpy).toHaveBeenCalledWith('new string');
        expect(contextSpy).toHaveBeenCalledTimes(3);
        expect(contextSpy).toHaveBeenCalledWith({ context: 'new' });
        expect(buildSpy).toHaveBeenCalledTimes(1);
        expect(rebuildSpy).toHaveBeenCalledTimes(2);
      });


      it('should accept different content type', () => {
        const contentSpy = spyOn(overlayHandler, 'content').and.callThrough();

        fixture = TestBed.createComponent(NbPopoverInstanceTestComponent);
        fixture.detectChanges();

        fixture.componentInstance.popover.content = 'new string';
        fixture.componentInstance.popover.rebuild();

        expect(contentSpy).toHaveBeenCalledTimes(3);
        expect(contentSpy).toHaveBeenCalledWith('new string');

        fixture.componentInstance.popover.content = NbPopoverComponentContentTestComponent;
        fixture.componentInstance.popover.rebuild();

        expect(contentSpy).toHaveBeenCalledTimes(4);
        expect(contentSpy).toHaveBeenCalledWith(NbPopoverComponentContentTestComponent);

        fixture.componentInstance.popover.content = fixture.componentInstance.template;
        fixture.componentInstance.popover.rebuild();

        expect(contentSpy).toHaveBeenCalledTimes(5);
        expect(contentSpy).toHaveBeenCalledWith(fixture.componentInstance.template);
      });

    });
  });
});
