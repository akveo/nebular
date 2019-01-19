import { Component, ComponentRef, ElementRef, Inject, Injectable, Input, NgModule, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { of as observableOf, Subject } from 'rxjs';

import { NbThemeModule } from '../../theme.module';
import { NbLayoutModule } from '../layout/layout.module';
import {
  NbAdjustment,
  NbPosition,
  NbPositionBuilderService,
  NbTrigger,
  NbTriggerStrategy,
  NbTriggerStrategyBuilderService,
} from '../cdk';
import { NbTooltipDirective } from './tooltip.directive';
import { NbTooltipModule } from './tooltip.module';
import { NB_DOCUMENT } from '../../theme.options';


@Component({
  selector: 'nb-tooltip-string-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <button #button nbTooltip="test" [nbTooltipIcon]="icon" [nbTooltipStatus]="status" [nbTooltipTrigger]="trigger">
        </button>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbTooltipStringTestComponent {
  @Input() icon;
  @Input() status;
  @Input() trigger: NbTrigger = NbTrigger.HINT;
  @ViewChild('button') button: ElementRef;
  @ViewChild(NbTooltipDirective) tooltip: NbTooltipDirective;
}

@NgModule({
  imports: [
    RouterTestingModule.withRoutes([]),
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NoopAnimationsModule,
    NbTooltipModule,
  ],
  declarations: [
    NbTooltipStringTestComponent,
  ],
})
export class TooltipTestModule {
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

  offset() {
    return this;
  };

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

  constructor(@Inject(NB_DOCUMENT) public _document: Document) {
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

describe('Directive: NbTooltipDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TooltipTestModule] });
  });

  let fixture: ComponentFixture<NbTooltipStringTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NbTooltipStringTestComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render string', () => {
    fixture.componentInstance.tooltip.show();
    fixture.detectChanges();

    const textContainer = fixture.nativeElement.querySelector('nb-tooltip .content span');
    expect(textContainer.textContent).toContain('test');
  });

  it('should hide', fakeAsync(() => {
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

  it('should toogle', fakeAsync(() => {
    let textContainer;

    fixture.componentInstance.tooltip.show();
    fixture.detectChanges();

    textContainer = fixture.nativeElement.querySelector('nb-tooltip .content span');
    expect(textContainer.textContent).toContain('test');
    fixture.componentInstance.tooltip.toggle();
    fixture.detectChanges();

    tick(); // we need this tick for animations
    const tooltip = fixture.nativeElement.querySelector('nb-tooltip');
    expect(tooltip).toBeNull();

    fixture.componentInstance.tooltip.toggle();
    fixture.detectChanges();

    textContainer = fixture.nativeElement.querySelector('nb-tooltip .content span');
    expect(textContainer.textContent).toContain('test');
  }));

  it('should display icon', () => {
    fixture.componentInstance.icon = 'some-icon';
    fixture.detectChanges();
    fixture.componentInstance.tooltip.show();
    fixture.detectChanges();

    const iconContainer = fixture.nativeElement.querySelector('nb-tooltip .content i');
    expect(iconContainer.className).toContain('icon some-icon');
  });

  it('should display status', () => {
    fixture.componentInstance.status = 'danger';
    fixture.detectChanges();
    fixture.componentInstance.tooltip.show();
    fixture.detectChanges();

    const iconContainer = fixture.nativeElement.querySelector('nb-tooltip');
    expect(iconContainer.className).toContain('danger-tooltip');
  });

  it('should build position strategy', () => {
    const mockPositionBuilder = new MockPositionBuilder();
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [TooltipTestModule],
      providers: [{ provide: NbPositionBuilderService, useValue: mockPositionBuilder }],
    });
    fixture = TestBed.createComponent(NbTooltipStringTestComponent);
    fixture.detectChanges();

    expect(mockPositionBuilder._connectedTo.nativeElement).toBe(fixture.componentInstance.button.nativeElement);
    expect(mockPositionBuilder._position).toBe(NbPosition.TOP);
    expect(mockPositionBuilder._adjustment).toBe(NbAdjustment.CLOCKWISE);
  });

  it('should build with default trigger strategy', () => {
    TestBed.resetTestingModule();
    const bed = TestBed.configureTestingModule({
      imports: [TooltipTestModule],
      providers: [{ provide: NbTriggerStrategyBuilderService, useClass: MockTriggerStrategyBuilder }],
    });
    const mockTriggerStrategy = bed.get(NbTriggerStrategyBuilderService);
    fixture = TestBed.createComponent(NbTooltipStringTestComponent);
    fixture.detectChanges();

    expect(mockTriggerStrategy._trigger).toBe(NbTrigger.HINT);
  });

  it('should build with custom trigger strategy', () => {
    TestBed.resetTestingModule();
    const bed = TestBed.configureTestingModule({
      imports: [TooltipTestModule],
      providers: [{ provide: NbTriggerStrategyBuilderService, useClass: MockTriggerStrategyBuilder }],
    });
    const mockTriggerStrategy = bed.get(NbTriggerStrategyBuilderService);
    fixture = TestBed.createComponent(NbTooltipStringTestComponent);
    fixture.componentInstance.trigger = NbTrigger.CLICK;
    fixture.detectChanges();

    expect(mockTriggerStrategy._trigger).toBe(NbTrigger.CLICK);
  });
});
