import { Directive, Input, HostListener, Inject, ElementRef, EventEmitter, Output } from '@angular/core';
import { NB_DOCUMENT } from '../../../theme.options';

/**
 * Scroll Threshold Directive
 *
 * Directive will notify when element scrolled down to given a threshold.
 * By default listen to scroll on element to which it applied.
 */
@Directive({
  selector: '[nbScrollThreshold]',
})
export class NbScrollThresholdDirective {

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

  @HostListener('document:nbscroll', ['$event'])
  layoutScroll($event) {
    if (this.listenWindowScroll) {
      const { scrollHeight, scrollTop } = $event.detail;
      this.checkPosition(scrollHeight, scrollTop);
    }
  }

  @HostListener('scroll')
  elementScroll() {
    if (!this.listenWindowScroll) {
      const { scrollTop, scrollHeight } = this.elementRef.nativeElement;
      this.checkPosition(scrollHeight, scrollTop);
    }
  }

  constructor(private elementRef: ElementRef) {}

  checkPosition(scrollHeight: number, scrollTop: number) {
    if (scrollHeight - scrollTop <= this.threshold) {
      this.bottomThresholdReached.emit();
    }

    if (scrollTop <= this.threshold) {
      this.topThresholdReached.emit();
    }
  }
}
