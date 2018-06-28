import { Component } from '@angular/core';

@Component({
  template: `
    <nb-infinite-list
      [listenWindowScroll]="true"
      [loadMoreThreshold]="2000"
      (loadNext)="loadNext()"
      tag="fullPageScroll">

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
  styleUrls: [
    '../list-showcase.component.scss',
    './infinite-window.scss',
  ],
})
export class NbInfiniteListWindowShowcaseComponent {

  private pageSize = 20;
  private maxLength = 100000;
  items = [];

  constructor() {
    for (let i = 0; i < this.pageSize; i++) {
      this.items.push({ index: i, humanNumber: i + 1 });
    }
  }

  getIndex(_, { index }) {
    return index;
  }

  loadNext(page) {
    if (this.items.length >= this.maxLength) {
      return;
    }

    const placeholders = [];
    const nextItem = this.items[this.items.length - 1].index + 1;
    const maxItem = nextItem + this.pageSize;
    for (let i = nextItem; i < maxItem; i++) {
      placeholders.push({ index: i, humanNumber: i + 1, isPlaceholder: true });
    }

    this.items = this.items.concat(placeholders);

    setTimeout(() => {
      for (let i = nextItem; i < maxItem; i++) {
        this.items[i].isPlaceholder = false;
      }
    }, 1000);
  }
}
