import { Component, ViewChildren, ElementRef, QueryList, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { concat } from 'rxjs';
import { take, toArray } from 'rxjs/operators';
import { NbListItemComponent, NbLayoutScrollService, NB_WINDOW, NbLayoutRulerService } from '@nebular/theme';
import { NewsService } from './news.service';

@Component({
    template: `
    <nb-card>
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
        <nb-list-item *ngFor="let _ of topPlaceholders">
          <nb-news-post-placeholder></nb-news-post-placeholder>
        </nb-list-item>
        <nb-list-item *ngFor="let newsPost of news">
          <nb-news-post [post]="newsPost"></nb-news-post>
        </nb-list-item>
        <nb-list-item *ngFor="let _ of bottomPlaceholders">
          <nb-news-post-placeholder></nb-news-post-placeholder>
        </nb-list-item>
      </nb-list>
    </nb-card>
  `,
    styleUrls: ['infinite-news-list.component.scss'],
    providers: [NewsService],
    standalone: false
})
export class InfiniteListPlaceholdersComponent implements OnInit, OnDestroy {

  news = [];
  topPlaceholders = [];
  bottomPlaceholders = [];
  pageSize = 10;
  startPage: number;
  pageToLoadNext: number;
  loadingNext = false;
  loadingPrevious = false;
  initialScrollRestoration: ScrollRestoration;

  @ViewChildren(NbListItemComponent, { read: ElementRef }) listItems: QueryList<ElementRef<HTMLElement>>;

  constructor(
    private newsService: NewsService,
    private router: Router,
    private route: ActivatedRoute,
    private scrollService: NbLayoutScrollService,
    private layoutService: NbLayoutRulerService,
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
    this.startPage = page ? Number.parseInt(page, 10) : 100;
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
    this.topPlaceholders = new Array(this.pageSize);
    this.restoreScrollPosition();
    this.startPage--;
    this.newsService.load(this.startPage, this.pageSize)
      .subscribe(
        news => {
          this.topPlaceholders = [];
          this.news.unshift(...news);
          this.loadingPrevious = false;
        },
        error => this.startPage++,
      );
  }

  loadNext() {
    if (this.loadingNext) {
      return;
    }

    this.loadingNext = true;
    this.bottomPlaceholders = new Array(this.pageSize);
    this.newsService.load(this.pageToLoadNext, this.pageSize)
      .subscribe(news => {
        this.bottomPlaceholders = [];
        this.news.push(...news);
        this.loadingNext = false;
        this.pageToLoadNext++;
      });
  }

  private restoreScrollPosition() {
    concat(
        this.layoutService.getDimensions(),
        this.scrollService.getPosition(),
        this.listItems.changes.pipe(take(1)),
        this.layoutService.getDimensions(),
        this.scrollService.getPosition(),
      )
      .pipe(toArray())
      .subscribe(([ oldDimensions, oldScrollPosition, , dimensions, scrollPosition ]) => {
        const oldHeight = oldDimensions.scrollHeight;
        const oldScrollTop = oldScrollPosition.y;
        const currentHeight = dimensions.scrollHeight;
        const currentScrollTop = scrollPosition.y;
        const heightDiff = currentHeight - oldHeight;

        // chrome automatically changes scrollTop
        if (oldScrollTop + heightDiff === currentScrollTop) {
          return;
        }

        const newScrollTop = currentScrollTop + heightDiff;
        this.scrollService.scrollTo(null, newScrollTop);
      });
  }
}
