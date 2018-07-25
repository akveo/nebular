import { Component, Input, Output, EventEmitter, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { NbListComponent } from '@nebular/theme/components/list/list.component';

/**
 * Infinite list component.
 *
 * @stacked-example(Showcase, infinite-list/infinite-news-list.component)
 *
 * @stacked-example(Showcase, infinite-list/card-with-infinite-news-list.component)
 *
 */
@Component({
  selector: 'nb-infinite-list',
  template: `
    <nb-list
      [nbScrollThreshold]="loadMoreThreshold"
      [listenWindowScroll]="listenWindowScroll"
      (bottomThresholdReached)="emitLoadNext()"
      (topThresholdReached)="emitLoadPrev()">
      <ng-content select="nb-list-item"></ng-content>
    </nb-list>
  `,
  styleUrls: [ './infintie-list.component.scss' ],
})
export class NbInfiniteListComponent {

  /**
   * By default component observes self scroll position.
   * If set to `true`, component will observe position of window scroll.
   */
  @Input()
  @HostBinding('class.window-scroll')
  listenWindowScroll = false;

  @HostBinding('class.element-scroll')
  get elementScroll() {
    return !this.listenWindowScroll;
  }

  /**
   * Threshold after which event load more event will be emited.
   * In pixels.
   */
  @Input() loadMoreThreshold: number;

  /**
   * Emits when distance between bottom of the observed element and current scroll position is less than threshold.
   */
  @Output() loadNext = new EventEmitter();

  /**
   * Emits when distance between top of the observed element and current scroll position is less than threshold.
   */
  @Output() loadPrev = new EventEmitter();

  @ViewChild(NbListComponent, { read: ElementRef }) scrollable: ElementRef<Element>;

  emitLoadPrev() {
    this.loadPrev.emit();
  }

  emitLoadNext() {
    this.loadNext.emit();
  }
}
