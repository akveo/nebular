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

      :host span {
        padding: 0.5rem;
        display: block;
      }

      :host /deep/ nb-option {
        padding: 0.75rem 0.75rem 0.75rem 2.5rem;
      }
    `,
  ],
})
export class NbOptionGroupComponent {
  @Input() title: string;
}


