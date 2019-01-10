import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NB_WINDOW } from '@nebular/theme';
import { EMPTY, Observable, Subject } from 'rxjs';
import { filter, finalize, map, publish, refCount, takeUntil } from 'rxjs/operators';

interface ObserverWithStream {
  observer: IntersectionObserver;
  observable: Observable<IntersectionObserverEntry[]>;
}

@Injectable()
export class NgdVisibilityService {

  private readonly isBrowser: boolean;
  private readonly supportsIntersectionObserver: boolean;

  private readonly observers = new Map<IntersectionObserverInit, ObserverWithStream>();
  private readonly unobserve$ = new Subject<{ target: Element, options: IntersectionObserverInit }>();

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(NB_WINDOW) private window,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.supportsIntersectionObserver = !!this.window.IntersectionObserver;
  }

  observe(target: Element, options: IntersectionObserverInit): Observable<IntersectionObserverEntry> {
    if (!this.isBrowser || !this.supportsIntersectionObserver) {
      return EMPTY;
    }

    const { observer, observable } = this.observers.get(options) || this.addObserver(options);
    observer.observe(target);

    const targetUnobserved$ = this.unobserve$.pipe(filter(e => e.target === target && e.options === options));

    return observable.pipe(
      map((entries: IntersectionObserverEntry[]) => entries.find(entry => entry.target === target)),
      filter(entry => !!entry),
      finalize(() => observer.unobserve(target)),
      takeUntil(targetUnobserved$),
    );
  }

  unobserve(target: Element, options: IntersectionObserverInit): void {
    this.unobserve$.next({ target, options });
  }

  private addObserver(options: IntersectionObserverInit): ObserverWithStream {
    const observerStream = new Subject<IntersectionObserverEntry[]>();
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => observerStream.next(entries),
      options,
    );
    const refCountedObserver = observerStream.pipe(
      finalize(() => {
        this.observers.delete(options);
        observer.disconnect();
      }),
      publish(),
      refCount(),
    );

    const data: ObserverWithStream = { observer, observable: refCountedObserver };
    this.observers.set(options, data);

    return data;
  }
}
