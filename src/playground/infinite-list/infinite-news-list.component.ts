import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { NewsService, NewsPost } from './news.service';

@Component({
  selector: 'nb-infinite-news-list',
  template: `
    <nb-card>
      <div [nbSpinner]="loadingPrev"></div>

      <nb-infinite-list
        [nbListPager]="pageSize"
        (nbListPagerChange)="updateUrl($event)"
        [loadMoreThreshold]="threshold"
        [listenWindowScroll]="listenWindowScroll"
        (loadPrev)="loadPrev()"
        (loadNext)="loadNext()">

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
export class NbInfiniteNewsListComponent implements OnInit {

  listenWindowScroll = true;
  threshold = 2000;

  pageSize = 10;
  skippedPages: number;

  loadingPrev = false;
  loadingNext = false;
  news: NewsPost[] = [];

  placeholders: any[] = [];

  constructor(
    private newsService: NewsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(take(1))
      .subscribe(({ page }) => {
        this.skippedPages = page
          ? Number.parseInt(page, 10) - 1
          : 0;
      });

    this.loadNext();
  }

  loadPrev() {
    if (this.skippedPages === 0 || this.loadingPrev) { return; }

    this.loadingPrev = true;
    this.newsService.load()
      .subscribe(news => {
        this.news.unshift(...news);
        this.skippedPages--;
        this.loadingPrev = false;
      });
  }

  loadNext() {
    if (this.loadingNext) { return; }

    this.loadingNext = true;
    this.newsService.load()
      .subscribe(news => {
        this.news.push(...news);
        this.loadingNext = false;
        this.placeholders = [];
      });

    this.placeholders = new Array(this.pageSize);
  }

  updateUrl(page) {
    const actualPage = this.skippedPages + page;

    this.router.navigate(
      ['.'],
      {
        queryParams: { page: actualPage },
        replaceUrl: true,
        relativeTo: this.route,
      },
    );
  }
}
