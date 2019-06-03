import {
  Component,
  ElementRef,
  HostBinding,
  Inject,
  OnDestroy,
  OnInit,
  TemplateRef,
  Renderer2,
  ViewChild,
  Type,
  ComponentFactoryResolver,
  Input,
  AfterViewChecked,
} from '@angular/core';
import { NbFocusTrap, NbFocusTrapFactoryService } from '../cdk/a11y/focus-trap';
import { NbComponentPortal, NbComponentType, NbTemplatePortal } from '../cdk/overlay/mapping';
import { NbOverlayContainerComponent } from '../cdk/overlay/overlay-container';
import { NB_WINDOW_CONTENT, NbWindowConfig, NbWindowState, NB_WINDOW_CONTEXT } from './window.options';
import { NbWindowRef } from './window-ref';

@Component({
  selector: 'nb-window',
  template: `
    <nb-card>
      <nb-card-header>
        <div cdkFocusInitial class="title" tabindex="-1">{{ config.title }}</div>

        <div class="buttons">
          <button nbButton ghost (click)="minimize()">
            <nb-icon icon="minus-outline" pack="nebular-essentials"></nb-icon>
          </button>
          <button nbButton ghost *ngIf="isFullScreen" (click)="maximize()">
            <nb-icon icon="collapse-outline" pack="nebular-essentials"></nb-icon>
          </button>
          <button nbButton ghost *ngIf="minimized || maximized" (click)="maximizeOrFullScreen()">
            <nb-icon icon="expand-outline" pack="nebular-essentials"></nb-icon>
          </button>
          <button nbButton ghost (click)="close()">
            <nb-icon icon="close-outline" pack="nebular-essentials"></nb-icon>
          </button>
        </div>
      </nb-card-header>
      <nb-card-body *ngIf="maximized || isFullScreen">
        <nb-overlay-container></nb-overlay-container>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./window.component.scss'],
})
export class NbWindowComponent implements OnInit, AfterViewChecked, OnDestroy {
  @Input() cfr: ComponentFactoryResolver;

  @HostBinding('class.full-screen')
  get isFullScreen() {
    return this.windowRef.state === NbWindowState.FULL_SCREEN;
  }

  @HostBinding('class.maximized')
  get maximized() {
    return this.windowRef.state === NbWindowState.MAXIMIZED;
  }

  @HostBinding('class.minimized')
  get minimized() {
    return this.windowRef.state === NbWindowState.MINIMIZED;
  }

  @ViewChild(NbOverlayContainerComponent, { static: false }) overlayContainer: NbOverlayContainerComponent;

  protected focusTrap: NbFocusTrap;

  constructor(
    @Inject(NB_WINDOW_CONTENT) public content: TemplateRef<any> | NbComponentType,
    @Inject(NB_WINDOW_CONTEXT) public context: Object,
    public windowRef: NbWindowRef,
    public config: NbWindowConfig,
    protected focusTrapFactory: NbFocusTrapFactoryService,
    protected elementRef: ElementRef,
    protected renderer: Renderer2,
  ) {}

  ngOnInit() {
    this.focusTrap = this.focusTrapFactory.create(this.elementRef.nativeElement);
    this.focusTrap.blurPreviouslyFocusedElement();
    this.focusTrap.focusInitialElement();

    if (this.config.windowClass) {
      this.renderer.addClass(this.elementRef.nativeElement, this.config.windowClass);
    }
  }

  ngAfterViewChecked() {
    if (!this.overlayContainer || this.overlayContainer.isAttached) {
      return;
    }

    if (this.content instanceof TemplateRef) {
      this.attachTemplate();
    } else {
      this.attachComponent();
    }
  }

  ngOnDestroy() {
    if (this.focusTrap) {
      this.focusTrap.restoreFocus();
    }

    this.close();
  }

  minimize() {
    if (this.windowRef.state === NbWindowState.MINIMIZED) {
      this.windowRef.toPreviousState();
    } else {
      this.windowRef.minimize();
    }
  }

  maximize() {
    this.windowRef.maximize();
  }

  fullScreen() {
    this.windowRef.fullScreen();
  }

  maximizeOrFullScreen() {
    if (this.windowRef.state === NbWindowState.MINIMIZED) {
      this.maximize();
    } else {
      this.fullScreen();
    }
  }

  close() {
    this.windowRef.close();
  }

  protected attachTemplate() {
    this.overlayContainer
      .attachTemplatePortal(new NbTemplatePortal(this.content as TemplateRef<any>, null, this.context));
  }

  protected attachComponent() {
    const portal = new NbComponentPortal(this.content as Type<any>, null, null, this.cfr);
    const ref = this.overlayContainer.attachComponentPortal(portal, this.context);
    ref.changeDetectorRef.detectChanges();
  }
}
