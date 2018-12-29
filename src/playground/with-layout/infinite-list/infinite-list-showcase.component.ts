import { Component } from '@angular/core';
import { NewsService } from './news.service';

@Component({
  template: `
    <nb-card>
      <nb-list
        nbInfiniteList
        listenWindowScroll
        [threshold]="500"
        (bottomThreshold)="loadNext()">
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
export class InfiniteListShowcaseComponent {

  news = [];
  placeholders = [];
  pageSize = 10;
  pageToLoadNext = 1;
  loading = false;

  constructor(private newsService: NewsService) {}

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
