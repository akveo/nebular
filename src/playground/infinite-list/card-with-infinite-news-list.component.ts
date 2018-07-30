import { Component, OnInit, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take, map, filter } from 'rxjs/operators';
import { NbListItemComponent, NbListComponent, NbSpinnerDirective } from '@nebular/theme';
import { getElementHeight } from '@nebular/theme/components/helpers';
import { NewsService } from './news.service';

@Component({
  selector: 'nb-infinite-news-list',
  template: `
    <nb-card size="large">
      <div [nbSpinner]="loadingPrevious"></div>
      <nb-list
        nbInfiniteList
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
  styleUrls: [ 'infinite-news-list.component.scss', 'card-with-infinite-news-list.component.scss' ],
})
export class NbCardWithInfiniteNewsListComponent implements OnInit {

  news = [];
  placeholders = [];
  pageSize = 10;
  startPage: number;
  pageToLoadNext: number;
  loadingNext = false;
  loadingPrevious = false;

  @ViewChild(NbSpinnerDirective, { read: ElementRef }) spinner: ElementRef<Element>;
  @ViewChild(NbListComponent, { read: ElementRef }) listElementRef: ElementRef<Element>;
  @ViewChildren(NbListItemComponent, { read: ElementRef }) listItems: QueryList<ElementRef<Element>>;

  constructor(
    private newsService: NewsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const { page } = this.route.snapshot.queryParams;
    this.startPage = page ? Number.parseInt(page, 10) : 1;
    this.pageToLoadNext = this.startPage;
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
    const spinnerHeight = getElementHeight(this.spinner.nativeElement);
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
        this.listElementRef.nativeElement.scrollTop = heightOfAddedItems - spinnerHeight;
      });
  }
}
