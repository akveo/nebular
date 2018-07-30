import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from './news.service';

@Component({
  template: `
    <nb-card>
      <nb-list
        nbInfiniteList
        listenWindowScroll
        [threshold]="500"
        (bottomThreshold)="loadNext()"
        [nbListPager]="pageSize"
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
export class NbInfiniteListWithPagerComponent {

  news = [];
  placeholders = [];
  pageSize = 10;
  pageToLoadNext = 1;
  loading = false;

  constructor(
    private newsService: NewsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  updateUrl(page) {
    const queryParams = { ...this.route.snapshot.queryParams, page };
    this.router.navigate(['.'], { queryParams, replaceUrl: true, relativeTo: this.route });
  }

  loadNext() {
    if (this.loading) { return }

    this.loading = true;
    this.placeholders = new Array(this.pageSize);
    this.newsService.load(this.pageToLoadNext, this.pageSize)
      .subscribe(news => {
        this.placeholders = [];
        this.news.push(...news);
        this.loading = false;
        this.pageToLoadNext++;
      });
  }
}
