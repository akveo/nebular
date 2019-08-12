import { Component, ViewChildren, ElementRef, QueryList, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { take, filter, map } from 'rxjs/operators';
import { NbListItemComponent, NbLayoutScrollService, NB_WINDOW } from '@nebular/theme';
import { NewsService } from './news.service';

@Component({
  template: `
    <nb-card>
      <div [nbSpinner]="loadingPrevious"></div>
      <nb-list
        nbInfiniteList
        listenWindowScroll
        [threshold]="500"
        (topThreshold)="loadPrevious()"
        (bottomThreshold)="loadNext()"
        nbListPageTracker
        [pageSize]="pageSize"
        [startPage]="startPage"
        (pageChange)="updateUrl($event)">
        <nb-list-item *ngFor="let newsPost of news">
          <nb-news-post [post]="newsPost"></nb-news-post>
        </nb-list-item>
        <nb-list-item *ngFor="let _ of placeholders">
          <nb-news-post-placeholder></nb-news-post-placeholder>
        </nb-list-item>
      </nb-list>
    </nb-card>
  `,
  styleUrls: [ 'infinite-news-list.component.scss' ],
  providers: [ NewsService ],
})
export class InfiniteNewsListComponent implements OnInit, OnDestroy {

  news = [];
  placeholders = [];
  pageSize = 10;
  startPage: number;
  pageToLoadNext: number;
  loadingNext = false;
  loadingPrevious = false;
  initialScrollRestoration: ScrollRestoration;

  @ViewChildren(NbListItemComponent, { read: ElementRef }) listItems: QueryList<ElementRef<Element>>;

  constructor(
    private newsService: NewsService,
    private router: Router,
    private route: ActivatedRoute,
    private scrollService: NbLayoutScrollService,
    @Inject(PLATFORM_ID) private platformId,
    @Inject(NB_WINDOW) private window,
  ) {
    if (isPlatformBrowser(this.platformId) && this.window.history.scrollRestoration) {
      // Prevent browsers from scrolling down to last scroll position, when navigating back to this page.
      // It doesn't make sense here, since list is dynamic and we handle last user position ourselves,
      // by storing page number in URL. So for this component, we disable scroll restoration.
      // Don't forget to re-enable it in 'OnDestroy', since this configuration preserved for the whole session
      // and it will not be reset after page reload.
      this.initialScrollRestoration = window.history.scrollRestoration;
      history.scrollRestoration = 'manual';
    }
  }

  ngOnInit() {
    const { page } = this.route.snapshot.queryParams;
    this.startPage = page ? Number.parseInt(page, 10) : 1;
    this.pageToLoadNext = this.startPage;
  }

  ngOnDestroy() {
    if (this.initialScrollRestoration) {
      this.window.history.scrollRestoration = this.initialScrollRestoration;
    }
  }

  updateUrl(page) {
    this.router.navigate(['.'], {
      queryParams: { page },
      replaceUrl: true,
      relativeTo: this.route,
      queryParamsHandling: 'merge',
    });
  }

  loadPrevious() {
    if (this.loadingPrevious || this.startPage === 1) {
      return;
    }

    this.loadingPrevious = true;
    this.newsService.load(this.startPage - 1, this.pageSize)
      .subscribe(news => {
        this.news.unshift(...news);
        this.loadingPrevious = false;
        this.restoreScrollPosition();
        this.startPage--;
      });
  }

  loadNext() {
    if (this.loadingNext) { return }

    this.loadingNext = true;
    this.placeholders = new Array(this.pageSize);
    this.newsService.load(this.pageToLoadNext, this.pageSize)
      .subscribe(news => {
        this.placeholders = [];
        this.news.push(...news);
        this.loadingNext = false;
        this.pageToLoadNext++;
      });
  }

  private restoreScrollPosition() {
    const previousFirstItem = this.listItems.length > 0 ? this.listItems.first.nativeElement : null;

    this.listItems.changes
      .pipe(
        map(() => this.listItems.first.nativeElement),
        filter(newFirstItem => newFirstItem !== previousFirstItem),
        take(1),
      )
      .subscribe(() => {
        let heightOfAddedItems = 0;
        for (const { nativeElement } of this.listItems.toArray()) {
          if (nativeElement === previousFirstItem) { break }
          heightOfAddedItems += getElementHeight(this.window, nativeElement);
        }
        this.scrollService.scrollTo(null, heightOfAddedItems);
      });
  }
}

export function getElementHeight(window, el) {
  const style = window.getComputedStyle(el);
  const marginTop = parseInt(style.getPropertyValue('margin-top'), 10);
  const marginBottom = parseInt(style.getPropertyValue('margin-bottom'), 10);
  return el.offsetHeight + marginTop + marginBottom;
}
