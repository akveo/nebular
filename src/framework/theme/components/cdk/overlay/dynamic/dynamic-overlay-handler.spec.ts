import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Injectable,
  Input,
  Type,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { NbRenderableContainer } from '../overlay-container';
import {
  NbAdjustableConnectedPositionStrategy,
  NbAdjustment,
  NbPosition,
  NbPositionBuilderService,
} from '../overlay-position';
import { NbDynamicOverlay } from './dynamic-overlay';
import { NbOverlayContent } from '../overlay-service';
import { NbDynamicOverlayChange, NbDynamicOverlayHandler } from './dynamic-overlay-handler';
import { NbTrigger, NbTriggerStrategy, NbTriggerStrategyBuilderService } from '../overlay-trigger';
import { NbOverlayConfig } from '@nebular/theme/components/cdk/overlay/mapping';

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

  _container: string = 'container';
  _componentType: Type<NbRenderableContainer>;
  _context: Object = {};
  _content: NbOverlayContent;
  _positionStrategy: NbAdjustableConnectedPositionStrategy;
  _overlayConfig: NbOverlayConfig;

  constructor() {}

  create(componentType: Type<NbRenderableContainer>,
         content: NbOverlayContent,
         context: Object,
         positionStrategy: NbAdjustableConnectedPositionStrategy,
         overlayConfig: NbOverlayConfig) {

    this.setContext(context);
    this.setContent(content);
    this.setComponent(componentType);
    this.setPositionStrategy(positionStrategy);
    this.setOverlayConfig(overlayConfig);

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

  setOverlayConfig(overlayConfig: NbOverlayConfig) {
    this._overlayConfig = overlayConfig;
  }

  setContentAndContext(content: NbOverlayContent, context: Object) {
    this._content = content;
    this._context = context;
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
  _offset: number;

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

  offset(offset) {
    this._offset = offset;
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

  show$ = new Subject<any>();
  hide$ = new Subject<any>();

  private destroyed$ = new Subject();

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
      show$: this.show$.asObservable().pipe(takeUntil(this.destroyed$)),
      hide$: this.hide$.asObservable().pipe(takeUntil(this.destroyed$)),
      destroy: () => this.destroyed$.next(),
    };
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

  it('should set isFirstChange to false by default', () => {
    const obj = {};
    const obj1 = {};
    const change = new NbDynamicOverlayChange(obj, obj1);

    expect(change.isChanged()).toBe(true);
    expect(change.isFirstChange()).toBe(false);

    const change2 = new NbDynamicOverlayChange(obj, obj1, true);

    expect(change2.isChanged()).toBe(true);
    expect(change2.isFirstChange()).toBe(true);
  });
});

describe('dynamic-overlay-handler', () => {

  let overlayHandler: NbDynamicOverlayHandler;
  let dynamicOverlay: any;
  let triggerStrategyBuilder: any;
  let positionBuilder: any;

  const configure = (host?): any => {
    host = host ? host : new ElementRef(document.createElement('b'));
    return overlayHandler
      .componentType(NbDynamicOverlayMockComponent)
      .host(host);
  };

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
    triggerStrategyBuilder = bed.get(NbTriggerStrategyBuilderService);
    positionBuilder = bed.get(NbPositionBuilderService);
  });

  it('should throw if nothing passed', () => {
    expect(() => overlayHandler.build()).toThrow();
  });

  it('should throw if only component type passed', () => {
    expect(() => overlayHandler.componentType(NbDynamicOverlayMockComponent).build()).toThrow();
  });

  it('should throw if only host type passed', () => {
    const host = new ElementRef(document.createElement('b'));
    expect(() => overlayHandler.host(host).build()).toThrow();
  });

  it('connect should throw if overlay not created', () => {
    expect(() => overlayHandler.connect()).toThrow();
  });

  it('rebuild should not throw if overlay not created', () => {
    expect(() => overlayHandler.rebuild()).not.toThrow();
  });

  it('should build when componentType passed', () => {
    const host = new ElementRef(document.createElement('b'));
    const dynamic: any = configure(host).build();

    expect(dynamic._componentType).toBe(NbDynamicOverlayMockComponent);
    expect(triggerStrategyBuilder._host).toBe(host.nativeElement);
    expect(triggerStrategyBuilder._trigger).toBe(NbTrigger.NOOP);
    expect(triggerStrategyBuilder._container()).toBe(dynamicOverlay._container);

    expect(positionBuilder._connectedTo).toBe(host);
    expect(positionBuilder._position).toBe(NbPosition.TOP);
    expect(positionBuilder._adjustment).toBe(NbAdjustment.NOOP);
  });

  it('should show/hide overlay when trigger strategy first', () => {
    const dynamic: any = configure().build();

    const showSpy = spyOn(dynamic, 'show').and.callThrough();
    const hideSpy = spyOn(dynamic, 'hide').and.callThrough();

    triggerStrategyBuilder.show$.next(true);

    expect(showSpy).toHaveBeenCalledTimes(1);
    expect(hideSpy).toHaveBeenCalledTimes(0);

    triggerStrategyBuilder.hide$.next(true);

    expect(showSpy).toHaveBeenCalledTimes(1);
    expect(hideSpy).toHaveBeenCalledTimes(1);
  });

  it('should destroy overlay and disconnect from trigger strategy', () => {
    const dynamic: any = configure().build();

    const showSpy = spyOn(dynamic, 'show').and.callThrough();
    const hideSpy = spyOn(dynamic, 'hide').and.callThrough();
    const disposeSpy = spyOn(dynamic, 'dispose').and.callThrough();

    triggerStrategyBuilder.show$.next(true);
    triggerStrategyBuilder.hide$.next(true);

    expect(showSpy).toHaveBeenCalledTimes(1);
    expect(hideSpy).toHaveBeenCalledTimes(1);
    expect(disposeSpy).toHaveBeenCalledTimes(0);

    overlayHandler.destroy();

    triggerStrategyBuilder.show$.next(true);
    triggerStrategyBuilder.hide$.next(true);

    expect(showSpy).toHaveBeenCalledTimes(1);
    expect(hideSpy).toHaveBeenCalledTimes(1);
    expect(disposeSpy).toHaveBeenCalledTimes(1);
  });

  it('should not destroy if nothing to destroy', () => {
    const disposeSpy = spyOn(dynamicOverlay, 'dispose').and.callThrough();

    overlayHandler.destroy();
    expect(disposeSpy).toHaveBeenCalledTimes(0);
  });

  it('should not listen when disconnected', () => {
    const dynamic: any = configure().build();

    const showSpy = spyOn(dynamic, 'show').and.callThrough();
    const hideSpy = spyOn(dynamic, 'hide').and.callThrough();

    triggerStrategyBuilder.show$.next(true);
    triggerStrategyBuilder.hide$.next(true);

    expect(showSpy).toHaveBeenCalledTimes(1);
    expect(hideSpy).toHaveBeenCalledTimes(1);

    overlayHandler.disconnect();

    triggerStrategyBuilder.show$.next(true);
    triggerStrategyBuilder.hide$.next(true);

    expect(showSpy).toHaveBeenCalledTimes(1);
    expect(hideSpy).toHaveBeenCalledTimes(1);

    overlayHandler.connect();

    triggerStrategyBuilder.show$.next(true);
    triggerStrategyBuilder.hide$.next(true);

    expect(showSpy).toHaveBeenCalledTimes(2);
    expect(hideSpy).toHaveBeenCalledTimes(2);
  });

  it('should set and update trigger', () => {
    const host = new ElementRef(document.createElement('b'));
    configure(host).trigger(NbTrigger.CLICK).build();
    expect(triggerStrategyBuilder._host).toBe(host.nativeElement);
    expect(triggerStrategyBuilder._trigger).toBe(NbTrigger.CLICK);
    expect(triggerStrategyBuilder._container()).toBe(dynamicOverlay._container);

    configure(host).trigger(NbTrigger.HOVER).rebuild();
    expect(triggerStrategyBuilder._trigger).toBe(NbTrigger.HOVER);
    expect(triggerStrategyBuilder._host).toBe(host.nativeElement);
    expect(triggerStrategyBuilder._trigger).toBe(NbTrigger.HOVER);
    expect(triggerStrategyBuilder._container()).toBe(dynamicOverlay._container);
  });

  it('should disconnect from prev trigger', () => {
    const triggerShow1$ = new Subject<any>();
    const triggerHide1$ = new Subject<any>();

    const triggerShow2$ = new Subject<any>();
    const triggerHide2$ = new Subject<any>();
    triggerStrategyBuilder.show$ = triggerShow1$;
    triggerStrategyBuilder.hide$ = triggerHide1$;

    let dynamic: any = configure().build();
    const showSpy = spyOn(dynamic, 'show').and.callThrough();
    const hideSpy = spyOn(dynamic, 'hide').and.callThrough();

    triggerShow1$.next();
    triggerHide1$.next();

    expect(showSpy).toHaveBeenCalledTimes(1);
    expect(hideSpy).toHaveBeenCalledTimes(1);

    // rebuild the overlay
    // so that it should disconnect from old subscribers and lister to new only
    triggerStrategyBuilder.show$ = triggerShow2$;
    triggerStrategyBuilder.hide$ = triggerHide2$;
    dynamic = configure().trigger(NbTrigger.HOVER).rebuild();

    triggerShow1$.next();
    triggerHide1$.next();

    expect(showSpy).toHaveBeenCalledTimes(1);
    expect(hideSpy).toHaveBeenCalledTimes(1);

    triggerShow2$.next();
    triggerHide2$.next();

    expect(showSpy).toHaveBeenCalledTimes(2);
    expect(hideSpy).toHaveBeenCalledTimes(2);
  });

  it('should set and update host', () => {
    const host1 = new ElementRef(document.createElement('b'));
    const host2 = new ElementRef(document.createElement('b'));

    configure(host1).build();
    expect(triggerStrategyBuilder._host).toBe(host1.nativeElement);
    expect(triggerStrategyBuilder._trigger).toBe(NbTrigger.NOOP);
    expect(triggerStrategyBuilder._container()).toBe(dynamicOverlay._container);
    expect(positionBuilder._connectedTo).toBe(host1);
    expect(positionBuilder._position).toBe(NbPosition.TOP);
    expect(positionBuilder._adjustment).toBe(NbAdjustment.NOOP);
    expect(positionBuilder._offset).toBe(15);

    configure().host(host2).rebuild();
    expect(triggerStrategyBuilder._host).toBe(host2.nativeElement);
    expect(triggerStrategyBuilder._trigger).toBe(NbTrigger.NOOP);
    expect(triggerStrategyBuilder._container()).toBe(dynamicOverlay._container);
    expect(positionBuilder._connectedTo).toBe(host2);
    expect(positionBuilder._position).toBe(NbPosition.TOP);
    expect(positionBuilder._adjustment).toBe(NbAdjustment.NOOP);
    expect(positionBuilder._offset).toBe(15);
  });

  it('should set and update position', () => {
    const host = new ElementRef(document.createElement('b'));
    configure(host).position(NbPosition.BOTTOM).build();
    expect(positionBuilder._connectedTo).toBe(host);
    expect(positionBuilder._position).toBe(NbPosition.BOTTOM);
    expect(positionBuilder._adjustment).toBe(NbAdjustment.NOOP);

    configure(host).position(NbPosition.LEFT).rebuild();
    expect(positionBuilder._connectedTo).toBe(host);
    expect(positionBuilder._position).toBe(NbPosition.LEFT);
    expect(positionBuilder._adjustment).toBe(NbAdjustment.NOOP);
  });

  it('should set and update adjustment', () => {
    const host = new ElementRef(document.createElement('b'));
    configure(host).adjustment(NbAdjustment.CLOCKWISE).build();
    expect(positionBuilder._connectedTo).toBe(host);
    expect(positionBuilder._position).toBe(NbPosition.TOP);
    expect(positionBuilder._adjustment).toBe(NbAdjustment.CLOCKWISE);

    configure(host).adjustment(NbAdjustment.COUNTERCLOCKWISE).rebuild();
    expect(positionBuilder._connectedTo).toBe(host);
    expect(positionBuilder._position).toBe(NbPosition.TOP);
    expect(positionBuilder._adjustment).toBe(NbAdjustment.COUNTERCLOCKWISE);
  });

  it('should set and update offset', () => {
    const host = new ElementRef(document.createElement('b'));
    configure(host).offset(34).build();
    expect(positionBuilder._connectedTo).toBe(host);
    expect(positionBuilder._position).toBe(NbPosition.TOP);
    expect(positionBuilder._adjustment).toBe(NbAdjustment.NOOP);
    expect(positionBuilder._offset).toBe(34);

    configure(host).offset(2).rebuild();
    expect(positionBuilder._connectedTo).toBe(host);
    expect(positionBuilder._position).toBe(NbPosition.TOP);
    expect(positionBuilder._adjustment).toBe(NbAdjustment.NOOP);
    expect(positionBuilder._offset).toBe(2);
  });

  it('should set and update content', () => {
    const content1 = 'new content';
    const content2 = 'new new content';

    let dynamic: any = configure().content(content1).build();
    expect(dynamic._content).toBe(content1);

    dynamic = configure().content(content2).rebuild();
    expect(dynamic._content).toBe(content2);
  });

  it('should set and update context', () => {
    const context1 = { a: 1 };
    const context2 = { a: 1, b: 3 };

    let dynamic: any = configure().context(context1).build();
    expect(dynamic._context).toBe(context1);

    dynamic = configure().context(context2).rebuild();
    expect(dynamic._context).toBe(context2);
  });

  it('should set and update componentType', () => {

    let dynamic: any = configure().componentType(NbDynamicOverlayMockComponent).build();
    expect(dynamic._componentType).toBe(NbDynamicOverlayMockComponent);

    dynamic = configure().componentType(NbDynamicOverlayMock2Component).rebuild();
    expect(dynamic._componentType).toBe(NbDynamicOverlayMock2Component);
  });

  it('should set and update position, host and adjustment', () => {
    const host1 = new ElementRef(document.createElement('b'));
    const host2 = new ElementRef(document.createElement('b'));

    configure(host1)
      .position(NbPosition.BOTTOM)
      .adjustment(NbAdjustment.CLOCKWISE)
      .build();

    expect(positionBuilder._connectedTo).toBe(host1);
    expect(positionBuilder._position).toBe(NbPosition.BOTTOM);
    expect(positionBuilder._adjustment).toBe(NbAdjustment.CLOCKWISE);

    configure(host2)
      .position(NbPosition.LEFT)
      .adjustment(NbAdjustment.HORIZONTAL)
      .build();

    expect(positionBuilder._connectedTo).toBe(host2);
    expect(positionBuilder._position).toBe(NbPosition.LEFT);
    expect(positionBuilder._adjustment).toBe(NbAdjustment.HORIZONTAL);
  });

  it('should set and update overlay config', () => {
    let overlayConfig: NbOverlayConfig = { panelClass: 'custom-class' };

    let dynamic = configure().overlayConfig(overlayConfig).build();
    expect(dynamic._overlayConfig).toEqual(jasmine.objectContaining(overlayConfig));

    overlayConfig = { panelClass: 'other-custom-class' };
    dynamic = configure().overlayConfig(overlayConfig).rebuild();
    expect(dynamic._overlayConfig).toEqual(jasmine.objectContaining(overlayConfig));
  });
});
