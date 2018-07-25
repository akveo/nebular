import {
  Directive,
  Input,
  HostListener,
  ElementRef,
  EventEmitter,
  Output,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { forkJoin } from 'rxjs';
import { takeWhile, filter, switchMap } from 'rxjs/operators';
import { convertToBoolProperty } from '../helpers';
import { NbLayoutScrollService } from '../../services/scroll.service';
import { NbLayoutRulerService } from '../../services/ruler.service';

export enum NbScrollDirection {
  UP,
  DOWN,
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
  private lastScrollPosition = 0;
  windowScroll = false;

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
  bottomThreshold = new EventEmitter();

  /**
   * Emits when distance between list top and current scroll position is less than threshold.
   */
  @Output()
  topThreshold = new EventEmitter();

  @HostListener('scroll')
  elementScroll() {
    if (!this.windowScroll) {
      const { scrollTop, scrollHeight, clientHeight } = this.elementRef.nativeElement;
      this.checkPosition(scrollHeight, scrollTop, clientHeight );
    }
  }

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
        switchMap(() => forkJoin(this.scrollService.getPosition(), this.dimensionsService.getDimensions())),
      )
      .subscribe(([scrollPosition, dimensions]) => {
        this.checkPosition(dimensions.scrollHeight, scrollPosition.y, dimensions.clientHeight);
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }

  checkPosition(scrollHeight: number, scrollTop: number, clientHeight: number) {
    if (this.lastScrollPosition === scrollTop) {
      return;
    }

    const scrollDirection = scrollTop > this.lastScrollPosition
      ? NbScrollDirection.DOWN
      : NbScrollDirection.UP;
    const distanceToBottom = scrollHeight - scrollTop - clientHeight;

    this.lastScrollPosition = scrollTop;

    if (scrollDirection === NbScrollDirection.DOWN && distanceToBottom <= this.threshold) {
      this.bottomThreshold.emit();
    }

    if (scrollDirection === NbScrollDirection.UP && scrollTop <= this.threshold) {
      this.topThreshold.emit();
    }
  }
}
