import { Component } from '@angular/core';
import { ListBase } from './list-base';

@Component({
  selector: 'nb-infinite-images-list',
  template: `
    <nb-list
      nbInfiniteList
      [threshold]="500"
      [listenWindowScroll]="true"
      (loadNext)="addPage()">
      <nb-list-item *ngFor="let item of items">
        <nb-random-svg [isLoading]="item.isPlaceholder"></nb-random-svg>
      </nb-list-item>
    </nb-list>
  `,
})
export class NbInfiniteImagesListComponent extends ListBase {}
