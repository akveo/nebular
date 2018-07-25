import { Component, OnInit, OnDestroy, ViewChildren, AfterViewInit, QueryList, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take, takeWhile } from 'rxjs/operators';
import { NbListItemComponent, NbLayoutScrollService } from '@nebular/theme';
import { getElementHeight } from '@nebular/theme/components/helpers';
import { NewsService, NewsPost } from './news.service';

@Component({
  selector: 'nb-infinite-news-list',
  template: `
    <nb-card>
      <div [nbSpinner]="loadingPrev"></div>

      <nb-infinite-list
        [nbListPager]="pageSize"
        [startPage]="startPage"
        (nbListPagerChange)="updateUrl($event)"
        [loadMoreThreshold]="threshold"
        [listenWindowScroll]="listenWindowScroll"
        (loadNext)="loadNext()"
        (loadPrev)="loadPrev()">

        <nb-list-item *ngFor="let newsPost of news">
          <nb-news-post [post]="newsPost"></nb-news-post>
        </nb-list-item>
        <nb-list-item *ngFor="let _ of placeholders">
          <nb-news-post-placeholder></nb-news-post-placeholder>
        </nb-list-item>

      </nb-infinite-list>
    </nb-card>
  `,
  styleUrls: [ `infinite-news-list.component.scss` ],
})
export class NbInfiniteNewsListComponent implements OnInit, AfterViewInit, OnDestroy {

  alive = true;

  listenWindowScroll = true;
  threshold = 100;

  pageSize = 10;
  startPage: number;

  loadingPrev = false;
  loadingNext = false;
  news: NewsPost[] = [];

  placeholders: any[] = [];

  private firstItem: Element;

  @ViewChildren(NbListItemComponent, { read: ElementRef }) listItems: QueryList<ElementRef>;

  constructor(
    private newsService: NewsService,
    private router: Router,
    private route: ActivatedRoute,
    private scrollService: NbLayoutScrollService,
  ) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(take(1))
      .subscribe(({ page }) => {
        this.startPage = page
          ? Number.parseInt(page, 10)
          : 1;
      });

    this.loadNext();
  }

  ngAfterViewInit() {
    let firstLoad = this.news.length === 0;
    this.listItems.changes
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        if (firstLoad && this.news.length > 0) {
          firstLoad = false;
          this.firstItem = this.listItems.first.nativeElement;
        } else {
          this.restoreScrollPosition();
        }
      });
  }

  ngOnDestroy() {
    this.firstItem = null;
    this.alive = false;
  }

  loadPrev() {
    if (this.startPage === 1 || this.loadingPrev) { return; }

    this.loadingPrev = true;
    this.newsService.load()
      .subscribe(news => {
        this.startPage--;
        this.news.unshift(...news);
        this.loadingPrev = false;
      });
  }

  loadNext() {
    if (this.loadingNext) { return; }

    this.placeholders = new Array(this.pageSize);
    this.loadingNext = true;
    this.newsService.load()
      .subscribe(news => {
        this.news.push(...news);
        this.loadingNext = false;
        this.placeholders = [];
      });
  }

  private restoreScrollPosition() {
    if (this.firstItem === this.listItems.first.nativeElement) {
      return;
    }

    let newItemsHeight = 0;
    this.listItems.some(({ nativeElement }) => {
      if (nativeElement === this.firstItem) {
        return true;
      }
      newItemsHeight += getElementHeight(nativeElement);
    });

    this.scrollService.scrollTo(0, newItemsHeight);
    this.firstItem = this.listItems.first.nativeElement;
  }

  updateUrl(page) {
    this.router.navigate(
      ['.'],
      {
        queryParams: { page },
        replaceUrl: true,
        relativeTo: this.route,
      },
    );
  }
}
