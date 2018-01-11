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

        <nb-card *ngFor="let accent of accents" size="small" [accent]="accent">
          <nb-card-header>
            <span>Header</span>
          </nb-card-header>
          <nb-card-body>
            <span>Body</span>
          </nb-card-body>
          <nb-card-footer>
            <span>Footer</span>
          </nb-card-footer>
        </nb-card>

        <div class="row">
          <div class="col-xl-4 col-md-6 col-sm-12" *ngFor="let card of enhancedCards">
            <nb-reveal-card [size]="card.size">
              <nb-card class="card-front" [accent]="card.accent" [status]="card.status">
                <nb-card-header *ngIf="card.size !== 'xxsmall'">
                  <span>Header</span>
                </nb-card-header>
                <nb-card-body>
                <span>Reveal Card Body</span>
                </nb-card-body>
                <nb-card-footer *ngIf="card.size !== 'xxsmall'">
                  <span>Footer</span>
                </nb-card-footer>
              </nb-card>
              <nb-card class="card-back">
                <nb-card-body>
                  <span>Back</span>
                </nb-card-body>
              </nb-card>
            </nb-reveal-card>
          </div>
        </div>

        <div class="row">
          <div class="col-xl-4 col-md-6 col-sm-12" *ngFor="let card of enhancedCards">
            <nb-flip-card [size]="card.size">
              <nb-card class="card-front" [accent]="card.accent" [status]="card.status">
                <nb-card-header *ngIf="card.size !== 'xxsmall'">
                  <span>Header</span>
                </nb-card-header>
                <nb-card-body>
                <span>Flip Card Body</span>
                </nb-card-body>
                <nb-card-footer *ngIf="card.size !== 'xxsmall'">
                  <span>Footer</span>
                </nb-card-footer>
              </nb-card>
              <nb-card class="card-back">
                <nb-card-body>
                  <span>Back</span>
                </nb-card-body>
              </nb-card>
            </nb-flip-card>
          </div>
        </div>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbCardTestComponent {

  sizes = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'];
  statuses = ['primary', 'success', 'info', 'warning', 'danger', 'active', 'disabled'];
  accents = ['primary', 'success', 'info', 'warning', 'danger', 'active', 'disabled'];

  cards: any[];
  enhancedCards: any[];

  constructor() {
    this.cards = this.prepareCards();
    this.enhancedCards = this.prepareEnhancedCards();
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

  private prepareEnhancedCards(): any[] {
    const result = [];
    const statusSamples = ['', 'primary']

    this.sizes.forEach(size => {
      this.accents.forEach(accent => {
        statusSamples.forEach(status => {
          result.push({
            size,
            accent,
            status,
         });
        });
      });
    });

    return result;
  }
}
