import { Component, ComponentRef, ElementRef, Inject, Injectable, Input, NgModule, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { of as observableOf, Subject } from 'rxjs';

import { NbThemeModule } from '../../theme.module';
import { NbLayoutModule } from '../layout/layout.module';
import { NbPopoverModule } from './popover.module';
import { NbPopoverDirective } from './popover.directive';
import {
  NbAdjustment,
  NbPosition,
  NbPositionBuilderService,
  NbTrigger,
  NbTriggerStrategy,
  NbTriggerStrategyBuilderService,
} from '../cdk';
import { NB_DOCUMENT } from '@nebular/theme';


@Component({
  selector: 'nb-popover-component-content-test',
  template: 'test, {{ text }}',
})
export class NbPopoverComponentContentTestComponent {
  text: string;
}

@Component({
  selector: 'nb-popover-component-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <button #button [nbPopover]="content" [nbPopoverContext]="{ text: 'some context data' }"></button>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbPopoverComponentTestComponent {
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;
  content = NbPopoverComponentContentTestComponent;
}

@Component({
  selector: 'nb-popover-template-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <button #button [nbPopover]="t" [nbPopoverContext]="{ text: 'some context data' }"></button>
        <ng-template #t let-data>test, {{ data.text }}</ng-template>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbPopoverTemplateTestComponent {
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;
}

@Component({
  selector: 'nb-popover-string-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <button #button nbPopover="test" [nbPopoverTrigger]="trigger"></button>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbPopoverStringTestComponent {
  @Input() trigger: NbTrigger = NbTrigger.CLICK;
  @ViewChild('button') button: ElementRef;
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;
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

@NgModule({
  imports: [
    RouterTestingModule.withRoutes([]),
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbPopoverModule,
  ],
  declarations: [
    NbPopoverStringTestComponent,
    NbPopoverTemplateTestComponent,
    NbPopoverComponentTestComponent,
    NbPopoverComponentContentTestComponent,
    NbPopoverModeTestComponent,
  ],
  entryComponents: [NbPopoverComponentContentTestComponent],
})
export class PopoverTestModule {
}

export class MockPositionBuilder {
  positionChange = new Subject();
  _connectedTo: ElementRef<any>;
  _position: NbPosition;
  _adjustment: NbAdjustment;

  connectedTo(connectedTo: ElementRef<any>) {
    this._connectedTo = connectedTo;
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

  attach() {
  };

  apply() {
  };

  detach() {
  };

  dispose() {
  };
}

@Injectable()
export class MockTriggerStrategyBuilder {

  _host: HTMLElement;
  _container: () => ComponentRef<any>;
  _trigger: NbTrigger;
  _document: Document;

  constructor(@Inject(NB_DOCUMENT) document) {
    this.document(document);
  }

  document(document: Document): this {
    this._document = document;
    return this;
  }

  trigger(trigger: NbTrigger): this {
    this._trigger = trigger;
    return this;
  }

  host(host: HTMLElement): this {
    this._host = host;
    return this;
  }

  container(container: () => ComponentRef<any>): this {
    this._container = container;
    return this;
  }

  build(): NbTriggerStrategy {
    return {
      show$: observableOf(null),
      hide$: observableOf(null),
    } as NbTriggerStrategy;
  }
}

describe('Directive: NbPopoverDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [PopoverTestModule] });
  });

  describe('with string content', () => {
    let fixture: ComponentFixture<NbPopoverStringTestComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(NbPopoverStringTestComponent);
      fixture.detectChanges();
    });

    afterEach(() => {
      fixture.destroy();
    });

    it('should render string', () => {
      fixture.componentInstance.popover.show();
      fixture.detectChanges();

      const primitiveOverlay = fixture.nativeElement.querySelector('.primitive-overlay');
      expect(primitiveOverlay.textContent).toContain('test');
    });

    it('should hide', () => {
      fixture.componentInstance.popover.show();
      fixture.detectChanges();

      const openedOverlay = fixture.nativeElement.querySelector('.primitive-overlay');
      expect(openedOverlay.textContent).toContain('test');

      fixture.componentInstance.popover.hide();
      fixture.detectChanges();

      const noOverlay = fixture.nativeElement.querySelector('.primitive-overlay');
      expect(noOverlay).toBeNull();
    });

    it('should build position strategy', () => {
      const mockPositionBuilder = new MockPositionBuilder();
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [PopoverTestModule],
        providers: [{ provide: NbPositionBuilderService, useValue: mockPositionBuilder }],
      });
      fixture = TestBed.createComponent(NbPopoverStringTestComponent);
      fixture.detectChanges();

      expect(mockPositionBuilder._connectedTo.nativeElement).toBe(fixture.componentInstance.button.nativeElement);
      expect(mockPositionBuilder._position).toBe(NbPosition.TOP);
      expect(mockPositionBuilder._adjustment).toBe(NbAdjustment.CLOCKWISE);
    });

    it('should build with default trigger strategy', () => {
      TestBed.resetTestingModule();
      const bed = TestBed.configureTestingModule({
        imports: [PopoverTestModule],
        providers: [{ provide: NbTriggerStrategyBuilderService, useClass: MockTriggerStrategyBuilder }],
      });
      const mockTriggerStrategy = bed.get(NbTriggerStrategyBuilderService);
      fixture = TestBed.createComponent(NbPopoverStringTestComponent);
      fixture.detectChanges();

      expect(mockTriggerStrategy._trigger).toBe(NbTrigger.CLICK);
    });

    it('should build with custom trigger strategy', () => {
      TestBed.resetTestingModule();
      const bed = TestBed.configureTestingModule({
        imports: [PopoverTestModule],
        providers: [{ provide: NbTriggerStrategyBuilderService, useClass: MockTriggerStrategyBuilder }],
      });
      const mockTriggerStrategy = bed.get(NbTriggerStrategyBuilderService);
      fixture = TestBed.createComponent(NbPopoverStringTestComponent);
      fixture.componentInstance.trigger = NbTrigger.HOVER;
      fixture.detectChanges();

      expect(mockTriggerStrategy._trigger).toBe(NbTrigger.HOVER);
    });

    it('should build with custom mode strategy', () => {
      TestBed.resetTestingModule();
      const bed = TestBed.configureTestingModule({
        imports: [PopoverTestModule],
        providers: [{ provide: NbTriggerStrategyBuilderService, useClass: MockTriggerStrategyBuilder }],
      });
      const mockTriggerStrategy = bed.get(NbTriggerStrategyBuilderService);
      const modeFixture = TestBed.createComponent(NbPopoverModeTestComponent);
      modeFixture.componentInstance.mode = NbTrigger.HOVER;
      modeFixture.detectChanges();

      expect(mockTriggerStrategy._trigger).toBe(NbTrigger.HOVER);
    });
  });

  describe('with template content', () => {
    let fixture: ComponentFixture<NbPopoverTemplateTestComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(NbPopoverTemplateTestComponent);
      fixture.detectChanges();
    });

    afterEach(() => {
      fixture.destroy();
    });

    it('should render template', () => {
      fixture.componentInstance.popover.show();
      fixture.detectChanges();

      const primitiveOverlay = fixture.nativeElement.querySelector('nb-popover');
      expect(primitiveOverlay.textContent).toContain('test');
    });

    xit('should provide context', () => {
      fixture.componentInstance.popover.show();
      fixture.detectChanges();

      const primitiveOverlay = fixture.nativeElement.querySelector('nb-popover');
      expect(primitiveOverlay.textContent).toContain('some context data');
    });
  });

  describe('with component content', () => {
    let fixture: ComponentFixture<NbPopoverComponentTestComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(NbPopoverComponentTestComponent);
      fixture.detectChanges();
    });

    afterEach(() => {
      fixture.destroy();
    });

    it('should render component', () => {
      fixture.componentInstance.popover.show();
      fixture.detectChanges();

      const primitiveOverlay = fixture.nativeElement.querySelector('nb-popover-component-content-test');
      expect(primitiveOverlay.textContent).toContain('test');
    });

    it('should provide context', () => {
      fixture.componentInstance.popover.show();
      fixture.detectChanges();

      const primitiveOverlay = fixture.nativeElement.querySelector('nb-popover-component-content-test');
      expect(primitiveOverlay.textContent).toContain('some context data');
    });
  });
});
