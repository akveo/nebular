import { Component } from '@angular/core';

@Component({
  template: `
    <nb-infinite-list
      [listenWindowScroll]="true"
      [loadMoreThreshold]="2000"
      (loadNext)="loadNext($event)">

      <nb-list-item
        *ngFor="let item of items; trackBy: getIndex"
        [class.placeholder]="item.isPlaceholder">
        {{ item.isPlaceholder ? 'placeholder' : 'item' }} {{ item.humanNumber }}
      </nb-list-item>

      <button
        nbDisableAutoLoadButton
        class="visually-hidden"
        (click)="disableAutoLoading()">
        Disable auto loading of items in list below
      </button>

      <button
        #loadMoreButton
        (click)="loadNext()">
        Load more
      </button>
    </nb-infinite-list>
  `,
  styleUrls: [ './infinite-window.scss' ],
})
export class NbInfiniteListWindowShowcaseComponent {

  private timeout = 1000;

  private page = 1;
  private pageSize = 10;
  private maxLength = 100000;
  items = [];

  getIndex(_, { index }) {
    return index;
  }

  createNewPage(page: number): any[] {
    const pageIndex = page - 1;
    const firstItemIndex = pageIndex * this.pageSize;
    const lastItemIndex = firstItemIndex + this.pageSize;
    const newItems = [];

    for (let i = firstItemIndex; i < lastItemIndex; i++) {
      newItems.push({ index: i, humanNumber: i + 1, isPlaceholder: true })
    }

    setTimeout(
      () => newItems.forEach(i => i.isPlaceholder = false),
      this.timeout,
    );

    return newItems;
  }

  loadPrev() {}

  loadNext() {
    if (this.items.length >= this.maxLength) {
      return;
    }

    this.items.push(...this.createNewPage(this.page++));
  }
}
