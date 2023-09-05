import { Component } from '@angular/core';

@Component({
  template: `
    <nb-card size="small">
      <nb-card-body>
        <nb-form-field>
          <nb-icon nbPrefix icon="alert-circle-outline"></nb-icon>
          <nb-select placeholder="Select Showcase">
            <nb-option>Reset</nb-option>
            <nb-option value="1">Option 1</nb-option>
            <nb-option value="2">Option 2</nb-option>
            <nb-option value="3">Option 3</nb-option>
          </nb-select>
        </nb-form-field>
      </nb-card-body>
    </nb-card>
  `,
})
export class SelectIconComponent {}
