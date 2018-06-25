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
   * Emits when threshold reached.
   */
  @Output()
  thresholdReached = new EventEmitter();

  @HostListener('window:resize')
  windowResize() {
    this.checkPosition(this.getDocumentElement());
  }

  @HostListener('window:scroll')
  windowScroll() {
    if (this.listenWindowScroll) {
      this.checkPosition(this.getDocumentElement());
    }
  }

  @HostListener('document:nbscroll', ['$event'])
  layoutScroll($event) {
    if (this.listenWindowScroll) {
      this.checkPosition($event.target);
    }
  }

  @HostListener('scroll')
  elementScroll() {
    if (!this.listenWindowScroll) {
      this.checkPosition(this.elementRef.nativeElement);
    }
  }

  constructor(
    @Inject(NB_DOCUMENT) private document,
    private elementRef: ElementRef,
  ) {}

  checkPosition(element) {
    if (element.scrollHeight - element.scrollTop <= this.threshold) {
      this.thresholdReached.emit();
    }
  }

  private getDocumentElement() {
    const { body, documentElement } = this.document;
    return documentElement.scrollTop ? documentElement : body;
  }
}
