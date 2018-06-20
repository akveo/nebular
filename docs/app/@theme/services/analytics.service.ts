import { Injectable, Inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

import { filter } from 'rxjs/operators';
import { NB_WINDOW } from '@nebular/theme';
declare const ga: any;

@Injectable()
export class NgdAnalytics {
  private enabled: boolean;

  constructor(@Inject(NB_WINDOW) private window,
              private location: Location,
              private router: Router) {
    this.enabled = this.window.location.href.indexOf('akveo.github.io') >= 0;
  }

  trackPageViews() {
    if (this.enabled) {
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
      )
        .subscribe(() => {
          ga('send', {hitType: 'pageview', page: this.location.path()});
        });
    }
  }

  trackEvent(eventName: string, eventVal: string = '') {
    if (this.enabled) {
      ga('send', 'event', eventName, eventVal);
    }
  }
}
