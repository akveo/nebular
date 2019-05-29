import { Component } from '@angular/core';

@Component({
  template: `
    <nb-card>
      <nb-card-body class="example-items-col">
        <input type="text" nbInput fullWidth fieldSize="tiny" placeholder="Tiny">
        <input type="text" nbInput fullWidth fieldSize="small" placeholder="Small">
        <input type="text" nbInput fullWidth fieldSize="medium" placeholder="Medium">
        <input type="text" nbInput fullWidth fieldSize="large" placeholder="Large">
        <input type="text" nbInput fullWidth fieldSize="giant" placeholder="Giant">
      </nb-card-body>
    </nb-card>
  `,
})
export class InputSizesComponent {}
