import { Component } from '@angular/core';

@Component({
  template: `
    <nb-card>
      <nb-card-body class="example-items-col">
        <input type="text" nbInput placeholder="Initial width">
        <input type="text" nbInput fullWidth placeholder="Full width">
        <textarea nbInput placeholder="Initial width"></textarea>
        <textarea nbInput fullWidth placeholder="Full width"></textarea>
      </nb-card-body>
    </nb-card>
  `,
})
export class InputFullWidthComponent {}
