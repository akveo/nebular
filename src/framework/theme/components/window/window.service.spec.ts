import createSpy = jasmine.createSpy;
import { Component, ElementRef, NgModule, ViewChild, TemplateRef } from '@angular/core';
import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import {
  NbWindowService,
  NbWindowModule,
  NbViewportRulerAdapter,
  NbOverlayContainerAdapter,
  NB_DOCUMENT,
  NbThemeModule,
} from '@nebular/theme';

const WINDOW_CONTENT = 'window content';
@Component({
  selector: 'nb-test-window',
  template: WINDOW_CONTENT,
})
class NbTestWindowComponent {}

@Component({
  selector: 'nb-test-window-with-template',
  template: `
    <ng-template #contentTemplate let-data>
      <p>Static text: {{ data.text }}</p>
    </ng-template>
  `,
})
class NbTestWindowWithTemplateComponent {
  @ViewChild('contentTemplate', { static: false }) contentTemplate: TemplateRef<any>;

  constructor(private ws: NbWindowService) {}

  openWindow() {
    return this.ws.open(
      this.contentTemplate,
      { title: 'Window content from template', context: { text: 'hello world' } },
    );
  }
}

@Component({
  selector: 'nb-test-window-with-component',
  template: `<p id="window-content">window content {{ componentInput }}<p>`,
})
export class TestWindowComponent {}

@NgModule({
  declarations: [NbTestWindowComponent, NbTestWindowWithTemplateComponent, TestWindowComponent],
  entryComponents: [NbTestWindowComponent, NbTestWindowWithTemplateComponent, TestWindowComponent],
})
class NbTestWindowModule {}

let overlayContainerService: NbOverlayContainerAdapter;
let overlayContainer: HTMLElement;
let document: Document;
const queryBackdrop = () => overlayContainer.querySelector('.cdk-overlay-backdrop');
let windowService: NbWindowService;

class NbViewportRulerAdapterMock {
  getViewportSize(): Readonly<{ width: number; height: number; }> {
    return { width: 1000, height: 1000 };
  }

  getViewportScrollPosition(): { left: number; top: number } {
    return { left: 0, top: 0 };
  }
}

describe('window-service', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NbThemeModule.forRoot(),
        NbWindowModule.forRoot(),
        NbTestWindowModule,
      ],
      providers: [
        { provide: NbViewportRulerAdapter, useClass: NbViewportRulerAdapterMock },
      ],
    });
    windowService = TestBed.get(NbWindowService);
    overlayContainerService = TestBed.get(NbOverlayContainerAdapter);
    document = TestBed.get(NB_DOCUMENT);
  });

  beforeEach(() => {
    overlayContainer = document.createElement('div');
    overlayContainerService.setContainer(overlayContainer);
    document.body.appendChild(overlayContainer);
  });

  afterEach(() => {
    overlayContainerService.clearContainer();
    document.body.removeChild(overlayContainer);
  });

  it('should render window', () => {
    const windowRef = windowService.open(NbTestWindowComponent);
    windowRef.componentRef.changeDetectorRef.detectChanges();
    expect(windowRef.componentRef).toBeDefined();
    const windowElement: ElementRef<HTMLElement> = windowRef.componentRef.injector.get(ElementRef);

    expect(windowElement.nativeElement.innerText).toContain(WINDOW_CONTENT);
  });

  it('should set title', () => {
    const title = 'Window title';
    const windowRef = windowService.open(NbTestWindowComponent, { title });
    windowRef.componentRef.changeDetectorRef.detectChanges();
    const windowElement: ElementRef<HTMLElement> = windowRef.componentRef.injector.get(ElementRef);

    expect(windowElement.nativeElement.querySelector('.title').innerHTML).toEqual(title);
  });

  it('should set class if provided', () => {
    const windowClass = 'my-window-class';
    const windowRef = windowService.open(NbTestWindowComponent, { windowClass });
    windowRef.componentRef.changeDetectorRef.detectChanges();
    const windowElement: ElementRef<HTMLElement> = windowRef.componentRef.injector.get(ElementRef);

    expect(windowElement.nativeElement.classList).toContain(windowClass);
  });

  it('should render with backdrop if hasBackdrop is true', () => {
    const windowRef = windowService.open(NbTestWindowComponent, { hasBackdrop: true });
    windowRef.componentRef.changeDetectorRef.detectChanges();

    expect(queryBackdrop()).toBeTruthy();
  });

  it('should render without backdrop if hasBackdrop is false', () => {
    const windowRef = windowService.open(NbTestWindowComponent, { hasBackdrop: false });
    windowRef.componentRef.changeDetectorRef.detectChanges();

    expect(queryBackdrop().hasAttribute('hidden')).toBeTruthy();
  });

  it('should close on backdrop click if closeOnBackdropClick is true', () => {
    const closeSpy = createSpy('closeSpy');
    const windowRef = windowService.open(NbTestWindowComponent, { closeOnBackdropClick: true });
    windowRef.componentRef.changeDetectorRef.detectChanges();
    windowRef.onClose.subscribe(closeSpy);
    queryBackdrop().dispatchEvent(new Event('click'));

    expect(closeSpy).toHaveBeenCalled();
  });

  it('should not close on backdrop click if closeOnBackdropClick is false', () => {
    const closeSpy = createSpy('closeSpy');
    const windowRef = windowService.open(NbTestWindowComponent, { closeOnBackdropClick: false });
    windowRef.componentRef.changeDetectorRef.detectChanges();
    windowRef.onClose.subscribe(closeSpy);
    queryBackdrop().dispatchEvent(new Event('click'));

    expect(closeSpy).not.toHaveBeenCalled();
  });

  it('should close on escape press if closeOnEsc is true', () => {
    const closeSpy = createSpy('closeSpy');
    const windowRef = windowService.open(NbTestWindowComponent, { closeOnEsc: true });
    windowRef.componentRef.changeDetectorRef.detectChanges();
    windowRef.onClose.subscribe(closeSpy);
    document.body.dispatchEvent(new KeyboardEvent('keydown', <any> { keyCode: 27 }));

    expect(closeSpy).toHaveBeenCalled();
  });

  it('should not close on escape press if closeOnEsc is false', () => {
    const closeSpy = createSpy('closeSpy');
    const windowRef = windowService.open(NbTestWindowComponent, { closeOnEsc: false });
    windowRef.componentRef.changeDetectorRef.detectChanges();
    windowRef.onClose.subscribe(closeSpy);
    document.body.dispatchEvent(new KeyboardEvent('keydown', <any> { keyCode: 27 }));

    expect(closeSpy).not.toHaveBeenCalled();
  });

  it('should hide backdrop when window not in a full screen', () => {
    const windowRef = windowService.open(NbTestWindowComponent, { closeOnEsc: false });
    windowRef.componentRef.changeDetectorRef.detectChanges();
    expect(queryBackdrop().hasAttribute('hidden')).toBeFalsy();

    windowRef.minimize();
    windowRef.componentRef.changeDetectorRef.detectChanges();
    expect(queryBackdrop().hasAttribute('hidden')).toBeTruthy();

    windowRef.maximize();
    windowRef.componentRef.changeDetectorRef.detectChanges();
    expect(queryBackdrop().hasAttribute('hidden')).toBeTruthy();

    windowRef.fullScreen();
    windowRef.componentRef.changeDetectorRef.detectChanges();
    expect(queryBackdrop().hasAttribute('hidden')).toBeFalsy();
  });

  it('should keep backdrop while at least one full screen window is open', () => {
    const firstWindow = windowService.open(NbTestWindowComponent);
    const secondWindow = windowService.open(NbTestWindowComponent);
    firstWindow.componentRef.changeDetectorRef.detectChanges();
    secondWindow.componentRef.changeDetectorRef.detectChanges();
    expect(queryBackdrop().hasAttribute('hidden')).toBeFalsy();

    firstWindow.minimize();
    firstWindow.componentRef.changeDetectorRef.detectChanges();
    expect(queryBackdrop().hasAttribute('hidden')).toBeFalsy();

    secondWindow.minimize();
    secondWindow.componentRef.changeDetectorRef.detectChanges();
    expect(queryBackdrop().hasAttribute('hidden')).toBeTruthy();

    firstWindow.fullScreen();
    firstWindow.componentRef.changeDetectorRef.detectChanges();
    expect(queryBackdrop().hasAttribute('hidden')).toBeFalsy();
  });

  it(`shouldn't render window content when minimized`, function() {
    const windowRef = windowService.open(NbTestWindowComponent);
    windowRef.minimize();
    windowRef.componentRef.changeDetectorRef.detectChanges();

    const windowElement: HTMLElement = windowRef.componentRef.location.nativeElement;
    expect(windowElement.querySelector('nb-card-body')).toBeNull();
  });

  it(`should render window content when unminimized`, function() {
    const windowRef = windowService.open(NbTestWindowComponent);
    windowRef.minimize();
    windowRef.componentRef.changeDetectorRef.detectChanges();
    windowRef.maximize();
    windowRef.componentRef.changeDetectorRef.detectChanges();

    const windowElement: HTMLElement = windowRef.componentRef.location.nativeElement;
    expect(windowElement.querySelector('nb-card-body')).not.toBeNull();
  });

  it(`should render window content from template with context`, function() {
    const fixture = TestBed.createComponent(NbTestWindowWithTemplateComponent);
    fixture.detectChanges();

    const windowRef = fixture.componentInstance.openWindow();
    windowRef.componentRef.changeDetectorRef.detectChanges();
    expect(windowRef.componentRef).toBeDefined();

    const windowElement: ElementRef<HTMLElement> = windowRef.componentRef.injector.get(ElementRef);
    expect(windowElement.nativeElement.innerText).toContain('Static text: hello world');
  });

  it(`should render window content from component without context`, function() {
    const windowRef = windowService.open(TestWindowComponent);
    windowRef.componentRef.changeDetectorRef.detectChanges();

    const windowElement: ElementRef<HTMLElement> = windowRef.componentRef.injector.get(ElementRef);
    expect(windowElement.nativeElement.innerText).toEqual('window content');
  });

  it(`should render window content from component with context`, function() {
    const windowRef = windowService.open(TestWindowComponent, { context: { componentInput: 'hello world' }});
    windowRef.componentRef.changeDetectorRef.detectChanges();

    const windowElement: ElementRef<HTMLElement> = windowRef.componentRef.injector.get(ElementRef);
    expect(windowElement.nativeElement.innerText).toEqual('window content hello world');
  });

  it('should create new window container when overlay container changed', fakeAsync(() => {
    const fixture = TestBed.createComponent(NbTestWindowWithTemplateComponent);
    fixture.detectChanges();

    // Show window to force windows container creation
    const windowRef = fixture.componentInstance.openWindow();
    fixture.detectChanges();
    flush();

    windowRef.close();
    fixture.detectChanges();
    flush();

    // Change overlay container
    overlayContainerService.ngOnDestroy();
    overlayContainerService.clearContainer();
    overlayContainer = document.createElement('div');
    overlayContainerService.setContainer(overlayContainer);
    document.body.appendChild(overlayContainer);

    windowService.open(TestWindowComponent);
    fixture.detectChanges();
    flush();

    const windowContent = document.getElementById('window-content');
    expect(document.body.contains(windowContent)).toEqual(true);
  }));
});
