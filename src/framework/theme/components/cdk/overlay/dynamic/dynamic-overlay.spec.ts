import { TestBed } from '@angular/core/testing';
import { Component, ComponentFactoryResolver, EventEmitter, Input, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { ScrollStrategy } from '@angular/cdk/overlay';

import { NbDynamicOverlay } from './dynamic-overlay';
import { NbOverlayService } from '../overlay-service';
import { NbRenderableContainer } from '../overlay-container';
import { NbComponentPortal, NbOverlayConfig, NbOverlayContainer } from '../mapping';

@Component({ template: '' })
export class NbDynamicOverlayMockComponent implements NbRenderableContainer {

  @Input() content: any;
  @Input() context: Object;
  @Input() cfr: ComponentFactoryResolver;

  renderContent() { }
}

@Component({ template: '' })
export class NbDynamicOverlayMock2Component extends NbDynamicOverlayMockComponent { }


export class MockNgZone extends NgZone {
  onStable: EventEmitter<any> = new EventEmitter(false);

  constructor() {
    super({enableLongStackTrace: false});
  }

  run(fn: Function): any {
    return fn();
  }

  runOutsideAngular(fn: Function): any {
    return fn();
  }

  simulateZoneExit(): void {
    this.onStable.emit(null);
  }
}

const instance = {
  position: '',
  content: '',
  context: null,
  cfr: null,
  renderContent() {},
};

const container: any = {
  instance,
  changeDetectorRef: { detectChanges: () => {} },
};

const ref = {
  portal: null,

  hasAttached() {},
  updatePosition() {},
  updatePositionStrategy() {},

  attach(portal: NbComponentPortal) {
    this.portal = portal;
    return container;
  },

  detach() {},
  dispose() {},
};
const repositionRes = 'something';
const scrollStrategies = {
  reposition: () => (<unknown> repositionRes) as ScrollStrategy,
};

export class NbOverlayContainerMock {
  getContainerElement() {
    return { contains() { return true; } };
  }
}

export class NbOverlayServiceMock {
  _config: NbOverlayConfig;

  get scrollStrategies() {
    return scrollStrategies;
  }

  create(config: NbOverlayConfig) {
    this._config = config;

    return ref;
  }
}

class PositionStrategy {
  constructor(public position: string) {}
  positionChange = new Subject<any>();
}

const bottomPositionStrategy: any = new PositionStrategy('bottom');
const topPositionStrategy: any = new PositionStrategy('top');

describe('dynamic-overlay', () => {
  let dynamicOverlayService: NbDynamicOverlay;
  let dynamicOverlay: NbDynamicOverlay;
  let overlayService: NbOverlayServiceMock;
  let zone: MockNgZone;
  let componentFactoryResolver: ComponentFactoryResolver;
  const content = 'Overlay Content';
  const context = {};

  beforeEach(() => {
    TestBed.resetTestingModule();
    const bed = TestBed.configureTestingModule({
      declarations: [NbDynamicOverlayMockComponent, NbDynamicOverlayMock2Component],
      providers: [
        NbDynamicOverlay,
        { provide: NbOverlayService, useClass: NbOverlayServiceMock },
        { provide: NgZone, useClass: MockNgZone },
        { provide: NbOverlayContainer, useClass: NbOverlayContainerMock },
      ],
    });
    overlayService = bed.get(NbOverlayService);
    dynamicOverlayService = bed.get(NbDynamicOverlay);
    componentFactoryResolver = bed.get(ComponentFactoryResolver);
    zone = bed.get(NgZone);
  });

  beforeEach(() => {
    dynamicOverlay = dynamicOverlayService.create(
      NbDynamicOverlayMockComponent,
      content,
      context,
      bottomPositionStrategy,
    );
  });

  afterEach(() => {
    dynamicOverlay.dispose();
  });

  it('should create overlay when show called', () => {
    const createOverlaySpy = spyOn(overlayService, 'create').and.callThrough();
    const renderSpy = spyOn(instance, 'renderContent').and.callThrough();
    const repositionSpy = spyOn(scrollStrategies, 'reposition').and.callThrough();
    const attachSpy = spyOn(ref, 'attach').and.callThrough();
    dynamicOverlay.show();
    spyOn(ref, 'hasAttached').and.returnValue(true);

    expect(createOverlaySpy).toHaveBeenCalledTimes(1);
    expect(renderSpy).toHaveBeenCalledTimes(1);
    expect(repositionSpy).toHaveBeenCalledTimes(1);
    expect(attachSpy).toHaveBeenCalledTimes(1);

    expect(overlayService._config.positionStrategy as any).toBe(bottomPositionStrategy);
    expect(overlayService._config.scrollStrategy as any).toBe(repositionRes);
    expect(dynamicOverlay.isAttached).toBe(true);

    expect(ref.portal.component).toBe(NbDynamicOverlayMockComponent);
    expect(instance.content).toBe(content);
    expect(instance.context).toBe(context);
    expect(instance.cfr).toBe(componentFactoryResolver);
  });

  it('should destroy overlay when hide called', () => {
    const detachSpy = spyOn(ref, 'detach').and.callThrough();
    dynamicOverlay.show();
    dynamicOverlay.hide();
    spyOn(ref, 'hasAttached').and.returnValue(false);

    expect(detachSpy).toHaveBeenCalledTimes(1);
    expect(dynamicOverlay.isAttached).toBe(false);
    expect(dynamicOverlay.getContainer()).toBe(null);
  });

  it('should not create ref on the second time', () => {
    const detachSpy = spyOn(ref, 'detach').and.callThrough();
    const createOverlaySpy = spyOn(overlayService, 'create').and.callThrough();
    const hasAttacheSpy = spyOn(ref, 'hasAttached');

    dynamicOverlay.show();
    hasAttacheSpy.and.returnValue(true);

    expect(detachSpy).toHaveBeenCalledTimes(0);
    expect(dynamicOverlay.isAttached).toBe(true);
    expect(dynamicOverlay.getContainer()).toBe(container);
    expect(createOverlaySpy).toHaveBeenCalledTimes(1);

    dynamicOverlay.hide();
    hasAttacheSpy.and.returnValue(false);

    expect(detachSpy).toHaveBeenCalledTimes(1);
    expect(dynamicOverlay.isAttached).toBe(false);
    expect(dynamicOverlay.getContainer()).toBe(null);
    expect(createOverlaySpy).toHaveBeenCalledTimes(1);

    dynamicOverlay.show();
    hasAttacheSpy.and.returnValue(true);

    expect(detachSpy).toHaveBeenCalledTimes(1);
    expect(dynamicOverlay.isAttached).toBe(true);
    expect(dynamicOverlay.getContainer()).toBe(container);
    expect(createOverlaySpy).toHaveBeenCalledTimes(1);
  });

  it('should not attach to ref if already shown', () => {
    const attachSpy = spyOn(ref, 'attach').and.callThrough();
    const hasAttacheSpy = spyOn(ref, 'hasAttached');

    dynamicOverlay.show();
    hasAttacheSpy.and.returnValue(true);

    expect(attachSpy).toHaveBeenCalledTimes(1);

    dynamicOverlay.show();

    expect(attachSpy).toHaveBeenCalledTimes(1);
  });

  it('should create/destroy overlay when toggle called', () => {
    const createOverlaySpy = spyOn(overlayService, 'create').and.callThrough();
    const renderSpy = spyOn(instance, 'renderContent').and.callThrough();
    const repositionSpy = spyOn(scrollStrategies, 'reposition').and.callThrough();
    const attachSpy = spyOn(ref, 'attach').and.callThrough();
    const detachSpy = spyOn(ref, 'detach').and.callThrough();
    const hasAttacheSpy = spyOn(ref, 'hasAttached');

    hasAttacheSpy.and.returnValue(false);

    dynamicOverlay.toggle();

    expect(createOverlaySpy).toHaveBeenCalledTimes(1);
    expect(renderSpy).toHaveBeenCalledTimes(1);
    expect(repositionSpy).toHaveBeenCalledTimes(1);
    expect(attachSpy).toHaveBeenCalledTimes(1);
    expect(detachSpy).toHaveBeenCalledTimes(0);

    hasAttacheSpy.and.returnValue(true);

    dynamicOverlay.toggle();

    expect(createOverlaySpy).toHaveBeenCalledTimes(1);
    expect(renderSpy).toHaveBeenCalledTimes(1);
    expect(repositionSpy).toHaveBeenCalledTimes(1);
    expect(attachSpy).toHaveBeenCalledTimes(1);
    expect(detachSpy).toHaveBeenCalledTimes(1);
  });

  it('should dispose ref', () => {
    const detachSpy = spyOn(ref, 'detach').and.callThrough();
    const disposeSpy = spyOn(ref, 'dispose').and.callThrough();
    dynamicOverlay.show();
    dynamicOverlay.dispose();

    expect(detachSpy).toHaveBeenCalledTimes(1);
    expect(disposeSpy).toHaveBeenCalledTimes(1);
  });

  it('should set content', () => {
    const newContent = 'new content';
    dynamicOverlay.setContent(newContent);
    dynamicOverlay.show();

    expect(instance.content).toBe(newContent);
  });

  it('should set overlay config', () => {
    const overlayConfig: NbOverlayConfig = { panelClass: 'additional-overlay-class' };
    const createOverlaySpy = spyOn(overlayService, 'create').and.callThrough();

    dynamicOverlay.setOverlayConfig(overlayConfig);
    dynamicOverlay.show();

    expect(createOverlaySpy).toHaveBeenCalledWith(jasmine.objectContaining(overlayConfig));
  });

  it('should return container', () => {
    dynamicOverlay.show();
    expect(dynamicOverlay.getContainer()).toBe(container as any);
  });

  it('should set content when shown', () => {
    const renderContentSpy = spyOn(instance, 'renderContent').and.callThrough();
    const updatePositionSpy = spyOn(ref, 'updatePosition').and.callThrough();

    dynamicOverlay.show();
    const newContent = 'new content';
    zone.simulateZoneExit();
    dynamicOverlay.setContent(newContent);

    expect(instance.content).toBe(newContent);
    expect(renderContentSpy).toHaveBeenCalledTimes(2);
    expect(updatePositionSpy).toHaveBeenCalledTimes(1);
  });

  it('should set context when shown', () => {
    const renderContentSpy = spyOn(instance, 'renderContent').and.callThrough();
    const updatePositionSpy = spyOn(ref, 'updatePosition').and.callThrough();

    dynamicOverlay.show();
    const newContext = { some: 'thing' };
    zone.simulateZoneExit();
    dynamicOverlay.setContext(newContext);

    expect(instance.context).toBe(newContext);
    expect(renderContentSpy).toHaveBeenCalledTimes(2);
    expect(updatePositionSpy).toHaveBeenCalledTimes(1);
  });

  it('should set context & content when shown', () => {
    const renderContentSpy = spyOn(instance, 'renderContent').and.callThrough();
    const updatePositionSpy = spyOn(ref, 'updatePosition').and.callThrough();

    dynamicOverlay.show();
    const newContext = { some: 'thing' };
    const newContent = 'new content';
    zone.simulateZoneExit();
    dynamicOverlay.setContent(newContent);
    zone.simulateZoneExit();
    dynamicOverlay.setContext(newContext);

    expect(instance.context).toBe(newContext);
    expect(instance.content).toBe(newContent);
    expect(renderContentSpy).toHaveBeenCalledTimes(3);
    expect(updatePositionSpy).toHaveBeenCalledTimes(2);
  });

  it('should set component', () => {
    const disposeSpy = spyOn(ref, 'dispose').and.callThrough();
    const attachSpy = spyOn(ref, 'attach').and.callThrough();
    const hasAttacheSpy = spyOn(ref, 'hasAttached');

    dynamicOverlay.setComponent(NbDynamicOverlayMock2Component);

    expect(disposeSpy).toHaveBeenCalledTimes(0);
    expect(attachSpy).toHaveBeenCalledTimes(0);

    dynamicOverlay.show();
    hasAttacheSpy.and.returnValue(true);

    expect(ref.portal.component).toBe(NbDynamicOverlayMock2Component);
    expect(disposeSpy).toHaveBeenCalledTimes(0);
    expect(attachSpy).toHaveBeenCalledTimes(1);

    dynamicOverlay.setComponent(NbDynamicOverlayMockComponent);

    expect(ref.portal.component).toBe(NbDynamicOverlayMockComponent);
    expect(disposeSpy).toHaveBeenCalledTimes(1);
    expect(attachSpy).toHaveBeenCalledTimes(2);

    dynamicOverlay.hide();
    hasAttacheSpy.and.returnValue(false);

    dynamicOverlay.setComponent(NbDynamicOverlayMock2Component);

    expect(disposeSpy).toHaveBeenCalledTimes(2);
    expect(attachSpy).toHaveBeenCalledTimes(2);
  });

  it('should listen to position change', () => {
    dynamicOverlay.show();
    bottomPositionStrategy.positionChange.next('left');
    expect(instance.position).toEqual('left');
  });

  it('should set position strategy', () => {
    const updatePositionSpy = spyOn(ref, 'updatePositionStrategy').and.callThrough();
    dynamicOverlay.setPositionStrategy(topPositionStrategy);
    dynamicOverlay.show();

    // checking that the old subscription doesn't overlaps with the new one
    topPositionStrategy.positionChange.next('right');
    expect(instance.position).toEqual('right');
    expect(overlayService._config.positionStrategy as any).toBe(topPositionStrategy);

    bottomPositionStrategy.positionChange.next('left');
    expect(instance.position).toEqual('right');

    dynamicOverlay.setPositionStrategy(bottomPositionStrategy);
    bottomPositionStrategy.positionChange.next('left');
    expect(instance.position).toEqual('left');
    topPositionStrategy.positionChange.next('right');
    expect(instance.position).toEqual('left');
    expect(updatePositionSpy).toHaveBeenCalledTimes(1);
  });

  it(`should recreate overlay if it's host isn't child of overlay container`, () => {
    dynamicOverlay.show();
    dynamicOverlay.hide();

    const overlayContainer = TestBed.get(NbOverlayContainer);
    const getContainerElementSpy = spyOn(overlayContainer, 'getContainerElement').and.returnValues(
      { contains() { return false; } },
      { contains() { return true; } },
    );

    dynamicOverlay.show();

    expect(getContainerElementSpy).toHaveBeenCalledTimes(2);
  });

  it(`should dispose overlay ref when recreating overlay`, () => {
    const disposeSpy = spyOn(ref, 'dispose').and.callThrough();

    dynamicOverlay.show();
    dynamicOverlay.hide();

    const overlayContainer = TestBed.get(NbOverlayContainer);
    // return false once to force overlay ref recreation and then always return true
    overlayContainer.getContainerElement = () => {
      overlayContainer.getContainerElement = () => ({ contains: () => true });
      return { contains: () => false };
    };

    dynamicOverlay.show();

    expect(disposeSpy).toHaveBeenCalledTimes(1);
  });
});
