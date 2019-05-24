import {
  Directive,
  Input,
  HostListener,
  ElementRef,
  EventEmitter,
  Output,
  OnDestroy,
  AfterViewInit,
  ContentChildren,
  QueryList,
} from '@angular/core';
import { Observable, forkJoin, of as observableOf, interval, timer } from 'rxjs';
import { takeWhile, filter, switchMap, map, takeUntil, take } from 'rxjs/operators';
import { convertToBoolProperty } from '../helpers';
import { NbLayoutScrollService } from '../../services/scroll.service';
import { NbLayoutRulerService } from '../../services/ruler.service';
import { NbListItemComponent } from './list.component';

export class NbScrollableContainerDimentions {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
}

/**
 * Infinite List Directive
 *
 * ```html
 *  <nb-list nbInfiniteList [threshold]="500" (bottomThreshold)="loadNext()">
 *    <nb-list-item *ngFor="let item of items"></nb-list-item>
 *  </nb-list>
 * ```
 *
 * @stacked-example(Simple infinite list, infinite-list/infinite-list-showcase.component)
 *
 * Directive will notify when list scrolled up or down to a given threshold.
 * By default it listen to scroll of list on which applied, but also can be set to listen to window scroll.
 *
 * @stacked-example(Scroll modes, infinite-list/infinite-list-scroll-modes.component)
 *
 * To improve UX of infinite lists, it's better to keep current page in url,
 * so user able to return to the last viewed page or to share a link to this page.
 * `nbListPageTracker` directive will help you to know, what page user currently viewing.
 * Just put it on a list, set page size and it will calculate page that currently in viewport.
 * You can [open the example](example/infinite-list/infinite-news-list.component)
 * in a new tab to check out this feature.
 *
 * @stacked-example(Infinite list with pager, infinite-list/infinite-news-list.component)
 *
 * @stacked-example(Infinite list with placeholders at the top, infinite-list/infinite-list-placeholders.component)
 *
 */
@Directive({
  selector: '[nbInfiniteList]',
})
export class NbInfiniteListDirective implements AfterViewInit, OnDestroy {

  private alive = true;
  private lastScrollPosition;
  windowScroll = false;
  private get elementScroll() {
    return !this.windowScroll;
  }

  /**
   * Threshold after which event load more event will be emited.
   * In pixels.
   */
  @Input()
  threshold: number;

  /**
   * By default component observes list scroll position.
   * If set to `true`, component will observe position of page scroll instead.
   */
  @Input()
  set listenWindowScroll(value) {
    this.windowScroll = convertToBoolProperty(value);
  }

  /**
   * Emits when distance between list bottom and current scroll position is less than threshold.
   */
  @Output()
  bottomThreshold = new EventEmitter(true);

  /**
   * Emits when distance between list top and current scroll position is less than threshold.
   */
  @Output()
  topThreshold = new EventEmitter(true);

  @HostListener('scroll')
  onElementScroll() {
    if (this.elementScroll) {
      this.checkPosition(this.elementRef.nativeElement);
    }
  }

  @ContentChildren(NbListItemComponent) listItems: QueryList<NbListItemComponent>;

  constructor(
    private elementRef: ElementRef,
    private scrollService: NbLayoutScrollService,
    private dimensionsService: NbLayoutRulerService,
  ) {}

  ngAfterViewInit() {
    this.scrollService.onScroll()
      .pipe(
        takeWhile(() => this.alive),
        filter(() => this.windowScroll),
        switchMap(() => this.getContainerDimensions()),
      )
      .subscribe(dimentions => this.checkPosition(dimentions));

    this.listItems.changes
      .pipe(
        takeWhile(() => this.alive),
        // For some reason, changes are emitted before list item removed from dom,
        // so dimensions will be incorrect.
        // Check every 50ms for a second if dom and query are in sync.
        // Once they synchronized, we can get proper dimensions.
        switchMap(() => interval(50).pipe(
          takeUntil(timer(1000)),
          filter(() => this.inSyncWithDom()),
          take(1),
        )),
        switchMap(() => this.getContainerDimensions()),
      )
      .subscribe(dimentions => this.checkPosition(dimentions));

      this.getContainerDimensions().subscribe(dimentions => this.checkPosition(dimentions));
  }

  ngOnDestroy() {
    this.alive = false;
  }

  checkPosition({ scrollHeight, scrollTop, clientHeight }: NbScrollableContainerDimentions) {
    const initialCheck = this.lastScrollPosition == null;
    const manualCheck = this.lastScrollPosition === scrollTop;
    const scrollUp = scrollTop < this.lastScrollPosition;
    const scrollDown = scrollTop > this.lastScrollPosition;
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;

    if ((initialCheck ||  manualCheck || scrollDown) && distanceToBottom <= this.threshold) {
      this.bottomThreshold.emit();
    }
    if ((initialCheck || scrollUp) && scrollTop <= this.threshold) {
      this.topThreshold.emit();
    }

    this.lastScrollPosition = scrollTop;
  }

  private getContainerDimensions(): Observable<NbScrollableContainerDimentions> {
    if (this.elementScroll) {
      const { scrollTop, scrollHeight, clientHeight } = this.elementRef.nativeElement;
      return observableOf({ scrollTop, scrollHeight, clientHeight });
    }

    return forkJoin(this.scrollService.getPosition(), this.dimensionsService.getDimensions())
      .pipe(
          map(([scrollPosition, dimensions]) => ({
            scrollTop: scrollPosition.y,
            scrollHeight: dimensions.scrollHeight,
            clientHeight: dimensions.clientHeight,
          })),
      );
  }

  private inSyncWithDom(): boolean {
    return this.elementRef.nativeElement.children.length === this.listItems.length;
  }
}
