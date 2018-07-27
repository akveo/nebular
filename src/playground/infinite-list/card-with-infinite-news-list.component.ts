import {
  Component,
  OnInit,
  OnDestroy,
  ViewChildren,
  AfterViewInit,
  QueryList,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take, takeWhile } from 'rxjs/operators';
import { NbListItemComponent, NbListComponent } from '@nebular/theme';
import { getElementHeight } from '@nebular/theme/components/helpers';
import { NewsService, NewsPost } from './news.service';

@Component({
  selector: 'nb-infinite-news-list',
  template: `
    <nb-card size="large">
      <div [nbSpinner]="loadingPrev"></div>

      <nb-list
        nbInfiniteList
        [threshold]="400"
        (bottomThreshold)="loadNext()"
        (topThreshold)="loadPrev()"
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
  styleUrls: [ `infinite-news-list.component.scss` ],
})
export class NbCardWithInfiniteNewsListComponent implements OnInit, AfterViewInit, OnDestroy {

  alive = true;

  pageSize = 10;
  startPage: number;
  pageToLoad: number;

  loadingPrev = false;
  loadingNext = false;
  news: NewsPost[] = [];
  placeholders: any[] = [];

  private firstItem: Element;

  @ViewChildren(NbListItemComponent, { read: ElementRef }) listItems: QueryList<ElementRef>;
  @ViewChild(NbListComponent, { read: ElementRef }) infiniteListElementRef: ElementRef;

  constructor(
    private newsService: NewsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(take(1))
      .subscribe(({ page }) => {
        this.startPage = page
          ? Number.parseInt(page, 10)
          : 1;
        this.pageToLoad = this.startPage;
      });
  }

  ngAfterViewInit() {
    let firstLoad = true;
    this.listItems.changes
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        const newsLoaded = this.news.length > 0;
        if (firstLoad && newsLoaded) {
          firstLoad = false;
          this.firstItem = this.listItems.first.nativeElement;
        } else if (newsLoaded) {
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

    this.newsService.load(this.startPage - 1, this.pageSize)
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

    this.newsService.load(this.pageToLoad, this.pageSize)
      .subscribe(news => {
        this.news.push(...news);
        this.placeholders = [];
        this.loadingNext = false;
        this.pageToLoad++;
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

    this.infiniteListElementRef.nativeElement.scrollTo(0, newItemsHeight);
    this.firstItem = this.listItems.first.nativeElement;
  }

  updateUrl(page) {
    this.route.queryParams
      .pipe(take(1))
      .subscribe(params => {
        this.router.navigate(
          ['.'],
          {
            queryParams: { ...params, page },
            replaceUrl: true,
            relativeTo: this.route,
          },
        );
      });
  }
}
