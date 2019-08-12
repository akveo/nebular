import { Component } from '@angular/core';

@Component({
  template: `
    <nb-card>
      <nb-card-body>
        <input type="text" nbInput placeholder="Initial width">
        <input type="text" nbInput fullWidth placeholder="Full width">
        <textarea nbInput placeholder="Initial width"></textarea>
        <textarea nbInput fullWidth placeholder="Full width"></textarea>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./input-component.scss'],
})
export class InputFullWidthComponent {}
