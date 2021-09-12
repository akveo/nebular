/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbWindowService } from '../../../framework/theme/components/window/window.service';
import { VisitorsFormComponent } from './components/visitors-form.component';

@Component({
  selector: 'nb-window-result',
  template: `
    <button nbButton status="primary" (click)="openWindow()">Open window</button>
    <br>
    <h3 class="h5">Window visitors:</h3>
    <ul>
      <li *ngFor="let visitor of visitors">{{ visitor }}</li>
    </ul>
  `,
  styleUrls: ['./window.scss'],
})
export class WindowResultComponent {
  visitors: string[] = [];

  constructor(private windowService: NbWindowService) {
  }

  openWindow() {
    this.windowService.open(VisitorsFormComponent, {title: `Window`})
      .onClose.subscribe((visitor: string) => visitor && this.visitors.push(visitor));
  }
}
