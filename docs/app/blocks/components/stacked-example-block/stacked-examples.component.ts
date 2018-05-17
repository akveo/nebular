import { Component, Input } from '@angular/core';

import { NgdExampleView } from '../../enum.example-view';

@Component({
  selector: 'ngd-stacked-example-block',
  template: `
    <div>
      <ngd-live-example-block [hidden]="!isLive"
                              [id]="content.id"
                              [title]="'example'"
                              (changeView)="changeView($event)">
      </ngd-live-example-block>

      <ngd-tabbed-example-block [hidden]="isLive"
                                [content]="content.tabs"
                                [showLiveViewButton]="true"
                                (changeView)="changeView($event)">
      </ngd-tabbed-example-block>
    </div>
  `,
})
export class NgdStackedExampleComponent {

  @Input() content: any;
  isLive = true;

  changeView(view: NgdExampleView) {
    this.isLive = view === NgdExampleView.LIVE;
  }
}
