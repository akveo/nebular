import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  OnDestroy,
  ContentChild,
  Directive,
  HostListener,
  ChangeDetectorRef,
  AfterViewChecked,
} from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Directive({
  selector: 'button[nbDisableAutoLoadButton]',
})
export class NbDisableAutoLoadButtonDirective {
  private clicked = new Subject();

  get click(): Observable<any> {
    return this.clicked.asObservable();
  }

  @HostBinding('attr.aria-pressed')
  pressed = false;

  @HostListener('click')
  emitClick() {
    this.pressed = !this.pressed;
    this.clicked.next();
  }
}

@Directive({
  selector: 'button[nbLoadMoreButtonDirective]',
})
export class NbLoadMoreButtonDirective {
  private clicked = new Subject();

  get click() {
    return this.clicked.asObservable();
  }

  @HostListener('click')
  emitClick() {
    this.clicked.next();
  }
}

/**
 * Infinite list component.
 *
 * @stacked-example(Basic example, infinite-list/infinite-list-showcase.component)
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

    <ng-content select="[nbLoadMoreButtonDirective]"></ng-content>
  `,
  styleUrls: [ './infintie-list.component.scss' ],
})
export class NbInfiniteListComponent implements AfterViewChecked, OnDestroy {

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
  @ContentChild(NbLoadMoreButtonDirective) loadMoreButton: NbLoadMoreButtonDirective;

  private disableClickSubscription: Subscription;
  private loadMoreClickSubscription: Subscription;

  constructor(private changeDetection: ChangeDetectorRef) {}

  ngAfterViewChecked() {
    if (this.disableClickSubscription) {
      this.disableClickSubscription.unsubscribe();
    }
    if (this.loadMoreClickSubscription) {
      this.loadMoreClickSubscription.unsubscribe();
    }

    if (this.disableAutoLoadButton) {
      this.disableAutoLoadButton.pressed = !this.autoLoading;
      this.disableClickSubscription = this.disableAutoLoadButton.click
        .pipe(takeWhile(() => this.alive))
        .subscribe(() => this.autoLoading = !this.autoLoading);
    }
    if (this.loadMoreButton) {
      this.loadMoreClickSubscription = this.loadMoreButton.click
        .pipe(takeWhile(() => this.alive))
        .subscribe(() => this.emitLoadNext())
    }

    this.changeDetection.detectChanges();
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
