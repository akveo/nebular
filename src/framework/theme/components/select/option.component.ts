/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, HostListener, Output } from '@angular/core';


@Component({
  selector: 'nb-option',
  template: '<ng-content></ng-content>',
  styles: [
    `
      :host {
        display: block;
      }

      :host:hover {
        background-color: lightgrey;
        cursor: pointer;
      }
    `,
  ],
})
export class NbOptionComponent {
  @Output() readonly select: EventEmitter<void> = new EventEmitter();

  @HostListener('click')
  onClick() {
    this.select.emit();
  }
}

