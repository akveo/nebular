import { Component } from '@angular/core';

@Component({
  template: `
    <nb-card size="medium">
      <nb-card-header>
        Simple list
      </nb-card-header>
      <nb-list>
        <nb-list-item *ngFor="let item of items">
          item {{ item.index + 1 }}
        </nb-list-item>
      </nb-list>
    </nb-card>
  `,
  styleUrls: [ './simple-list-showcase.component.scss' ],
})
export class NbSimpleListShowcaseComponent {

  private pageSize = 10;
  items = [];

  constructor() {
    for (let i = 0; i < this.pageSize; i++) {
      this.items.push({ index: i });
    }
  }
}
