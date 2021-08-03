import { Component } from '@angular/core';

@Component({
  template: `
    <nb-card>
      <nb-card-body class="example-items-col">
        <input type="text" nbInput fullWidth shape="rectangle" placeholder="Rectangle">
        <input type="text" nbInput fullWidth shape="semi-round" placeholder="Semi round">
        <input type="text" nbInput fullWidth shape="round" placeholder="Round">
      </nb-card-body>
    </nb-card>
  `,
})
export class InputShapesComponent {}
