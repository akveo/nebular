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
  styleUrls: [ './infintie-list.component.scss' ],
})
export class NbInfiniteListComponent {

  @Input() role = 'feed';

  @Input()
  @HostBinding('class.window-scroll')
  listenWindowScroll = false;

  @Input() loadMoreThreshold;

  @Output() loadNext = new EventEmitter();

  emitLoadNext() {
    this.loadNext.emit();
  }
}
