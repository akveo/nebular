import { Component, ElementRef, HostBinding, Inject, OnDestroy, OnInit, TemplateRef, Renderer2 } from '@angular/core';
import { NbFocusTrap, NbFocusTrapFactoryService } from '../cdk';
import { NbComponentType } from '../cdk/overlay';
import { NB_WINDOW_CONTENT, NbWindowConfig, NbWindowState, NB_WINDOW_CONTEXT } from './window.options';
import { NbWindowRef } from './window-ref';

@Component({
  selector: 'nb-window',
  template: `
    <nb-card>
      <nb-card-header>
        <div cdkFocusInitial class="title" tabindex="-1">{{ config.title }}</div>

        <div class="buttons">
          <button class="button" (click)="minimize()">
            <i class="nb-fold"></i>
          </button>
          <button class="button" *ngIf="isFullScreen" (click)="maximize()">
            <i class="nb-minimize"></i>
          </button>
          <button class="button" *ngIf="minimized || maximized" (click)="maximizeOrFullScreen()">
            <i class="nb-maximize"></i>
          </button>
          <button class="button" (click)="close()">
            <i class="nb-close"></i>
          </button>
        </div>
      </nb-card-header>
      <nb-card-body *ngIf="maximized || isFullScreen">
        <nb-overlay-container [content]="content" [context]="context">
        </nb-overlay-container>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./window.component.scss'],
})
export class NbWindowComponent implements OnInit, OnDestroy {
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
}
