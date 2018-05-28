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
      <div class="progress-value {{type ? '' + type : ''}}" [style.width.%]="getWidth()">
        <span *ngIf="displayValue">{{getDisplayValue()}}%</span>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./progress-bar.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NbProgressBarComponent),
    multi: true,
  }],
})
export class NbProgressBarComponent {

  @Input() value: number = 0;
  @Input() type: string;
  @Input() displayValue: boolean = false;

  getWidth() {
    return this.value;
  }

  getDisplayValue() {
    return this.value;
  }

}
