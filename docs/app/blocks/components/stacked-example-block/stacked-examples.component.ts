import { Component, Input } from '@angular/core';

import { NgdExampleView } from '../../enum.example-view';
import { NgdAnalytics } from '../../../@theme/services';

@Component({
  selector: 'ngd-stacked-example-block',
  template: `
    <div>
      <ngd-live-example-block [hidden]="!isLive"
                              [content]="content"
                              hasViewSwitch="true"
                              (changeView)="changeView($event)">
      </ngd-live-example-block>

      <ngd-tabbed-example-block [hidden]="isLive"
                                [content]="content"
                                hasViewSwitch="true"
                                (changeView)="changeView($event)">
      </ngd-tabbed-example-block>
    </div>
  `,
})
export class NgdStackedExampleComponent {

  @Input() content: any;
  isLive = true;

  constructor(private analytics: NgdAnalytics) {
  }

  changeView(view: NgdExampleView) {
    this.analytics.trackEvent('change-example-view', view);
    this.isLive = view === NgdExampleView.LIVE;
  }
}
