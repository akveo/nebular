import { Component } from '@angular/core';

@Component({
  selector: 'nb-toggle-label-position',
  template: `
    <nb-card>
      <nb-card-body class="example-items-col">
        <nb-toggle labelPosition="start">Showcase Label</nb-toggle>
        <nb-toggle labelPosition="end">Showcase Label</nb-toggle>
        <nb-toggle labelPosition="right">Showcase Label</nb-toggle>
        <nb-toggle labelPosition="left">Showcase Label</nb-toggle>
        <nb-toggle disabled>Showcase Label</nb-toggle>
      </nb-card-body>
    </nb-card>
  `,
})
export class ToggleLabelPositionComponent {
}
