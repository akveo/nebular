/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  InjectionToken,
  Input,
  Output,
} from '@angular/core';

export const NB_SELECT = new InjectionToken('select');

@Component({
  selector: 'nb-option',
  template: `
    <nb-checkbox *ngIf="multiple" [(ngModel)]="selected">
      <ng-container *ngTemplateOutlet="content"></ng-container>
    </nb-checkbox>

    <ng-container *ngIf="!multiple">
      <ng-container *ngTemplateOutlet="content"></ng-container>
    </ng-container>

    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>
  `,
  styles: [
      `
      :host {
        display: block;
      }

      :host:hover {
        background-color: lightgrey;
        cursor: pointer;
      }

      :host nb-checkbox {
        pointer-events: none;
      }
    `,
  ],
})
export class NbOptionComponent<T> {
  @Input() value: T;
  @Output() selectionChange: EventEmitter<NbOptionComponent<T>> = new EventEmitter();
  selected: boolean = false;

  constructor(protected elementRef: ElementRef, @Inject(NB_SELECT) protected parent) {
  }

  get content() {
    return this.elementRef.nativeElement.textContent;
  }

  get multiple() {
    return this.parent.multi;
  }

  @HostBinding('class.selected')
  get selectedClass(): boolean {
    return this.selected;
  }

  @HostListener('click')
  onClick() {
    this.selectionChange.emit(this);
  }

  select() {
    this.selected = true;
  }

  deselect() {
    this.selected = false;
  }
}

