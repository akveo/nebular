import { Component } from '@angular/core';

@Component({
  template: `
    <nb-card>
      <nb-card-body class="example-items-row">
        <input type="text" nbInput placeholder="Text field">
        <input type="text" nbInput placeholder="Disabled Text field" disabled>
      </nb-card-body>
    </nb-card>
  `,
})
export class InputsShowcaseComponent {}
