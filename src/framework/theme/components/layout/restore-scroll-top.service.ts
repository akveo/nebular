import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { filter, pairwise, startWith, map } from 'rxjs/operators';
import { getPathPartOfUrl } from '../menu/url-matching-helpers';

/**
 * This service determines whether we should scroll the layout back to top.
 * This occurs when the page is changed, so when current url PATH is not equal to the previous one.
 *
 *  TODO: this is most likely a temporary solutions as recently Angular introduces ViewportScroll
 *  and scroll restoration process
 */
@Injectable()
export class NbRestoreScrollTopHelper {
  constructor(private router: Router) {}

  shouldRestore(): Observable<boolean> {
    return this.router.events.pipe(
      startWith(null),
      filter((event) => event === null || event instanceof NavigationEnd),
      pairwise(),
      map(([prev, current]) => this.pageChanged(prev as NavigationEnd, current as NavigationEnd)),
      filter((res) => !!res),
    );
  }

  private pageChanged(prev: NavigationEnd, current: NavigationEnd) {
    return !prev || getPathPartOfUrl(prev.url) !== getPathPartOfUrl(current.url);
  }
}
