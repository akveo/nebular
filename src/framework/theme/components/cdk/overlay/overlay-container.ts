import { ChangeDetectorRef, Component, HostBinding, Input, TemplateRef, Type, ViewChild } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

import { NbPosition } from './overlay-position';

export abstract class NbPositionedContainer {
  @Input() position: NbPosition;

  @HostBinding('class.top')
  get top(): boolean {
    return this.position === NbPosition.TOP
  }

  @HostBinding('class.right')
  get right(): boolean {
    return this.position === NbPosition.RIGHT
  }

  @HostBinding('class.bottom')
  get bottom(): boolean {
    return this.position === NbPosition.BOTTOM
  }

  @HostBinding('class.left')
  get left(): boolean {
    return this.position === NbPosition.LEFT
  }
}

@Component({
  selector: 'nb-overlay-container',
  template: `
    <ng-container *ngIf="isTemplate">
      <ng-container *ngTemplateOutlet="content; context: context"></ng-container>
    </ng-container>
    <ng-container *ngIf="isComponent" [ngComponentOutlet]="content"></ng-container>
    <ng-container *ngIf="isPrimitive">
      <div class="primitive-overlay">{{content}}</div>
    </ng-container>
  `,
})
export class NbOverlayContainerComponent {
  @Input()
  content: any;

  @Input()
  context: Object;

  constructor(private cd: ChangeDetectorRef) {
  }

  @ViewChild(NgComponentOutlet)
  set componentOutlet(el) {
    if (this.isComponent) {
      Object.assign(el._componentRef.instance, this.context);
      /**
       * Change detection have to performed here, because another way applied context
       * will be rendered on the next change detection loop and
       * we'll have incorrect positioning. Because rendered component may change its size
       * based on the context.
       * */
      this.cd.detectChanges();
    }
  }

  /**
   * Check that content is a TemplateRef.
   *
   * @return boolean
   * */
  get isTemplate(): boolean {
    return this.content instanceof TemplateRef;
  }

  /**
   * Check that content is an angular component.
   *
   * @return boolean
   * */
  get isComponent(): boolean {
    return this.content instanceof Type;
  }

  /**
   * Check that if content is not a TemplateRef or an angular component it means a primitive.
   * */
  get isPrimitive(): boolean {
    return !this.isTemplate && !this.isComponent;
  }
}
