import { Inject, Injectable, NgZone } from '@angular/core';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';
import { merge, Observable } from 'rxjs';

import { NbPlatform } from '../platform/platform-service';
import { NbLayoutScrollService } from '../../../services/scroll.service';
import { NB_DOCUMENT } from '../../../theme.options';

@Injectable()
export class NbScrollDispatcherAdapter extends ScrollDispatcher {
  constructor(
    ngZone: NgZone,
    platform: NbPlatform,
    protected scrollService: NbLayoutScrollService,
    @Inject(NB_DOCUMENT) document: any,
  ) {
    super(ngZone, platform, document);
  }

  scrolled(auditTimeInMs?: number): Observable<CdkScrollable | void> {
    return merge(super.scrolled(auditTimeInMs), this.scrollService.onScroll());
  }
}
