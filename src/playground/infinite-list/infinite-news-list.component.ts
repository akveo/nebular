import { Component, OnInit } from '@angular/core';
import { NewsService, NewsPost } from './news.service';

@Component({
  selector: 'nb-infinite-news-list',
  template: `
    <nb-card>
      <div [nbSpinner]="loadingPrev"></div>

      <nb-infinite-list
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

  loadingPrev = false;
  loadingNext = false;
  news: NewsPost[] = [];

  placeholders: any[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.loadNext();
  }

  loadPrev() {
    if (this.loadingPrev) { return; }

    this.loadingPrev = true;
    this.newsService.load()
      .subscribe(news => {
        this.news.unshift(...news);
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
}
