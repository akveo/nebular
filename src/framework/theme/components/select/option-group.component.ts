/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input } from '@angular/core';


@Component({
  selector: 'nb-option-group',
  template: `
    <span>{{ title }}</span>
    <ng-content select="nb-option, ng-container"></ng-content>
  `,
  styles: [
      `
      :host {
        display: block;
      }

      :host /deep/ nb-option {
        margin-left: 1rem;
        border-bottom: 1px solid grey;
        padding: 1rem;
      }

      :host /deep/ nb-option:first-child {
        border-top: 1px solid grey;
      }
    `,
  ],
})
export class NbOptionGroupComponent {
  @Input() title: string;
}


