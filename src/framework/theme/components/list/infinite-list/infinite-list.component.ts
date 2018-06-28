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
import { takeWhile } from 'rxjs/operators';
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
      (thresholdReached)="onThresholdReached()">
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

  @ViewChild(NbListComponent, { read: ElementRef }) listElement: ElementRef;

  @ContentChildren(NbListItemComponent, { read: ElementRef }) listItems: QueryList<ElementRef>;

  @ContentChild(NbDisableAutoLoadButtonDirective) disableButton: NbDisableAutoLoadButtonDirective;

  @ContentChild('loadMoreButton') loadMoreButton: ElementRef;

  private elementPageMap = new Map<Element, number>();

  private lastReqestedPage: number;
  private lastLength: number = 0;
  private intersectionObserver;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit() {
    this.disableButton.isPressed = !this.autoLoading;

    const rootElement = this.listenWindowScroll
      ? null
      : this.listElement.nativeElement;
    this.intersectionObserver = new IntersectionObserver(
      this.updatePage.bind(this),
      { root: rootElement },
    );
  }

  ngAfterViewInit() {
    this.disableButton.click
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.autoLoading = !this.autoLoading);

    this.route.params.subscribe(params => {
      this.lastReqestedPage = params[this.tag] || 1;
      this.addNewItems();
    });

    this.listItems.changes
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.addNewItems());
  }

  ngOnDestroy() {
    this.alive = false;
    this.intersectionObserver.disconnect();
    this.elementPageMap.clear();
  }

  onThresholdReached() {
    if (this.autoLoading) {
      this.emitLoadNext();
    }
  }

  emitLoadNext() {
    this.lastReqestedPage++;
    this.loadNext.emit(this.lastReqestedPage);
  }

  disableAutoLoading() {
    this.autoLoading = false;
  }

  addNewItems() {
    const firstNewItemElement = this.listItems.toArray()[this.lastLength].nativeElement;
    const lastNewItemElement = this.listItems.last.nativeElement;

    if (this.elementPageMap.has(firstNewItemElement) || this.elementPageMap.has(lastNewItemElement)) {
      return;
    }

    this.lastLength = this.listItems.length;

    this.elementPageMap.set(firstNewItemElement, this.lastReqestedPage);
    this.elementPageMap.set(lastNewItemElement, this.lastReqestedPage);

    for (const element of [ firstNewItemElement, lastNewItemElement ]) {
      this.intersectionObserver.observe(element);
    }
  }

  updatePage(entries) {
    const lastEntry = entries[entries.length - 1];

    if (!lastEntry.isIntersecting) {
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
