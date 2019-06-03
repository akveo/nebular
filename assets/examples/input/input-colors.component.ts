import { Component } from '@angular/core';

@Component({
  template: `
    <nb-card>
      <nb-card-body class="example-items-col">
        <input type="text" nbInput fullWidth placeholder="Default">
        <input type="text" nbInput fullWidth status="primary" placeholder="Primary">
        <input type="text" nbInput fullWidth status="info" placeholder="Info">
        <input type="text" nbInput fullWidth status="success" placeholder="Success">
        <input type="text" nbInput fullWidth status="warning" placeholder="Warning">
        <input type="text" nbInput fullWidth status="danger" placeholder="Danger">
      </nb-card-body>
    </nb-card>
  `,
})
export class InputColorsComponent {}
