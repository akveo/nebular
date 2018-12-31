import { Component } from '@angular/core';
import { fruits } from './fruits-list';

@Component({
  template: `
    <nb-card size="medium">
      <nb-card-header>
        Some fruits
      </nb-card-header>
      <nb-list>
        <nb-list-item *ngFor="let fruit of fruits">
          {{ fruit }}
        </nb-list-item>
      </nb-list>
    </nb-card>
  `,
  styleUrls: [ './simple-list-showcase.component.scss' ],
})
export class SimpleListShowcaseComponent {
  fruits = fruits;
}
