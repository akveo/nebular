import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  ContentChild,
  Directive,
  HostListener,
  OnInit,
} from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Directive({
  selector: 'button[nbDisableAutoLoadButton]',
})
export class NbDisableAutoLoadButtonDirective {
  private clicked = new Subject();

  get click(): Observable<any> {
    return this.clicked.asObservable();
  }

  @Input()
  @HostBinding('attr.aria-pressed')
  isPressed = false;

  @HostListener('click')
  emitClick() {
    this.isPressed = !this.isPressed;
    this.clicked.next();
  }
}

/**
 * Infinite list component.
 *
 * @stacked-example(Basic example:, /infinite-list/infinite-list-showcase.component)
 */
@Component({
  selector: 'nb-infinite-list',
  template: `
    <ng-content select="[nbDisableAutoLoadButton]"></ng-content>

    <nb-list
      [nbScrollThreshold]="loadMoreThreshold"
      [listenWindowScroll]="listenWindowScroll"
      (bottomThresholdReached)="onBottomThresholdReached()"
      (topThresholdReached)="onTopThresholdReached()">
      <ng-content select="nb-list-item"></ng-content>
    </nb-list>

    <ng-content select="loadMoreButton"></ng-content>
  `,
  styleUrls: [ './infintie-list.component.scss' ],
})
export class NbInfiniteListComponent implements OnInit, AfterViewInit, OnDestroy {

  private alive = true;

  @Input() autoLoading = true;

  @Input()
  @HostBinding('class.window-scroll')
  listenWindowScroll = false;

  @HostBinding('class.element-scroll')
  get elementScroll() {
    return !this.listenWindowScroll;
  }

  @Input() loadMoreThreshold;

  @Output() loadNext = new EventEmitter();
  @Output() loadPrev = new EventEmitter();

  @ContentChild(NbDisableAutoLoadButtonDirective) disableAutoLoadButton: NbDisableAutoLoadButtonDirective;

  @ContentChild('loadMoreButton') loadMoreButton: ElementRef;

  ngOnInit() {
    this.disableAutoLoadButton.isPressed = !this.autoLoading;
  }

  ngAfterViewInit() {
    this.disableAutoLoadButton.click
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.autoLoading = !this.autoLoading);
  }

  ngOnDestroy() {
    this.alive = false;
  }

  onTopThresholdReached() {
    if (this.autoLoading) {
      this.emitLoadPrev();
    }
  }

  onBottomThresholdReached() {
    if (this.autoLoading) {
      this.emitLoadNext();
    }
  }

  emitLoadPrev() {
    this.loadPrev.emit();
  }

  emitLoadNext() {
    this.loadNext.emit();
  }

  disableAutoLoading() {
    this.autoLoading = false;
  }
}
