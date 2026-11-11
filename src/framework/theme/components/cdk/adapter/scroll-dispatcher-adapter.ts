import { Injectable } from '@angular/core';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';
import { merge, Observable } from 'rxjs';

import { NbLayoutScrollService } from '../../../services/scroll.service';

@Injectable()
export class NbScrollDispatcherAdapter extends ScrollDispatcher {
  constructor(protected scrollService: NbLayoutScrollService) {
    super();
  }

  scrolled(auditTimeInMs?: number): Observable<CdkScrollable | void> {
    return merge(super.scrolled(auditTimeInMs), this.scrollService.onScroll());
  }
}
