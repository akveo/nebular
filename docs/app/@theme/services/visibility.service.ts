import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NB_WINDOW } from '@nebular/theme';
import { EMPTY, Observable, Observer, Subject } from 'rxjs';
import { distinctUntilChanged, filter, finalize, map, publish, refCount, takeUntil, tap } from 'rxjs/operators';

interface ObserverWithStream {
  observer: IntersectionObserver;
  observable: Observable<IntersectionObserverEntry[]>;
}

@Injectable()
export class NgdVisibilityService {

  private readonly isBrowser: boolean;
  private readonly supportsIntersectionObserver: boolean;

  private readonly observers = new Map<IntersectionObserverInit, ObserverWithStream>();
  private readonly topmostChange$ = new Map<IntersectionObserverInit, Observable<Element>>();
  private readonly visibleElements = new Map<IntersectionObserverInit, Element[]>();
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
      filter((entry: IntersectionObserverEntry | undefined) => !!entry),
      finalize(() => observer.unobserve(target)),
      takeUntil(targetUnobserved$),
    );
  }

  isTopmostVisible(target: Element, options: IntersectionObserverInit): Observable<boolean> {
    if (!this.isBrowser || !this.supportsIntersectionObserver) {
      return EMPTY;
    }

    const targetUnobserve$ = this.unobserve$.pipe(filter(e => e.target === target && e.options === options));
    const topmostChange$ = this.topmostChange$.get(options) || this.listenTopmostChange(options);

    const { observer } = this.observers.get(options);
    observer.observe(target);

    return topmostChange$.pipe(
      finalize(() => {
        observer.unobserve(target);
        this.removeFromVisible(options, target);
      }),
      map((element: Element) => element === target),
      distinctUntilChanged(),
      takeUntil(targetUnobserve$),
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
      tap((entries: IntersectionObserverEntry[]) => this.updateVisibleItems(options, entries)),
      publish(),
      refCount(),
    );

    const data: ObserverWithStream = { observer, observable: refCountedObserver };
    this.observers.set(options, data);

    return data;
  }

  private listenTopmostChange(options: IntersectionObserverInit): Observable<Element> {
    const { observable } = this.observers.get(options) || this.addObserver(options);

    const visibilityChange$ = Observable.create((observer: Observer<IntersectionObserverEntry[]>) => {
      const sub = observable.subscribe((entries: IntersectionObserverEntry[]) => observer.next(entries));

      return () => {
        this.visibleElements.delete(options);
        sub.unsubscribe();
      }
    });

    const topmostChange$ = visibilityChange$.pipe(
      map(() => this.findTopmostElement(options)),
      distinctUntilChanged(),
      publish(),
      refCount(),
    );

    this.topmostChange$.set(options, topmostChange$);
    return topmostChange$;
  }

  private updateVisibleItems(options, entries: IntersectionObserverEntry[]) {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        this.addToVisible(options, entry.target);
      } else {
        this.removeFromVisible(options, entry.target);
      }
    }
  }

  private addToVisible(options: IntersectionObserverInit, element: Element): void {
    if (!this.visibleElements.has(options)) {
      this.visibleElements.set(options, []);
    }

    const existing = this.visibleElements.get(options);
    if (existing.indexOf(element) === -1) {
      existing.push(element);
    }
  }

  private removeFromVisible(options: IntersectionObserverInit, element: Element): void {
    const visibleEntries = this.visibleElements.get(options);
    if (!visibleEntries) {
      return;
    }

    const index = visibleEntries.indexOf(element);
    if (index !== -1) {
      visibleEntries.splice(index, 1);
    }
  }

  private findTopmostElement(options: IntersectionObserverInit): Element | undefined {
    const visibleElements = this.visibleElements.get(options);
    if (!visibleElements) {
      return;
    }

    let topmost: Element;
    for (const element of visibleElements) {
      if (!topmost || element.getBoundingClientRect().top < topmost.getBoundingClientRect().top) {
        topmost = element;
      }
    }
    return topmost;
  }
}
