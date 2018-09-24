/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-radio-showcase',
  template: `
    <nb-radio-group>
      <nb-radio name="one">Hello 1</nb-radio>
      <nb-radio name="one">Hello 2</nb-radio>
      <nb-radio name="one">Hello 3</nb-radio>
      <nb-radio name="one">Hello 4</nb-radio>
    </nb-radio-group>
  `,
})
export class NbRadioShowcaseComponent {
}

