import { Component } from '@angular/core';

@Component({
  template: `
    <nb-list>
      <nb-list-item *ngFor="let item of items">
        item {{ item.index + 1 }}
      </nb-list-item>
    </nb-list>
  `,
  styleUrls: ['./list-showcase.component.scss'],
})
export class NbListShowcaseComponent {

  private pageSize = 10;
  items = [];

  constructor() {
    for (let i = 0; i < this.pageSize; i++) {
      this.items.push({ index: i });
    }
  }
}
