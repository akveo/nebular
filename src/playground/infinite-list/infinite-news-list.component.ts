import { Component, ViewChildren, ElementRef, QueryList, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { take, filter, map } from 'rxjs/operators';
import { NbListItemComponent, NbLayoutScrollService, NB_WINDOW } from '@nebular/theme';
import { getElementHeight } from '@nebular/theme/components/helpers';
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
        [nbListPager]="pageSize"
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
})
export class NbInfiniteNewsListComponent implements OnInit, OnDestroy {

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
    const queryParams = { ...this.route.snapshot.queryParams, page };
    this.router.navigate(['.'], { queryParams, replaceUrl: true, relativeTo: this.route });
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
          heightOfAddedItems += getElementHeight(nativeElement);
        }
        this.scrollService.scrollTo(null, heightOfAddedItems);
      });
  }
}
