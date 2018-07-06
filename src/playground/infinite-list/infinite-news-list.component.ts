import { Component, AfterViewInit, OnDestroy, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbListItemComponent } from '@nebular/theme';
import { takeWhile, take } from 'rxjs/operators';
import { ListBase } from './list-base';

@Component({
  selector: 'nb-infinite-news-list',
  template: `
    <nb-infinite-list
      [loadMoreThreshold]="2000"
      [listenWindowScroll]="listenWindowScroll"
      (loadNext)="loadNext()">
      <nb-list-item *ngFor="let post of items" [attr.data-post-id]="post.id">
        <article [attr.aria-labelledby]="post.id">
          <h2 [attr.id]="post.id">{{post.title}}</h2>
          <nb-random-svg [isLoading]="post.isPlaceholder"></nb-random-svg>
          <p>{{post.text}}</p>
          <a [routerLink]="post.link">Read full article</a>
        </article>
      </nb-list-item>
    </nb-infinite-list>
  `,
  styleUrls: [ `infinite-news-list.component.scss` ],
})
export class NbInfiniteNewsListComponent extends ListBase implements AfterViewInit, OnDestroy {

  alive = true;
  listenWindowScroll = true;

  intersectionObserver: IntersectionObserver;
  postIdsToObserve: number[] = [];
  pageByPostId = new Map<number, number>();
  visibleItems = new Map<number, number>();

  @ViewChildren(NbListItemComponent, { read: ElementRef }) postsList: QueryList<ElementRef>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super();

    this.timeout = 3000;
  }

  ngAfterViewInit() {
    this.intersectionObserver = new IntersectionObserver(
      this.updateUrl.bind(this),
      { threshold: [ 0, 0.25, 0.75, 1 ] },
    );

    this.postsList.changes
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.observeNewItems());

    this.route.queryParams
      .pipe(take(1))
      .subscribe((params => {
        const currentPage = Number.parseInt(params.page, 10) || 1;
        const firstItemId = this.items[0].id;
        const lastItemId = this.items[this.items.length - 1].id;

        this.pageByPostId.set(firstItemId, currentPage);
        this.pageByPostId.set(lastItemId, currentPage);

        this.postIdsToObserve.push(firstItemId, lastItemId);
        this.observeNewItems();
      }));
  }

  ngOnDestroy() {
    this.alive = false;
    this.intersectionObserver.disconnect();
  }

  loadNext() {
    const { page, items } = this.addPage();
    const firstAndLastItemsIds = [items[0].id, items[items.length - 1].id];
    for (const id of firstAndLastItemsIds) {
      this.pageByPostId.set(id, page);
    }
    this.postIdsToObserve.push(...firstAndLastItemsIds);
  }

  newItem(index: number) {
    return {
      index,
      id: index,
      title: `Post ${index + 1}`,
      text: `Post placeholder text.`,
    };
  }

  private updateUrl(entries: IntersectionObserverEntry[]) {
    for (const entry of entries) {
      const postId = this.getPostId(entry.target);

      if (entry.intersectionRatio === 0) {
        this.visibleItems.delete(postId);
      } else {
        this.visibleItems.set(postId, entry.intersectionRatio);
      }
    }

    if (this.visibleItems.size === 0) {
      return;
    }

    let mostVisibleItemId;
    let maxIntersection = 0;
    this.visibleItems.forEach((intersectionRatio, id) => {
      if (intersectionRatio > maxIntersection) {
        maxIntersection = intersectionRatio;
        mostVisibleItemId = id;
      }
    });

    // TODO
    // navigate only if not already on current page
    this.router.navigate(
      ['.'],
      {
        queryParams: { page: this.pageByPostId.get(mostVisibleItemId) },
        replaceUrl: true,
        relativeTo: this.route,
      },
    );
  }

  private observeNewItems() {
    const postsArray = this.postsList.toArray();
    const lastPostIndex = postsArray.length - 1;

    for (let i = lastPostIndex; i >= 0; i--) {
      const postElement = postsArray[i].nativeElement;
      const postId = this.getPostId(postElement);

      const index = this.postIdsToObserve.indexOf(postId);
      if (index !== -1) {
        this.intersectionObserver.observe(postElement);
        this.postIdsToObserve.splice(index, 1);
      }

      if (this.postIdsToObserve.length === 0) {
        return;
      }
    }
  }

  private getPostId(element: Element): number {
    return Number.parseInt(element.getAttribute('data-post-id'), 10);
  }
}
