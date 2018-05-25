/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {Component, Input, forwardRef} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

/**
 //TODO docs
 */
@Component({
  selector: 'nb-progress-bar',
  template: `
    <div class="progress-container">
      <div class="progress-value {{type ? '' + type : ''}}" [style.width.%]="getWidth()"></div>
    </div>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NbProgressBarComponent),
    multi: true,
  }],
})
export class NbProgressBarComponent {

  @Input('value') value: number = 0;
  @Input() type: string;

  getWidth() {
    return this.value;
  }

}
