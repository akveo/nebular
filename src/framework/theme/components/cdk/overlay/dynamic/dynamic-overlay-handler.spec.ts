import { TestBed } from '@angular/core/testing';
import { of as observableOf, Subject } from 'rxjs';
import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Injectable,
  Input,
  Type,
} from '@angular/core';
import { NbRenderableContainer } from '../overlay-container';
import {
  NbAdjustableConnectedPositionStrategy,
  NbAdjustment,
  NbPosition,
  NbPositionBuilderService,
} from '../overlay-position';
import { NbDynamicOverlay } from './dynamic-overlay';
import { NbOverlayContent } from '../overlay';
import { NbDynamicOverlayChange, NbDynamicOverlayHandler } from './dynamic-overlay-handler';
import { NbTrigger, NbTriggerStrategy, NbTriggerStrategyBuilderService } from '../overlay-trigger';

@Component({ template: '' })
export class NbDynamicOverlayMockComponent implements NbRenderableContainer {

  @Input() content: any;
  @Input() context: Object;
  @Input() cfr: ComponentFactoryResolver;

  renderContent() { }
}

@Component({ template: '' })
export class NbDynamicOverlayMock2Component extends NbDynamicOverlayMockComponent { }

export class NbMockDynamicOverlay {

  _container: ComponentRef<NbRenderableContainer>;
  _componentType: Type<NbRenderableContainer>;
  _context: Object = {};
  _content: NbOverlayContent;
  _positionStrategy: NbAdjustableConnectedPositionStrategy;

  constructor() {}

  create(componentType: Type<NbRenderableContainer>,
         content: NbOverlayContent,
         context: Object,
         positionStrategy: NbAdjustableConnectedPositionStrategy) {

    this.setContext(context);
    this.setContent(content);
    this.setComponent(componentType);
    this.setPositionStrategy(positionStrategy);

    return this;
  }

  setContent(content: NbOverlayContent) {
    this._content = content;
  }

  setContext(context: Object) {
    this._context = context;
  }

  setComponent(componentType: Type<NbRenderableContainer>) {
    this._componentType = componentType;
  }

  setPositionStrategy(positionStrategy: NbAdjustableConnectedPositionStrategy) {
    this._positionStrategy = positionStrategy;
  }

  show() {
  }

  hide() {
  }

  toggle() {
  }

  dispose() {
  }

  getContainer() {
    return this._container;
  }
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

describe('dynamic-overlay-change', () => {

  it('should check if string is changed', () => {
    const change = new NbDynamicOverlayChange('prev', 'next');

    expect(change.isChanged()).toBe(true);
  });

  it('should check if object is changed', () => {
    const obj = {};
    const obj1 = {};
    const change = new NbDynamicOverlayChange(obj, obj1);

    expect(change.isChanged()).toBe(true);
  });
});

describe('dynamic-overlay-handler', () => {

  let overlayHandler: NbDynamicOverlayHandler;
  let dynamicOverlay: NbDynamicOverlay;
  let strategyBuilder: NbTriggerStrategyBuilderService;
  let positionBuilder: NbPositionBuilderService;

  beforeEach(() => {
    TestBed.resetTestingModule();
    const bed = TestBed.configureTestingModule({
      declarations: [NbDynamicOverlayMockComponent, NbDynamicOverlayMock2Component],
      providers: [
        NbDynamicOverlayHandler,
        { provide: NbDynamicOverlay, useClass: NbMockDynamicOverlay },
        { provide: NbTriggerStrategyBuilderService, useClass: MockTriggerStrategyBuilder },
        { provide: NbPositionBuilderService, useClass: MockPositionBuilder },
      ],
    });
    overlayHandler = bed.get(NbDynamicOverlayHandler);
    dynamicOverlay = bed.get(NbDynamicOverlay);
    strategyBuilder = bed.get(NbTriggerStrategyBuilderService);
    positionBuilder = bed.get(NbPositionBuilderService);
  });

  it('should throw if no component type passed', () => {
    expect(() => overlayHandler.build()).toThrow();
  });
});
