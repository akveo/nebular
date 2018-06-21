import { Component, OnInit, Input, Output, EventEmitter, Inject, ElementRef } from '@angular/core';
import { NB_DOCUMENT } from '../../../theme.options';

@Component({
  selector: 'nb-infinite-list',
  template: `
    <nb-list
      [role]="role"
      [nbScrollThreshold]="loadMoreThreshold"
      [listenWindowScroll]="listenWindowScroll"
      (thresholdReached)="emitLoadNext()">
      <ng-content></ng-content>
    </nb-list>
  `,
})
export class NbInfiniteListComponent implements OnInit {

  private screensCountBeforeTrigger = 3;

  @Input() role = 'feed';

  @Input() listenWindowScroll = false;

  @Input() loadMoreThreshold;

  @Output() loadNext = new EventEmitter();

  constructor(
    @Inject(NB_DOCUMENT) private document,
    private elemntRef: ElementRef,
  ) {}

  emitLoadNext() {
    this.loadNext.emit();
  }

  ngOnInit() {
    if (!this.loadMoreThreshold) {
      const element = this.listenWindowScroll
        ? this.document.body
        : this.elemntRef;
      this.loadMoreThreshold = element.clientHeight * this.screensCountBeforeTrigger;
    }
  }
}
