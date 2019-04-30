import { Component } from '@angular/core';

@Component({
  template: `
    <nb-checkbox indeterminate #checkbox>Indeterminate</nb-checkbox>

    <div *ngIf="!checkbox.indeterminate">
      <button nbButton size="small" (click)="checkbox.indeterminate = true">Set indetermiate</button>
    </div>
  `,
  styleUrls: ['./checkbox-indeterminate.component.scss'],
})
export class CheckboxIndeterminateComponent {}
