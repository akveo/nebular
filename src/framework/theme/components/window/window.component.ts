import { Component, ElementRef, HostBinding, Inject, OnDestroy, OnInit, TemplateRef, } from '@angular/core';
import { NbFocusTrap, NbFocusTrapFactoryService } from '../cdk';
import { NbComponentType } from '../cdk/overlay';
import { NB_WINDOW_CONTENT, NbWindowConfig, NbWindowState } from './window-types';
import { NbWindowRef } from './window-ref';

@Component({
  selector: 'nb-window',
  template: `
    <nb-card [size]="config.size">
      <nb-card-header>
        <div cdkFocusInitial class="title" tabindex="-1">{{ config.title }}</div>

        <div class="buttons">
          <button class="button" (click)="minimize()">
            <nb-window-minimize-icon></nb-window-minimize-icon>
          </button>
          <button class="button" *ngIf="isFullScreen" (click)="maximize()">
            <nb-window-collapse-icon></nb-window-collapse-icon>
          </button>
          <button class="button" *ngIf="minimized || maximized" (click)="maximizeOrFullScreen()">
            <nb-window-expand-icon></nb-window-expand-icon>
          </button>
          <button class="button" (click)="close()">
            <nb-window-close-icon></nb-window-close-icon>
          </button>
        </div>
      </nb-card-header>
      <nb-card-body *ngIf="maximized || isFullScreen">
        <nb-overlay-container [content]="content" [context]="config.context">
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
    public windowRef: NbWindowRef,
    public config: NbWindowConfig,
    private focusTrapFactory: NbFocusTrapFactoryService,
    private elementRef: ElementRef,
  ) {}

  ngOnInit() {
    this.focusTrap = this.focusTrapFactory.create(this.elementRef.nativeElement);
    this.focusTrap.blurPreviouslyFocusedElement();
    this.focusTrap.focusInitialElement();
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
