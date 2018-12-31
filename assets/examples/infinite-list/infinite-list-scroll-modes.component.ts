import { Component } from '@angular/core';
import { NewsService } from './news.service';

@Component({
  template: `
    <nb-card class="own-scroll">
      <nb-card-header>
        Own scroll
      </nb-card-header>
      <nb-list
        nbInfiniteList
        [threshold]="500"
        (bottomThreshold)="loadNext(firstCard)">
        <nb-list-item *ngFor="let newsPost of firstCard.news">
          <nb-news-post [post]="newsPost"></nb-news-post>
        </nb-list-item>
        <nb-list-item *ngFor="let _ of firstCard.placeholders">
          <nb-news-post-placeholder></nb-news-post-placeholder>
        </nb-list-item>
      </nb-list>
    </nb-card>

    <nb-card>
      <nb-card-header>
        Window scroll
      </nb-card-header>
      <nb-list
        nbInfiniteList
        listenWindowScroll
        [threshold]="500"
        (bottomThreshold)="loadNext(secondCard)">
        <nb-list-item *ngFor="let newsPost of secondCard.news">
          <nb-news-post [post]="newsPost"></nb-news-post>
        </nb-list-item>
        <nb-list-item *ngFor="let _ of secondCard.placeholders">
          <nb-news-post-placeholder></nb-news-post-placeholder>
        </nb-list-item>
      </nb-list>
    </nb-card>
  `,
  styleUrls: [ 'infinite-news-list.component.scss', 'infinite-list-scroll-modes.component.scss' ],
  providers: [ NewsService ],
})
export class InfiniteListScrollModesComponent {

  firstCard = {
    news: [],
    placeholders: [],
    loading: false,
    pageToLoadNext: 1,
  };
  secondCard = {
    news: [],
    placeholders: [],
    loading: false,
    pageToLoadNext: 1,
  };
  pageSize = 10;

  constructor(private newsService: NewsService) {}

  loadNext(cardData) {
    if (cardData.loading) { return }

    cardData.loading = true;
    cardData.placeholders = new Array(this.pageSize);
    this.newsService.load(cardData.pageToLoadNext, this.pageSize)
      .subscribe(nextNews => {
        cardData.placeholders = [];
        cardData.news.push(...nextNews);
        cardData.loading = false;
        cardData.pageToLoadNext++;
      });
  }
}
