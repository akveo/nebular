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
import { NbMenuModule } from '../menu/menu.module';
import { NbContextMenuDirective } from './context-menu.directive';
import { NbContextMenuComponent } from './context-menu.component';
import { NbContextMenuModule } from './context-menu.module';
import { NbOverlayConfig } from '@nebular/theme/components/cdk/overlay/mapping';

@Component({
  selector: 'nb-context-menu-default-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <button #button [nbContextMenu]="items" [nbContextMenuClass]="contextMenuClass">show context menu</button>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbContextMenuDefaultTestComponent {
  @ViewChild('button', { static: false }) button: ElementRef;
  @ViewChild(NbContextMenuDirective, { static: false }) contextMenu: NbContextMenuDirective;

  items = [{ title: 'User' }, { title: 'Log Out' }];
  contextMenuClass = '';
}

@Component({
  selector: 'nb-context-menu-bindings-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <button #button [nbContextMenu]="items"
                [nbContextMenuTrigger]="trigger"
                [nbContextMenuPlacement]="position"
                [nbContextMenuAdjustment]="adjustment"
                [nbContextMenuTag]="tag">
        </button>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbContextMenuBindingsTestComponent {
  @ViewChild(NbContextMenuDirective, { static: false }) contextMenu: NbContextMenuDirective;
  @ViewChild('button', { static: false }) button: ElementRef;
  @Input() trigger = NbTrigger.CLICK;
  @Input() position = NbPosition.TOP;
  @Input() adjustment = NbAdjustment.CLOCKWISE;
  @Input() tag = '';
  @Input() items = [{ title: 'User' }, { title: 'Log Out' }];
}

@Component({
  selector: 'nb-context-menu-instance-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <button #button [nbContextMenu]="items">show context menu</button>
      </nb-layout-column>
    </nb-layout>

    <ng-template>Some Template</ng-template>
  `,
})
export class NbContextMenuInstanceTestComponent {
  @ViewChild(NbContextMenuDirective, { static: false }) contextMenu: NbContextMenuDirective;
  @ViewChild('button', { static: false }) button: ElementRef;

  items = [{ title: 'User' }, { title: 'Log Out' }];
}

const dynamicOverlay = {
  show() {},
  hide() {},
  toggle() {},
  destroy() {},
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
  NbContextMenuDefaultTestComponent,
  NbContextMenuBindingsTestComponent,
  NbContextMenuInstanceTestComponent,
];

@NgModule({
  imports: [NbLayoutModule, NbContextMenuModule],
  exports: [...TEST_COMPONENTS],
  declarations: [...TEST_COMPONENTS],
})
class ContextMenuTestModule { }

describe('Directive: NbContextMenuDirective', () => {

  const overlayHandler = new NbDynamicOverlayHandlerMock();

  beforeEach(async(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([]),
        NbThemeModule.forRoot(),
        NbMenuModule.forRoot(),
        ContextMenuTestModule,
      ],
    });
  }));

  describe('smoke ', () => {

    let fixture: ComponentFixture<any>;

    afterEach(() => {
      fixture.destroy();
    });


    it('should render string', () => {
      fixture = TestBed.createComponent(NbContextMenuDefaultTestComponent);
      fixture.detectChanges();
      fixture.componentInstance.contextMenu.show();
      fixture.detectChanges();

      const textContainer = fixture.nativeElement.querySelector('nb-menu');
      expect(textContainer.textContent).toContain('Log Out');
    });

    it('should hide', () => fakeAsync(() => {
      fixture = TestBed.createComponent(NbContextMenuDefaultTestComponent);
      fixture.detectChanges();
      fixture.componentInstance.contextMenu.show();
      fixture.detectChanges();


      const textContainer = fixture.nativeElement.querySelector('nb-menu');
      expect(textContainer.textContent).toContain('Logout');
      fixture.componentInstance.contextMenu.hide();
      fixture.detectChanges();

      tick(); // we need this tick for animations
      const contextMenu = fixture.nativeElement.querySelector('nb-menu');
      expect(contextMenu).toBeNull();
    }));

    it('should render different items', () => {
      fixture = TestBed.createComponent(NbContextMenuDefaultTestComponent);
      fixture.detectChanges();

      fixture.componentInstance.contextMenu.show();
      fixture.detectChanges();

      fixture.componentInstance.items = [ { title: 'Hello' } ];
      fixture.detectChanges();
      const textContainer = fixture.nativeElement.querySelector('nb-menu');
      expect(textContainer.textContent).toContain('Hello');
    });

  });

  describe('mocked services', () => {

    beforeEach(async(() => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([]),
          NbThemeModule.forRoot(),
          NbMenuModule.forRoot(),
          ContextMenuTestModule,
        ],
      })
        .overrideComponent(NbContextMenuDirective, {
          set: {
            providers: [
              { provide: NbDynamicOverlayHandler, useValue: overlayHandler },
            ],
          },
        });
    }));
    describe('default context-menu', () => {

      let fixture: ComponentFixture<NbContextMenuDefaultTestComponent>;

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

        fixture = TestBed.createComponent(NbContextMenuDefaultTestComponent);
        fixture.detectChanges();

        expect(componentSpy).toHaveBeenCalledTimes(1);
        expect(componentSpy).toHaveBeenCalledWith(NbContextMenuComponent);
        expect(hostSpy).toHaveBeenCalledWith(fixture.componentInstance.button);
        expect(hostSpy).toHaveBeenCalledTimes(1);
        expect(offsetSpy).toHaveBeenCalledTimes(0);
        expect(positionSpy).toHaveBeenCalledTimes(2);
        expect(positionSpy).toHaveBeenCalledWith(NbPosition.BOTTOM);
        expect(triggerSpy).toHaveBeenCalledTimes(2);
        expect(triggerSpy).toHaveBeenCalledWith(NbTrigger.CLICK);
        expect(adjustmentSpy).toHaveBeenCalledTimes(2);
        expect(adjustmentSpy).toHaveBeenCalledWith(NbAdjustment.CLOCKWISE);
        expect(contentSpy).toHaveBeenCalledTimes(0);
        expect(contextSpy).toHaveBeenCalledTimes(2);
        expect(contextSpy).toHaveBeenCalledWith({
          position: NbPosition.BOTTOM,
          items: [{ title: 'User' }, { title: 'Log Out' }],
          tag: undefined,
        });
        expect(buildSpy).toHaveBeenCalledTimes(1);
        expect(rebuildSpy).toHaveBeenCalledTimes(1);
      });

      it('should show/hide/toggle', () => {
        fixture = TestBed.createComponent(NbContextMenuDefaultTestComponent);
        fixture.detectChanges();
        const showSpy = spyOn(dynamicOverlay, 'show').and.callThrough();
        const hideSpy = spyOn(dynamicOverlay, 'hide').and.callThrough();
        const toggleSpy = spyOn(dynamicOverlay, 'toggle').and.callThrough();

        fixture.componentInstance.contextMenu.show();
        fixture.detectChanges();

        expect(showSpy).toHaveBeenCalledTimes(1);
        expect(hideSpy).toHaveBeenCalledTimes(0);
        expect(toggleSpy).toHaveBeenCalledTimes(0);

        fixture.componentInstance.contextMenu.hide();
        fixture.detectChanges();

        expect(showSpy).toHaveBeenCalledTimes(1);
        expect(hideSpy).toHaveBeenCalledTimes(1);
        expect(toggleSpy).toHaveBeenCalledTimes(0);


        fixture.componentInstance.contextMenu.toggle();
        fixture.detectChanges();

        expect(showSpy).toHaveBeenCalledTimes(1);
        expect(hideSpy).toHaveBeenCalledTimes(1);
        expect(toggleSpy).toHaveBeenCalledTimes(1);
      });

      it('should set overlay config', () => {
        const contextMenuClass = 'custom-context-menu-class';
        const overlayConfigSpy = spyOn(overlayHandler, 'overlayConfig').and.callThrough();

        fixture = TestBed.createComponent(NbContextMenuDefaultTestComponent);
        fixture.componentInstance.contextMenuClass = contextMenuClass;
        fixture.detectChanges();

        expect(overlayConfigSpy).toHaveBeenCalledWith(jasmine.objectContaining({panelClass: contextMenuClass}));
      });
    });

    describe('binding contextMenu', () => {

      let fixture: ComponentFixture<NbContextMenuBindingsTestComponent>;

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

        fixture = TestBed.createComponent(NbContextMenuBindingsTestComponent);
        fixture.detectChanges();

        fixture.componentInstance.adjustment = NbAdjustment.HORIZONTAL;
        fixture.componentInstance.trigger = NbTrigger.HOVER;
        fixture.componentInstance.items = [{ title: 'New' }];
        fixture.componentInstance.tag = 'new';
        fixture.componentInstance.position = NbPosition.LEFT;

        fixture.detectChanges();

        expect(componentSpy).toHaveBeenCalledTimes(1);
        expect(componentSpy).toHaveBeenCalledWith(NbContextMenuComponent);
        expect(hostSpy).toHaveBeenCalledWith(fixture.componentInstance.button);
        expect(hostSpy).toHaveBeenCalledTimes(1);
        expect(offsetSpy).toHaveBeenCalledTimes(0);
        expect(positionSpy).toHaveBeenCalledTimes(3);
        expect(positionSpy).toHaveBeenCalledWith(NbPosition.LEFT);
        expect(triggerSpy).toHaveBeenCalledTimes(3);
        expect(triggerSpy).toHaveBeenCalledWith(NbTrigger.HOVER);
        expect(adjustmentSpy).toHaveBeenCalledTimes(3);
        expect(adjustmentSpy).toHaveBeenCalledWith(NbAdjustment.HORIZONTAL);
        expect(contentSpy).toHaveBeenCalledTimes(0);
        expect(contextSpy).toHaveBeenCalledTimes(3);
        expect(contextSpy).toHaveBeenCalledWith({
          position: NbPosition.LEFT,
          items: [{ title: 'New' }],
          tag: 'new',
        });
        expect(buildSpy).toHaveBeenCalledTimes(1);
        expect(rebuildSpy).toHaveBeenCalledTimes(2);
      });
    });

    describe('instance context-menu', () => {

      let fixture: ComponentFixture<NbContextMenuInstanceTestComponent>;

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

        fixture = TestBed.createComponent(NbContextMenuInstanceTestComponent);
        fixture.detectChanges();

        fixture.componentInstance.contextMenu.adjustment = NbAdjustment.HORIZONTAL;
        fixture.componentInstance.contextMenu.trigger = NbTrigger.HOVER;
        fixture.componentInstance.contextMenu.items = [{ title: 'New' }];
        fixture.componentInstance.contextMenu.tag = 'new';
        fixture.componentInstance.contextMenu.position = NbPosition.LEFT;

        fixture.componentInstance.contextMenu.rebuild();

        expect(componentSpy).toHaveBeenCalledTimes(1);
        expect(componentSpy).toHaveBeenCalledWith(NbContextMenuComponent);
        expect(hostSpy).toHaveBeenCalledWith(fixture.componentInstance.button);
        expect(hostSpy).toHaveBeenCalledTimes(1);
        expect(positionSpy).toHaveBeenCalledTimes(3);
        expect(positionSpy).toHaveBeenCalledWith(NbPosition.LEFT);
        expect(triggerSpy).toHaveBeenCalledTimes(3);
        expect(triggerSpy).toHaveBeenCalledWith(NbTrigger.HOVER);
        expect(offsetSpy).toHaveBeenCalledTimes(0);
        expect(adjustmentSpy).toHaveBeenCalledTimes(3);
        expect(adjustmentSpy).toHaveBeenCalledWith(NbAdjustment.HORIZONTAL);
        expect(contentSpy).toHaveBeenCalledTimes(0);
        expect(contextSpy).toHaveBeenCalledTimes(3);
        expect(contextSpy).toHaveBeenCalledWith({
          position: NbPosition.LEFT,
          items: [{ title: 'New' }],
          tag: 'new',
        });
        expect(buildSpy).toHaveBeenCalledTimes(1);
        expect(rebuildSpy).toHaveBeenCalledTimes(2);
      });

    });
  });
});
