/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'form-field-showcase-component',
  template: `
    <nb-card>
      <nb-card-body class="example-items-col">

        <nb-form-field>
          <nb-icon nbPrefix icon="star" pack="eva"></nb-icon>
          <input nbInput type="text">
          <nb-icon nbSuffix icon="star" pack="eva"></nb-icon>
        </nb-form-field>

        <nb-form-field>
          <nb-icon nbPrefix icon="star" pack="eva"></nb-icon>
          <nb-select>
            <nb-option>1</nb-option>
          </nb-select>
        </nb-form-field>

      </nb-card-body>
    </nb-card>
  `,
})
export class FormFieldShowcaseComponent {
}
