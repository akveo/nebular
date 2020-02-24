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
          <input nbInput fieldSize="tiny" type="text">
          <nb-icon nbSuffix icon="star" pack="eva"></nb-icon>
        </nb-form-field>

        <nb-form-field>
          <nb-icon nbPrefix icon="star" pack="eva"></nb-icon>
          <input nbInput fieldSize="small" type="text">
          <nb-icon nbSuffix icon="star" pack="eva"></nb-icon>
        </nb-form-field>

        <nb-form-field>
          <nb-icon nbPrefix icon="star" pack="eva"></nb-icon>
          <input nbInput fieldSize="medium" type="text">
          <nb-icon nbSuffix icon="star" pack="eva"></nb-icon>
        </nb-form-field>

        <nb-form-field>
          <nb-icon nbPrefix icon="star" pack="eva"></nb-icon>
          <input nbInput fieldSize="large" type="text">
          <nb-icon nbSuffix icon="star" pack="eva"></nb-icon>
        </nb-form-field>

        <nb-form-field>
          <nb-icon nbPrefix icon="star" pack="eva"></nb-icon>
          <input nbInput fieldSize="giant" type="text">
          <nb-icon nbSuffix icon="star" pack="eva"></nb-icon>
        </nb-form-field>

        <br>

        <nb-form-field>
          <nb-icon nbPrefix icon="star" pack="eva"></nb-icon>
          <input nbInput status="basic" type="text">
          <nb-icon nbSuffix icon="star" pack="eva"></nb-icon>
        </nb-form-field>

        <nb-form-field>
          <nb-icon nbPrefix icon="star" pack="eva"></nb-icon>
          <input nbInput status="primary" type="text">
          <nb-icon nbSuffix icon="star" pack="eva"></nb-icon>
        </nb-form-field>

        <nb-form-field>
          <nb-icon nbPrefix icon="star" pack="eva"></nb-icon>
          <input nbInput status="success" type="text">
          <nb-icon nbSuffix icon="star" pack="eva"></nb-icon>
        </nb-form-field>

        <nb-form-field>
          <nb-icon nbPrefix icon="star" pack="eva"></nb-icon>
          <input nbInput status="info" type="text">
          <nb-icon nbSuffix icon="star" pack="eva"></nb-icon>
        </nb-form-field>

        <nb-form-field>
          <nb-icon nbPrefix icon="star" pack="eva"></nb-icon>
          <input nbInput status="warning" type="text">
          <nb-icon nbSuffix icon="star" pack="eva"></nb-icon>
        </nb-form-field>

        <nb-form-field>
          <nb-icon nbPrefix icon="star" pack="eva"></nb-icon>
          <input nbInput status="danger" type="text">
          <nb-icon nbSuffix icon="star" pack="eva"></nb-icon>
        </nb-form-field>

        <div class="control-status-example">
          <nb-form-field>
            <nb-icon nbPrefix icon="star" pack="eva"></nb-icon>
            <input nbInput status="control" type="text">
            <nb-icon nbSuffix icon="star" pack="eva"></nb-icon>
          </nb-form-field>
        </div>

      </nb-card-body>
    </nb-card>
  `,
})
export class FormFieldShowcaseComponent {
}
