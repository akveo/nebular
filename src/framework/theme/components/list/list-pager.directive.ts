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
import { takeWhile } from 'rxjs/operators';
import 'intersection-observer';
import { NbListItemComponent } from './list.component';

/**
 * List pager directive
 */
@Directive({
  selector: '[nbListPager]',
})
export class NbListPagerDirective implements AfterViewInit, OnDestroy {

  private alive = true;

  private observer: IntersectionObserver;
  private currentPage: number;

  @Input('nbListPager')
  pageSize: number;

  @Input()
  startPage: number = 1;

  @Output()
  pageChange = new EventEmitter<number>();

  @ContentChildren(NbListItemComponent, { read: ElementRef })
  listItems: QueryList<ElementRef>;

  constructor() {
    this.observer = new IntersectionObserver(
      this.checkForPageChange.bind(this),
      { threshold: 0.5 },
    );
  }

  ngAfterViewInit() {
    if (this.listItems && this.listItems.length) {
      this.observeItems();
    }

    this.listItems.changes
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.observeItems());
  }

  ngOnDestroy() {
    this.observer.disconnect && this.observer.disconnect();
  }

  private observeItems() {
    this.listItems.forEach(i => this.observer.observe(i.nativeElement));
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
    return Array.from(element.parentElement.children).indexOf(element);
  }
}
