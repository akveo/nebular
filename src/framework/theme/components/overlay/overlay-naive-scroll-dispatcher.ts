import { Injectable, NgZone } from '@angular/core';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';

import { NbPlatform } from './overlay-cdk.module';
import { NbLayoutScrollService } from '../../services/scroll.service';
import { Observable } from 'rxjs';

@Injectable()
export class NbNaiveScrollDispatcherService extends ScrollDispatcher {
  constructor(_ngZone: NgZone, _platform: NbPlatform, protected scrollService: NbLayoutScrollService) {
    super(_ngZone, _platform);
  }

  scrolled(auditTimeInMs?: number): Observable<CdkScrollable | void> {
    return this.scrollService.onScroll();
  }
}

