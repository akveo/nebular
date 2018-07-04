import { Component } from '@angular/core';
import { ListBase } from './list-base';

@Component({
  template: `
    <div class="infinite-list-container">
      <nb-infinite-list
        [loadMoreThreshold]="1000"
        (loadNext)="loadNext()">

        <nb-list-item
          *ngFor="let item of items; trackBy: getIndex"
          [class.placeholder]="item.isPlaceholder">
          {{ item.isPlaceholder ? 'placeholder' : 'item' }} {{ item.humanNumber }}
        </nb-list-item>

      </nb-infinite-list>
    </div>
  `,
  styleUrls: [
    './infinite-window.scss',
    './infinite-list-showcase.component.scss',
  ],
})
export class NbInfiniteListShowcaseComponent extends ListBase {

  getIndex(_, { index }) {
    return index;
  }

  loadNext() {
    this.addPage();
  }
}
