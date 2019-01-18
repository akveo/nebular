import { Component, ElementRef, Input, Type, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';


import { NbThemeModule } from '../../theme.module';
import { NbLayoutModule } from '../layout/layout.module';
import { NbPopoverDirective } from './popover.directive';
import {
  NbAdjustment,
  NbDynamicOverlayHandler,
  NbOverlayContent,
  NbPosition,
  NbRenderableContainer,
  NbTrigger,
} from '../cdk';
import { NbPopoverComponent } from '@nebular/theme/components/popover/popover.component';
import { NbPopoverModule } from '@nebular/theme';

@Component({
  selector: 'nb-popover-component-content-test',
  template: 'test, {{ text }}',
})
export class NbPopoverComponentContentTestComponent {
  text: string;
}

// @Component({
//   selector: 'nb-popover-component-test',
//   template: `
//     <nb-layout>
//       <nb-layout-column>
//         <button #button [nbPopover]="content" [nbPopoverContext]="{ text: 'some context data' }"></button>
//       </nb-layout-column>
//     </nb-layout>
//   `,
// })
// export class NbPopoverComponentTestComponent {
//   @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;
//   content = NbPopoverComponentContentTestComponent;
// }
//
// @Component({
//   selector: 'nb-popover-template-test',
//   template: `
//     <nb-layout>
//       <nb-layout-column>
//         <button #button [nbPopover]="t" [nbPopoverContext]="{ text: 'some context data' }"></button>
//         <ng-template #t let-data>test, {{ data.text }}</ng-template>
//       </nb-layout-column>
//     </nb-layout>
//   `,
// })
// export class NbPopoverTemplateTestComponent {
//   @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;
// }

@Component({
  selector: 'nb-popover-default-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <button #button nbPopover="test"></button>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbPopoverDefaultTestComponent {
  @ViewChild('button') button: ElementRef;
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;
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
  `,
})
export class NbPopoverBindingsTestComponent {
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;
  @Input() content = '';
  @Input() context = {};
  @Input() trigger = NbTrigger.CLICK;
  @Input() position = NbPosition.TOP;
  @Input() adjustment = NbAdjustment.CLOCKWISE;
}

@Component({
  selector: 'nb-popover-mode-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <button #button nbPopover="test" [nbPopoverMode]="mode"></button>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbPopoverModeTestComponent {
  @Input() mode: NbTrigger = NbTrigger.CLICK;
  @ViewChild('button') button: ElementRef;
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;
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

describe('Directive: NbPopoverDirective', () => {

  const overlayHandler = new NbDynamicOverlayHandlerMock();

  beforeEach(async(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        NbThemeModule.forRoot(),
        NbLayoutModule,
        NbPopoverModule,
      ],
      declarations: [
        NbPopoverDefaultTestComponent,
        // NbPopoverTemplateTestComponent,
        // NbPopoverComponentTestComponent,
        // NbPopoverComponentContentTestComponent,
        // NbPopoverModeTestComponent,
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

  describe('with string content', () => {
    let fixture: ComponentFixture<NbPopoverDefaultTestComponent>;



    afterEach(() => {
      fixture.destroy();
    });

    describe('smoke ', () => {

      it('should render string', () => {
        fixture.detectChanges();

        fixture.componentInstance.popover.show();
        fixture.detectChanges();

        const primitiveOverlay = fixture.nativeElement.querySelector('.primitive-overlay');
        expect(primitiveOverlay.textContent).toContain('test');
      });

      it('should hide', () => {
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

    });

    describe('unit', () => {


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
    });

    // it('should build position strategy', () => {
    //   const mockPositionBuilder = new MockPositionBuilder();
    //   TestBed.resetTestingModule();
    //   TestBed.configureTestingModule({
    //     imports: [PopoverTestModule],
    //     providers: [{ provide: NbPositionBuilderService, useValue: mockPositionBuilder }],
    //   });
    //   fixture = TestBed.createComponent(NbPopoverStringTestComponent);
    //   fixture.detectChanges();
    //
    //   expect(mockPositionBuilder._connectedTo.nativeElement).toBe(fixture.componentInstance.button.nativeElement);
    //   expect(mockPositionBuilder._position).toBe(NbPosition.TOP);
    //   expect(mockPositionBuilder._adjustment).toBe(NbAdjustment.CLOCKWISE);
    // });
    //
    // it('should build with default trigger strategy', () => {
    //   TestBed.resetTestingModule();
    //   const bed = TestBed.configureTestingModule({
    //     imports: [PopoverTestModule],
    //     providers: [{ provide: NbTriggerStrategyBuilderService, useClass: MockTriggerStrategyBuilder }],
    //   });
    //   const mockTriggerStrategy = bed.get(NbTriggerStrategyBuilderService);
    //   fixture = TestBed.createComponent(NbPopoverStringTestComponent);
    //   fixture.detectChanges();
    //
    //   expect(mockTriggerStrategy._trigger).toBe(NbTrigger.CLICK);
    // });
    //
    // it('should build with custom trigger strategy', () => {
    //   TestBed.resetTestingModule();
    //   const bed = TestBed.configureTestingModule({
    //     imports: [PopoverTestModule],
    //     providers: [{ provide: NbTriggerStrategyBuilderService, useClass: MockTriggerStrategyBuilder }],
    //   });
    //   const mockTriggerStrategy = bed.get(NbTriggerStrategyBuilderService);
    //   fixture = TestBed.createComponent(NbPopoverStringTestComponent);
    //   fixture.componentInstance.trigger = NbTrigger.HOVER;
    //   fixture.detectChanges();
    //
    //   expect(mockTriggerStrategy._trigger).toBe(NbTrigger.HOVER);
    // });
    //
    // it('should build with custom mode strategy', () => {
    //   TestBed.resetTestingModule();
    //   const bed = TestBed.configureTestingModule({
    //     imports: [PopoverTestModule],
    //     providers: [{ provide: NbTriggerStrategyBuilderService, useClass: MockTriggerStrategyBuilder }],
    //   });
    //   const mockTriggerStrategy = bed.get(NbTriggerStrategyBuilderService);
    //   const modeFixture = TestBed.createComponent(NbPopoverModeTestComponent);
    //   modeFixture.componentInstance.mode = NbTrigger.HOVER;
    //   modeFixture.detectChanges();
    //
    //   expect(mockTriggerStrategy._trigger).toBe(NbTrigger.HOVER);
    // });
  });

  // describe('with template content', () => {
  //   let fixture: ComponentFixture<NbPopoverTemplateTestComponent>;
  //
  //   beforeEach(() => {
  //     fixture = TestBed.createComponent(NbPopoverTemplateTestComponent);
  //     fixture.detectChanges();
  //   });
  //
  //   afterEach(() => {
  //     fixture.destroy();
  //   });
  //
  //   it('should render template', () => {
  //     fixture.componentInstance.popover.show();
  //     fixture.detectChanges();
  //
  //     const primitiveOverlay = fixture.nativeElement.querySelector('nb-popover');
  //     expect(primitiveOverlay.textContent).toContain('test');
  //   });
  //
  //   it('should provide context', () => {
  //     fixture.componentInstance.popover.show();
  //     fixture.detectChanges();
  //
  //     const primitiveOverlay = fixture.nativeElement.querySelector('nb-popover');
  //     expect(primitiveOverlay.textContent).toContain('some context data');
  //   });
  // });
  //
  // describe('with component content', () => {
  //   let fixture: ComponentFixture<NbPopoverComponentTestComponent>;
  //
  //   beforeEach(() => {
  //     fixture = TestBed.createComponent(NbPopoverComponentTestComponent);
  //     fixture.detectChanges();
  //   });
  //
  //   afterEach(() => {
  //     fixture.destroy();
  //   });
  //
  //   it('should render component', () => {
  //     fixture.componentInstance.popover.show();
  //     fixture.detectChanges();
  //
  //     const primitiveOverlay = fixture.nativeElement.querySelector('nb-popover-component-content-test');
  //     expect(primitiveOverlay.textContent).toContain('test');
  //   });
  //
  //   it('should provide context', () => {
  //     fixture.componentInstance.popover.show();
  //     fixture.detectChanges();
  //
  //     const primitiveOverlay = fixture.nativeElement.querySelector('nb-popover-component-content-test');
  //     expect(primitiveOverlay.textContent).toContain('some context data');
  //   });
  // });
});
