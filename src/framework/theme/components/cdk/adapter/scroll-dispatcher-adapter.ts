import { Injectable, NgZone } from '@angular/core';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';

import { NbPlatform } from '../platform/platform-service';
import { NbLayoutScrollService } from '../../../services/scroll.service';

@Injectable()
export class NbScrollDispatcherAdapter extends ScrollDispatcher {
  constructor(ngZone: NgZone, platform: NbPlatform, protected scrollService: NbLayoutScrollService) {
    super(ngZone, platform);
  }

  scrolled(auditTimeInMs?: number): Observable<CdkScrollable | void> {
    return this.scrollService.onScroll();
  }
}

