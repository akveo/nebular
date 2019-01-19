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
import { NB_DOCUMENT } from '../../theme.options';
import { NbContextMenuDirective } from './context-menu.directive';
import { NbMenuModule } from '../menu/menu.module';
import { NbContextMenuModule } from './context-menu.module';


@Component({
  selector: 'nb-context-menu-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <button #button [nbContextMenu]="items" [nbContextMenuTrigger]="trigger">
        </button>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbContextMenuTestComponent {
  @Input() trigger: NbTrigger = NbTrigger.CLICK;
  @ViewChild('button') button: ElementRef;
  @ViewChild(NbContextMenuDirective) contextMenu: NbContextMenuDirective;

  items = [{ title: 'User' }, { title: 'Log Out' }];
}

@NgModule({
  imports: [
    RouterTestingModule.withRoutes([]),
    NoopAnimationsModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
    NbMenuModule.forRoot(),
    NbContextMenuModule,
  ],
  declarations: [
    NbContextMenuTestComponent,
  ],
})
export class ContextMenuTestModule {
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

describe('Directive: NbContextMenuDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [ContextMenuTestModule] });
  });

  let fixture: ComponentFixture<NbContextMenuTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NbContextMenuTestComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should render context menu', () => {
    fixture.componentInstance.contextMenu.show();
    fixture.detectChanges();

    const menu = fixture.nativeElement.querySelector('nb-context-menu nb-menu');
    expect(menu).toBeTruthy();
  });

  it('should hide', fakeAsync(() => {
    let menu;
    fixture.componentInstance.contextMenu.show();
    fixture.detectChanges();


    menu = fixture.nativeElement.querySelector('nb-context-menu nb-menu');
    expect(menu).toBeTruthy();
    fixture.componentInstance.contextMenu.hide();
    fixture.detectChanges();

    tick(); // we need this tick for animations
    menu = fixture.nativeElement.querySelector('nb-context-menu nb-menu');
    expect(menu).toBeFalsy();
  }));

  it('should toogle', fakeAsync(() => {
    let menu;

    fixture.componentInstance.contextMenu.show();
    fixture.detectChanges();

    menu = fixture.nativeElement.querySelector('nb-context-menu nb-menu');
    expect(menu).toBeTruthy();
    fixture.componentInstance.contextMenu.toggle();
    fixture.detectChanges();

    tick(); // we need this tick for animations
    const tooltip = fixture.nativeElement.querySelector('nb-context-menu');
    expect(tooltip).toBeNull();

    fixture.componentInstance.contextMenu.toggle();
    fixture.detectChanges();
    tick();

    menu = fixture.nativeElement.querySelector('nb-context-menu nb-menu');
    expect(menu).toBeTruthy();
  }));

  it('should build position strategy', () => {
    const mockPositionBuilder = new MockPositionBuilder();
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ContextMenuTestModule],
      providers: [{ provide: NbPositionBuilderService, useValue: mockPositionBuilder }],
    });
    fixture = TestBed.createComponent(NbContextMenuTestComponent);
    fixture.detectChanges();

    expect(mockPositionBuilder._connectedTo.nativeElement).toBe(fixture.componentInstance.button.nativeElement);
    expect(mockPositionBuilder._position).toBe(NbPosition.BOTTOM);
    expect(mockPositionBuilder._adjustment).toBe(NbAdjustment.CLOCKWISE);
  });

  it('should build with default trigger strategy', () => {
    TestBed.resetTestingModule();
    const bed = TestBed.configureTestingModule({
      imports: [ContextMenuTestModule],
      providers: [{ provide: NbTriggerStrategyBuilderService, useClass: MockTriggerStrategyBuilder }],
    });
    const mockTriggerStrategy = bed.get(NbTriggerStrategyBuilderService);
    fixture = TestBed.createComponent(NbContextMenuTestComponent);
    fixture.detectChanges();

    expect(mockTriggerStrategy._trigger).toBe(NbTrigger.CLICK);
  });

  it('should build with custom trigger strategy', () => {
    TestBed.resetTestingModule();
    const bed = TestBed.configureTestingModule({
      imports: [ContextMenuTestModule],
      providers: [{ provide: NbTriggerStrategyBuilderService, useClass: MockTriggerStrategyBuilder }],
    });
    const mockTriggerStrategy = bed.get(NbTriggerStrategyBuilderService);
    fixture = TestBed.createComponent(NbContextMenuTestComponent);
    fixture.componentInstance.trigger = NbTrigger.HOVER;
    fixture.detectChanges();

    expect(mockTriggerStrategy._trigger).toBe(NbTrigger.HOVER);
  });
});
