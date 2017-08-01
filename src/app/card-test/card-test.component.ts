/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-card-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card *ngFor="let card of cards" [size]="card.size" [status]="card.status">
          <nb-card-header>
            <span>Header</span>
          </nb-card-header>
          <nb-card-body *ngIf="card.size !== 'xxsmall'">
            <span>Body</span>
          </nb-card-body>
          <nb-card-footer *ngIf="card.size !== 'xxsmall'">
            <span>Footer</span>
          </nb-card-footer>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbCardTestComponent {

  sizes = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'];
  statuses = ['primary', 'success', 'info', 'warning', 'danger', 'active', 'disabled'];

  cards: any[];

  constructor() {
    this.cards = this.prepareCards();
  }

  private prepareCards(): any[] {
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
}
