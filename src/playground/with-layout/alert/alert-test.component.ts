/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-alert-test',
  template: `
    <nb-alert
      *ngFor="let alert of alerts"
      [size]="alert.size"
      [status]="alert.status"
      closable
      (close)="onClose(alert)">
      Success message!
    </nb-alert>

    <nb-alert
      *ngFor="let alert of accentAlerts"
      [size]="alert.size"
      [status]="alert.status"
      [accent]="alert.accent">
      Success message!
    </nb-alert>
  `,
})
export class AlertTestComponent {

  sizes = [ 'tiny', 'small', 'medium', 'large', 'giant' ];
  statuses = [ 'primary', 'success', 'info', 'warning', 'danger' ];
  accents = [ 'primary', 'success', 'info', 'warning', 'danger' ];

  alerts: any[];
  accentAlerts: any;

  constructor() {
    this.alerts = this.prepareAlerts();
    this.accentAlerts = this.prepareAccentAlerts();
  }

  onClose(alert: any) {
    const index = this.alerts.indexOf(alert);
    if (index >= 0) {
      this.alerts.splice(index, 1);
    }
  }

  private prepareAlerts(): any[] {
    const result = [];

    this.statuses.forEach(status => {
      this.sizes.forEach(size => {
        result.push({
          size,
          status,
        });
      });
    });

    return result;
  }

  private prepareAccentAlerts() {
    const { statuses, accents } = this;
    const accentAlerts = [];

    statuses.forEach(status => {
      accents.forEach(accent => {
        accentAlerts.push({
          size: 'small',
          status,
          accent,
        });
      });
    });

    return accentAlerts;
  }
}
