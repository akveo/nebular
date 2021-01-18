import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'nb-toggle-form',
  template: `
    <nb-card>
      <nb-card-body class="example-items-col">
        <nb-toggle [(ngModel)]="toggleNgModel">Toggle with NgModel</nb-toggle>
        <nb-toggle [formControl]="toggleFormControl">Toggle with FormControl</nb-toggle>
      </nb-card-body>
    </nb-card>
  `,
})
export class ToggleFormComponent {

  toggleNgModel = true;

  toggleFormControl = new FormControl();

}
