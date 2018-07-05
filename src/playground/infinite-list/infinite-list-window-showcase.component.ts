import { Component, ViewChild } from '@angular/core';
import { ListBase } from './list-base';
import { NbInfiniteListComponent } from '@nebular/theme';

@Component({
  template: `
    <nb-infinite-list
      #infiniteList
      [listenWindowScroll]="true"
      [loadMoreThreshold]="2000"
      (loadNext)="loadNext()">

      <nb-list-item
        *ngFor="let item of items; trackBy: getIndex"
        [class.placeholder]="item.isPlaceholder">
        {{ item.isPlaceholder ? 'placeholder' : 'item' }} {{ item.humanNumber }}
      </nb-list-item>

      <button nbDisableAutoLoadButton>Disable auto loading</button>
      <button
        *ngIf="!infiniteListComponent?.autoLoading"
        nbLoadMoreButtonDirective>
        Load more
      </button>

    </nb-infinite-list>
  `,
  styleUrls: [ './infinite-window.scss' ],
})
export class NbInfiniteListWindowShowcaseComponent extends ListBase {

  @ViewChild('infiniteList')
  infiniteListComponent: NbInfiniteListComponent;

  getIndex(_, { index }) {
    return index;
  }

  loadPrev() {}

  loadNext() {
    this.addPage();
  }
}
