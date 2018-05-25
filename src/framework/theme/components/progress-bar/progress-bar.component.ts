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
    <h1>test</h1>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NbProgressBarComponent),
    multi: true,
  }],
})
export class NbProgressBarComponent {

  status: string;

  /**
   * Checkbox value
   * @type {number}
   * @private
   */
  @Input('value') _value: number = 0;

}
