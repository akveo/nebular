/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectorRef, Component, HostBinding, Input, TemplateRef, Type, ViewChild } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

import { NbPosition } from '../overlay-position';
import { NbContainer } from '../overlay-renderer';


/**
 * Overlay container.
 * Renders provided content inside.
 *
 * @styles
 *
 * popover-fg
 * popover-bg
 * popover-border
 * popover-shadow
 * */
@Component({
  selector: 'nb-arrowed-overlay-container',
  styleUrls: ['./arrowed-overlay-container.component.scss'],
  template: `
    <span class="arrow"></span>

    <ng-container *ngIf="isTemplate">
      <ng-container *ngTemplateOutlet="content; context: context"></ng-container>
    </ng-container>
    <ng-container *ngIf="isComponent" [ngComponentOutlet]="content"></ng-container>
    <ng-container *ngIf="isPrimitive">
      <div class="primitive-popover">{{content}}</div>
    </ng-container>
  `,
})
export class NbArrowedOverlayContainerComponent implements NbContainer {
  @Input()
  content: any;

  @Input()
  context: Object;

  /**
   * Container position relatively host element.
   * */
  @Input()
  @HostBinding('class')
  position: NbPosition = NbPosition.TOP;

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
