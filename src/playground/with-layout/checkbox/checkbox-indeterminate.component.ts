import { Component } from '@angular/core';

@Component({
  template: `
    <nb-checkbox indeterminate #checkbox>Indeterminate</nb-checkbox>

    <div *ngIf="!checkbox.indeterminate">
      <button nbButton (click)="checkbox.indeterminate = true">Set indetermiate</button>
    </div>
  `,
})
export class CheckboxIndeterminateComponent {}
