import { Component, Input, OnInit } from '@angular/core';
import { NewsService, NewsPost } from './news.service';

@Component({
  selector: 'nb-news-post',
  template: `
    <article>
      <h2>{{post.title}}</h2>
      <!-- <nb-random-svg></nb-random-svg> -->
      <p>{{post.text}}</p>
      <a [attr.href]="post.link">Read full article</a>
    </article>
  `,
  styles: [`
    p {
      height: 30rem;
      overflow: hidden;
    }
  `],
})
export class NbNewsPostComponent {
  @Input()
  post: NewsPost;
}

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
      </nb-infinite-list>

      <div [nbSpinner]="loadingNext"></div>
    </nb-card>
  `,
  styleUrls: [ `infinite-news-list.component.scss` ],
})
export class NbInfiniteNewsListComponent implements OnInit {

  listenWindowScroll = true;
  threshold = 2000;

  loadingPrev = false;
  loadingNext = false;
  news: NewsPost[] = [];

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
      });
  }
}
