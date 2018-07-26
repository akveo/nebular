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
import { Observable, forkJoin, of, interval, timer } from 'rxjs';
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
 * Directive will notify when list scrolled down to given a threshold.
 * By default it listen to scroll on list where it applied, but also can be set to listen page scroll.
 *
 * @stacked-example(Showcase, infinite-list/infinite-news-list.component)
 *
 * @stacked-example(Infinite list inside a card, infinite-list/card-with-infinite-news-list.component)
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
        switchMap(() => this.getContainerDimentions()),
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
        switchMap(() => this.getContainerDimentions()),
      )
      .subscribe(dimentions => this.checkPosition(dimentions));

      this.getContainerDimentions().subscribe(dimentions => this.checkPosition(dimentions));
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

  private getContainerDimentions(): Observable<NbScrollableContainerDimentions> {
    if (this.elementScroll) {
      const { scrollTop, scrollHeight, clientHeight } = this.elementRef.nativeElement;
      return of({ scrollTop, scrollHeight, clientHeight });
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
