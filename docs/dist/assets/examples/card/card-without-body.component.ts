import { Component } from '@angular/core';
import { fruits } from '../list/fruits-list';

@Component({
  template: `
    <nb-card [size]="'medium'">
      <nb-card-header>List inside nb-card-body</nb-card-header>
      <nb-card-body>
        <nb-list>
          <nb-list-item *ngFor="let fruit of fruits">
            {{ fruit }}
          </nb-list-item>
        </nb-list>
      </nb-card-body>
    </nb-card>
    <nb-card [size]="'medium'">
      <nb-card-header>List inside nb-card</nb-card-header>
      <nb-list>
        <nb-list-item *ngFor="let fruit of fruits">
          {{ fruit }}
        </nb-list-item>
      </nb-list>
    </nb-card>
  `,
  styles: [`
    nb-card {
      min-width: 18rem;
    }
  `],
  host: { class: 'example-height-60 example-horizontal-spread' },
})
export class CardWithoutBodyComponent {
  fruits = fruits;
}
