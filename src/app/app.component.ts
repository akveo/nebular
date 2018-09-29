/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <div class="options-bar" dir="ltr">
      <ng-container *ngIf="optionsVisible">
        <nb-layout-direction-toggle></nb-layout-direction-toggle>
        <nb-layout-theme-toggle></nb-layout-theme-toggle>
      </ng-container>
      <button (click)="toggle()" [class.fixed]="!optionsVisible" class="options-show">
        <ng-container *ngIf="optionsVisible">hide</ng-container>
        <ng-container *ngIf="!optionsVisible">show</ng-container>
      </button>
    </div>
    <router-outlet></router-outlet>
  `,
})
export class NbAppComponent {

  optionsVisible = true;

  toggle() {
    this.optionsVisible = !this.optionsVisible;
  }
}
