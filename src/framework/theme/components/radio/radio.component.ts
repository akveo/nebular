/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'nb-radio',
  template: `
    <label [attr.for]="id">
      <input type="radio" [name]="name" [attr.id]="id">
      <ng-content></ng-content>
    </label>
  `,
})
export class NbRadioComponent {
  protected static NEXT_UNIQUE_ID: number = 0;

  @Input() name: string;

  @Input() id: string = `nb-radio-${++NbRadioComponent.NEXT_UNIQUE_ID}`;
}
