import { Directive, Input, HostListener, Inject, ElementRef, EventEmitter, Output } from '@angular/core';
import { NB_DOCUMENT } from '../../../theme.options';
import { getElementHeight } from '../../helpers';

@Directive({
  selector: '[nbScrollThreshold]',
})
export class NbScrollThresholdDirective {

  @Input('nbScrollThreshold')
  threshold: number;

  @Input()
  listenWindowScroll = false;

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
  onLayoutScroll($event) {
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
    const height = getElementHeight(element);

    if (height - element.scrollTop <= this.threshold) {
      this.thresholdReached.emit();
    }
  }

  private getDocumentElement() {
    const { body, documentElement } = this.document;
    return documentElement.scrollTop ? documentElement : body;
  }
}
