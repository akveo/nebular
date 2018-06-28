import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  ElementRef,
  ContentChildren,
  AfterViewInit,
  OnDestroy,
  QueryList,
  ContentChild,
  Directive,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { take, takeWhile } from 'rxjs/operators';
import { NbListComponent, NbListItemComponent } from '../list.component';

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
 * @stacked-example(Basic example:, list/infinite-list/infinite-list-showcase.component)
 */
@Component({
  selector: 'nb-infinite-list',
  template: `
    <ng-content select="[nbDisableAutoLoadButton]"></ng-content>

    <nb-list
      [role]="role"
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

  @Input() role = 'feed';

  @Input() autoLoading = true;

  @Input() tag: string;

  @Input()
  @HostBinding('class.window-scroll')
  listenWindowScroll = false;

  @Input() loadMoreThreshold;

  @Output() loadNext = new EventEmitter<number>();
  @Output() loadPrev = new EventEmitter<number>();

  @ViewChild(NbListComponent, { read: ElementRef }) listElement: ElementRef;

  @ContentChildren(NbListItemComponent, { read: ElementRef }) listItems: QueryList<ElementRef>;

  @ContentChild(NbDisableAutoLoadButtonDirective) disableAutoLoadButton: NbDisableAutoLoadButtonDirective;

  @ContentChild('loadMoreButton') loadMoreButton: ElementRef;

  private elementPageMap = new Map<Element, number>();

  private firstItem: Element;
  private lastItem: Element;
  private lastRequestedStartPage: number;
  private lastRequestedEndPage: number;
  private intersectionObserver;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.disableAutoLoadButton.isPressed = !this.autoLoading;

    const rootElement = this.listenWindowScroll
      ? null
      : this.listElement.nativeElement;
    this.intersectionObserver = new IntersectionObserver(
      this.updatePage.bind(this),
      { root: rootElement, threshold: 1 },
    );
  }

  ngAfterViewInit() {
    this.disableAutoLoadButton.click
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.autoLoading = !this.autoLoading);

    let hasInitialData = this.listItems.length !== 0;

    this.route.queryParams
      .pipe(take(1))
      .subscribe(params => {
        const currentPage = params[this.tag]
          ? parseInt(params[this.tag], 10)
          : 1;
        this.lastRequestedStartPage = currentPage;
        this.lastRequestedEndPage = currentPage;

        if (hasInitialData) {
          this.initializeFirstPage(currentPage);
        } else {
          // should I emit 'loadPrev' if it's not a first page?
          if (this.lastRequestedStartPage > 1) {
            this.emitLoadPrev(--this.lastRequestedStartPage);
          }
          this.emitLoadNext(this.lastRequestedEndPage);
        }
      });

    this.listItems.changes
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        if (hasInitialData) {
          this.processNewItems();
        } else {
          hasInitialData = true;
          this.initializeFirstPage(this.lastRequestedEndPage);
        }
      });
  }

  ngOnDestroy() {
    this.alive = false;
    this.intersectionObserver.disconnect();
    this.elementPageMap.clear();
  }

  onTopThresholdReached() {
    if (this.autoLoading && this.lastRequestedStartPage > 1) {
      this.emitLoadPrev(--this.lastRequestedStartPage);
    }
  }

  onBottomThresholdReached() {
    if (this.autoLoading) {
      this.emitLoadNext(++this.lastRequestedEndPage);
    }
  }

  emitLoadPrev(page: number) {
    this.loadPrev.emit(this.lastRequestedStartPage);
  }

  emitLoadNext(page: number) {
    this.loadNext.emit(this.lastRequestedEndPage);
  }

  disableAutoLoading() {
    this.autoLoading = false;
  }

  private initializeFirstPage(page) {
    this.firstItem = this.listItems.first.nativeElement;
    this.lastItem = this.listItems.last.nativeElement;

    this.assignItemsToPage(page, this.firstItem, this.lastItem);
  }

  private processNewItems() {
    const hasNewItemsAtStart = this.listItems.first.nativeElement !== this.firstItem;
    const hasNewItemsAtEnd = this.listItems.last.nativeElement !== this.lastItem;

    const itemsArray: ElementRef[] = this.listItems.toArray();

    if (hasNewItemsAtStart) {
      const lastStartNewItemIndex = itemsArray.findIndex(i => i.nativeElement === this.firstItem) - 1;
      this.assignItemsToPage(
        this.lastRequestedStartPage,
        this.listItems.first.nativeElement,
        itemsArray[lastStartNewItemIndex].nativeElement,
      );
      // change scrollTop to height of all new items to preserve scroll position
    }

    if (hasNewItemsAtEnd) {
      const firstNewItemAtEndIndex = itemsArray.findIndex(i => i.nativeElement === this.lastItem) + 1;
      this.assignItemsToPage(
        this.lastRequestedEndPage,
        itemsArray[firstNewItemAtEndIndex].nativeElement,
        this.listItems.last.nativeElement,
      );
    }

    this.firstItem = this.listItems.first.nativeElement;
    this.lastItem = this.listItems.last.nativeElement;
  }

  private assignItemsToPage(page: number, ...items: Element[]) {
    for (const item of items) {
      if (!this.elementPageMap.has(item)) {
        this.elementPageMap.set(item, page);
        this.intersectionObserver.observe(item);
      }
    }
  }

  private updatePage(entries: IntersectionObserverEntry[]) {
    const lastEntry = entries[entries.length - 1];

    if (lastEntry.intersectionRatio < 1) {
      return;
    }

    const currentPage = this.elementPageMap.get(lastEntry.target);
    this.router.navigate(
      ['.'],
      {
        queryParams: { [this.tag]: currentPage },
        replaceUrl: true,
        relativeTo: this.route,
      },
    );
  }
}
