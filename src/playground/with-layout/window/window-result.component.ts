/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { VisitorsFormComponent } from './components/visitors-form.component';

@Component({
  template: `
    <button nbButton status="primary" (click)="openWindow()">Open window</button>
    <br />
    <h3 class="h5">Window visitors:</h3>
    <ul>
      <li *ngFor="let visitor of visitors">{{ visitor }}</li>
    </ul>
  `,
  styleUrls: ['./window.scss'],
})
export class WindowResultComponent {
  visitors: string[] = [];

  constructor(private windowService: NbWindowService) {}

  openWindow() {
    const windowRef = this.windowService.open(VisitorsFormComponent, { title: `Window` });

    windowRef.onClose.subscribe((visitor) => this.visitors.push(visitor));
  }
}
