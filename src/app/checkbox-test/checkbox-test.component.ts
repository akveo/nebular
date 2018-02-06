import { Component } from '@angular/core';

@Component({
  selector: 'nb-app-checkbox-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-checkbox>Regular</nb-checkbox>
        <br>
        <br>
        <nb-checkbox [value]="true">Checked</nb-checkbox>
        <br>
        <br>
        <nb-checkbox [disabled]="true">Disabled</nb-checkbox>
        <br>
        <br>
        <nb-checkbox [value]="true" [disabled]="true">Disabled, checked</nb-checkbox>
      </nb-layout-column>
    </nb-layout>
    `,
})
export class NbCheckboxTestComponent {
}
