import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';

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
export class NbInfiniteListComponent {

  private screensCountBeforeTrigger = 3;

  @Input() role = 'feed';

  @Input() listenWindowScroll = false;

  @Input() loadMoreThreshold;

  @Output() loadNext = new EventEmitter();

  emitLoadNext() {
    this.loadNext.emit();
  }
}
