import { Component } from '@angular/core';

@Component({
  template: `
    <nb-checkbox indeterminate #checkbox>Indeterminate</nb-checkbox>

    <div *ngIf="!checkbox.indeterminate">
      <button nbButton size="small" (click)="checkbox.indeterminate = true">Set indeterminate</button>
    </div>
  `,
})
export class CheckboxIndeterminateComponent {}
