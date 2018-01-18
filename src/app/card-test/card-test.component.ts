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

        <h3>Accent Cards</h3>

        <nb-card
          *ngFor="let card of enhancedCards.accentCards"
          [size]="card.size"
          [status]="card.status"
          [accent]="card.accent"
        >
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

        <h3>Reveal Cards</h3>

        <nb-reveal-card *ngFor="let card of enhancedCards.revealCards">
          <nb-card-front>
            <nb-card [accent]="card.accent" [status]="card.status" [size]="card.size">
              <nb-card-header *ngIf="card.size !== 'xxsmall'">
                <span>Front Header</span>
              </nb-card-header>
              <nb-card-body>
                <span>Front Reveal Card Body</span>
              </nb-card-body>
              <nb-card-footer *ngIf="card.size !== 'xxsmall'">
                <span>Front Footer</span>
              </nb-card-footer>
            </nb-card>
          </nb-card-front>
          <nb-card-back>
            <nb-card [accent]="card.accent" [status]="card.status" [size]="card.size">
              <nb-card-header *ngIf="card.size !== 'xxsmall'">
                <span>Back Header</span>
              </nb-card-header>
              <nb-card-body>
                <span>Back Reveal Card Body</span>
              </nb-card-body>
              <nb-card-footer *ngIf="card.size !== 'xxsmall'">
                <span>Back Footer</span>
              </nb-card-footer>
            </nb-card>
          </nb-card-back>
        </nb-reveal-card>

        <h3>Flip Cards</h3>

        <nb-flip-card *ngFor="let card of enhancedCards.flipCards">
          <nb-card-front>
            <nb-card [accent]="card.accent" [status]="card.status" [size]="card.size">
              <nb-card-header *ngIf="card.size !== 'xxsmall'">
                <span>Front Header</span>
              </nb-card-header>
              <nb-card-body>
                <span>Front Flip Card Body</span>
              </nb-card-body>
              <nb-card-footer *ngIf="card.size !== 'xxsmall'">
                <span>Front Footer</span>
              </nb-card-footer>
            </nb-card>
          </nb-card-front>
          <nb-card-back>
            <nb-card [accent]="card.accent" [status]="card.status" [size]="card.size">
              <nb-card-header *ngIf="card.size !== 'xxsmall'">
                <span>Back Header</span>
              </nb-card-header>
              <nb-card-body>
                <span>Back Flip Card Body</span>
              </nb-card-body>
              <nb-card-footer *ngIf="card.size !== 'xxsmall'">
                <span>Back Footer</span>
              </nb-card-footer>
            </nb-card>
          </nb-card-back>
        </nb-flip-card>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbCardTestComponent {

  sizes = ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'];
  statuses = ['primary', 'success', 'info', 'warning', 'danger', 'active', 'disabled'];
  accents = ['primary', 'success', 'info', 'warning', 'danger', 'active', 'disabled'];

  cards: any[];
  enhancedCards: any;

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

  private prepareEnhancedCards() {
    const { sizes, statuses, accents } = this;
    const accentCards = [];
    const revealCards = [];
    const flipCards = [];

    statuses.forEach(status => {
      accents.forEach(accent => {
        accentCards.push({
          size: 'small',
          status,
          accent,
        });
      })
    })

    sizes.forEach(size => {
      const card = { size, accent: '', status: '' };
      revealCards.push(card);
      flipCards.push(card);
    });

    return {
      accentCards,
      revealCards,
      flipCards,
    };
  }
}
