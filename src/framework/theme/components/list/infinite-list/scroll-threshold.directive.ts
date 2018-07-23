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
import { NbLayoutScrollService } from '../../../services/scroll.service';
import { NbLayoutRulerService } from '../../../services/ruler.service';

export enum NbScrollDirection {
  UP,
  DOWN,
}

/**
 * Scroll Threshold Directive
 *
 * Directive will notify when element scrolled down to given a threshold.
 * By default listen to scroll on element to which it applied.
 */
@Directive({
  selector: '[nbScrollThreshold]',
})
export class NbScrollThresholdDirective implements AfterViewInit, OnDestroy {

  private alive = true;
  private lastScrollPosition = 0;

  /**
   * Threshold value.
   * Please ensure that its height is greater than element height, otherwise threshold will never be reached.
   */
  @Input('nbScrollThreshold')
  threshold: number;

  /**
   * Listen window scroll.
   * Also enables listening to layout scroll, for those who has `nb-layout` set to `withScroll` mode,
   * which remove scroll on body.
   */
  @Input()
  listenWindowScroll = false;

  /**
   * Emits when bottom threshold reached.
   */
  @Output()
  bottomThresholdReached = new EventEmitter();

  /**
   * Emits when top threshold reached.
   */
  @Output()
  topThresholdReached = new EventEmitter();

  @HostListener('scroll')
  elementScroll() {
    if (!this.listenWindowScroll) {
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
        filter(() => this.listenWindowScroll),
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
      this.bottomThresholdReached.emit();
    }

    if (scrollDirection === NbScrollDirection.UP && scrollTop <= this.threshold) {
      this.topThresholdReached.emit();
    }
  }
}
