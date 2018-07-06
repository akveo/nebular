import { Component } from '@angular/core';
import { ListBase } from './list-base';

@Component({
  selector: 'nb-infinite-images-list',
  template: `
    <nb-infinite-list
      [listenWindowScroll]="true"
      [loadMoreThreshold]="20000"
      (loadNext)="addPage()">
      <nb-list-item *ngFor="let item of items">
        <nb-random-svg [isLoading]="item.isPlaceholder"></nb-random-svg>
      </nb-list-item>
    </nb-infinite-list>
  `,
  styles: [`

  `],
})
export class NbInfiniteImagesListComponent extends ListBase {

  newItem(index: number) {
    return this.simpleNewItem(index);
  }
}
