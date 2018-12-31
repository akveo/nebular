import { Component } from '@angular/core';

@Component({
  template: `
    <nb-card>
      <nb-card-body>
        <input type="text" nbInput fullWidth shape="rectangle" placeholder="Rectangle">
        <input type="text" nbInput fullWidth shape="semi-round" placeholder="Semi round">
        <input type="text" nbInput fullWidth shape="round" placeholder="Round">
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./input-component.scss'],
})
export class InputShapesComponent {}
