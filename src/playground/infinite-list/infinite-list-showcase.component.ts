import { Component, ViewChild } from '@angular/core';
import { ListBase } from './list-base';
import { NbInfiniteListComponent } from '@nebular/theme';

@Component({
  template: `
    <div class="infinite-list-container">
      <nb-infinite-list
        #infiniteList
        [loadMoreThreshold]="1000"
        (loadNext)="addPage()">

        <nb-list-item
          *ngFor="let item of items; trackBy: getIndex"
          [class.placeholder]="item.isPlaceholder">
          {{ item.isPlaceholder ? 'placeholder' : 'item' }} {{ item.humanNumber }}
        </nb-list-item>

        <button nbDisableAutoLoadButton>Disable auto loading</button>
        <button *ngIf="!infiniteListComponent?.autoLoading" nbLoadMoreButtonDirective>Load more</button>

      </nb-infinite-list>
    </div>
  `,
  styleUrls: [
    './infinite-window.scss',
    './infinite-list-showcase.component.scss',
  ],
})
export class NbInfiniteListShowcaseComponent extends ListBase {

  @ViewChild('infiniteList')
  infiniteListComponent: NbInfiniteListComponent;

  getIndex(_, { index }) {
    return index;
  }
}
