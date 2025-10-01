import {
  Directive,
  ContentChildren,
  QueryList,
  Input,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbListItemComponent } from './list.component';

/**
 * List pager directive
 *
 * Directive allows you to determine page of currently viewing items.
 *
 */
@Directive({
  selector: '[nbListPageTracker]',
  standalone: false,
})
export class NbListPageTrackerDirective implements AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();

  private observer: IntersectionObserver;
  private currentPage: number;

  /**
   * Items per page.
   */
  @Input()
  pageSize: number;

  /**
   * Page to start counting with.
   */
  @Input()
  startPage: number = 1;

  /**
   * Emits when another page become visible.
   */
  @Output()
  pageChange = new EventEmitter<number>();

  @ContentChildren(NbListItemComponent, { read: ElementRef })
  listItems: QueryList<ElementRef>;

  constructor() {
    this.observer = new IntersectionObserver((entries) => this.checkForPageChange(entries), { threshold: 0.5 });
  }

  ngAfterViewInit() {
    if (this.listItems && this.listItems.length) {
      this.observeItems();
    }

    this.listItems.changes.pipe(takeUntil(this.destroy$)).subscribe(() => this.observeItems());
  }

  ngOnDestroy() {
    this.observer.disconnect && this.observer.disconnect();
  }

  private observeItems() {
    this.listItems.forEach((i) => this.observer.observe(i.nativeElement));
  }

  private checkForPageChange(entries: IntersectionObserverEntry[]) {
    const mostVisiblePage = this.findMostVisiblePage(entries);

    if (mostVisiblePage && this.currentPage !== mostVisiblePage) {
      this.currentPage = mostVisiblePage;
      this.pageChange.emit(this.currentPage);
    }
  }

  private findMostVisiblePage(entries: IntersectionObserverEntry[]): number | null {
    const intersectionRatioByPage = new Map<number, number>();

    for (const entry of entries) {
      if (entry.intersectionRatio < 0.5) {
        continue;
      }

      const elementIndex = this.elementIndex(entry.target);
      if (elementIndex === -1) {
        continue;
      }
      const page = this.startPage + Math.floor(elementIndex / this.pageSize);

      let ratio = entry.intersectionRatio;
      if (intersectionRatioByPage.has(page)) {
        ratio += intersectionRatioByPage.get(page);
      }
      intersectionRatioByPage.set(page, ratio);
    }

    let maxRatio = 0;
    let mostVisiblePage;
    intersectionRatioByPage.forEach((ratio, page) => {
      if (ratio > maxRatio) {
        maxRatio = ratio;
        mostVisiblePage = page;
      }
    });

    return mostVisiblePage;
  }

  private elementIndex(element: Element): number {
    return element.parentElement && element.parentElement.children
      ? Array.from(element.parentElement.children).indexOf(element)
      : -1;
  }
}
