import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NB_WINDOW } from '@nebular/theme';
import { EMPTY, Observable, Subject } from 'rxjs';

@Injectable()
export class NgdVisibilityService {

  private readonly isBrowser: boolean;
  private readonly hasIntersectionObserver: boolean;
  private readonly observersByConf = new WeakMap<IntersectionObserverInit, IntersectionObserver>();
  private readonly subscriptions = new WeakMap<Element, Subject<IntersectionObserverEntry>>();

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(NB_WINDOW) private window,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.hasIntersectionObserver = !!this.window.IntersectionObserver;
  }

  observe(target: Element, options: IntersectionObserverInit): Observable<IntersectionObserverEntry> {
    if (!this.isBrowser || !this.hasIntersectionObserver) {
      return EMPTY;
    }

    if (!this.observersByConf.has(options)) {
      this.observersByConf.set(options, new IntersectionObserver(this.emitForTarget.bind(this), options));
    }
    const observer = this.observersByConf.get(options);
    const subscription = new Subject<IntersectionObserverEntry>();

    observer.observe(target);
    this.subscriptions.set(target, subscription);

    return subscription.asObservable();
  }

  unobserve(target: Element, options: IntersectionObserverInit): void {
    const observer = this.observersByConf.get(options);
    if (observer) {
      observer.unobserve(target);

      if (observer.takeRecords().length === 0) {
        observer.disconnect();
        this.observersByConf.delete(options);
      }
    }

    const subscription = this.subscriptions.get(target);
    if (subscription) {
      subscription.complete();
      this.subscriptions.delete(target);
    }
  }

  private emitForTarget(entries: IntersectionObserverEntry[]): void {
    for (const entry of entries) {
      const sub = this.subscriptions.get(entry.target);
      if (sub == null) {
        continue;
      }

      sub.next(entry);
    }
  }
}
