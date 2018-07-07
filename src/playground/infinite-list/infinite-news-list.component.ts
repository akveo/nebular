import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChildren,
  QueryList,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbListItemComponent } from '@nebular/theme';
import { takeWhile, take } from 'rxjs/operators';

class TrackingIdWithPost {
  id: number;
  post: Post;

  get isLoading(): boolean {
    return !!this.post;
  };
}

export class Post {
  id: number;
  title: string;
  text: string;
  link: string;
}

@Component({
  selector: 'nb-news-post-placeholder',
  template: `
    <article>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </article>
  `,
  styles: [`
    :host {
      background: rgba(216, 216, 216, 0.8705882352941177);
      display: block;
      height: 30rem;
    }
  `],
})
export class NbNewsPostPlaceholderComponent {}

@Component({
  selector: 'nb-news-post',
  template: `
    <article [attr.aria-labelledby]="post.id">
      <h2 [attr.id]="post.id">{{post.title}}</h2>
      <nb-random-svg></nb-random-svg>
      <p>{{post.text}}</p>
      <a [routerLink]="post.link">Read full article</a>
    </article>
  `,
})
export class NbNewsPostComponent {
  @Input()
  post: Post;
}

@Component({
  selector: 'nb-infinite-news-list',
  template: `
    <nb-infinite-list
      [loadMoreThreshold]="threshold"
      [listenWindowScroll]="listenWindowScroll"
      (loadPrev)="loadPrev()"
      (loadNext)="loadNext()">
      <nb-list-item
        *ngFor="let idWithPost of news; trackBy: postUniqueId"
        [attr.data-post-id]="idWithPost.id">
        <nb-news-post-placeholder *ngIf="idWithPost.isLoading; else post"></nb-news-post-placeholder>
        <ng-template #post>
          <nb-news-post [post]="idWithPost.post"></nb-news-post>
        </ng-template>
      </nb-list-item>
    </nb-infinite-list>
  `,
  styleUrls: [ `infinite-news-list.component.scss` ],
})
export class NbInfiniteNewsListComponent implements OnInit, AfterViewInit, OnDestroy {

  alive = true;
  listenWindowScroll = true;
  threshold = 2000;

  pageSize = 10;
  maxPage = 100;
  pageLoadingDelay = 1000;
  previousPageToLoad: number;
  nextPageToLoad: number;
  visiblePage: number;

  intersectionObserver: IntersectionObserver;
  postIdsToObserve: number[] = [];
  pageByPostId = new Map<number, number>();
  visibleItems = new Map<number, number>();

  news: TrackingIdWithPost[] = [];

  @ViewChildren(NbListItemComponent, { read: ElementRef }) postsList: QueryList<ElementRef>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.queryParams
      .pipe(take(1))
      .subscribe((params => {
        const paramsPage = Number.parseInt(params.page, 10);
        const pageToLoad = paramsPage || 1;
        this.previousPageToLoad = pageToLoad > 1 ? pageToLoad - 1 : 0 ;
        this.nextPageToLoad = pageToLoad;
        // if not 1st load prev?
        // if this.news not empty do not call load?
        this.loadNext();
      }));
  }

  ngAfterViewInit() {
    this.intersectionObserver = new IntersectionObserver(
      this.updateUrl.bind(this),
      { threshold: [ 0, 0.25, 0.75, 1 ] },
    );

    this.postsList.changes
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.observeNewItems());
  }

  ngOnDestroy() {
    this.alive = false;
    this.intersectionObserver.disconnect();
  }

  loadPrev() {
    if (this.previousPageToLoad < 1) {
      return;
    }

    const postsPlaceholders = this.emulateLoading(this.previousPageToLoad);
    this.news.unshift(...postsPlaceholders);
    this.previousPageToLoad--;
  }

  loadNext() {
    if (this.nextPageToLoad > this.maxPage) {
      return;
    }

    const postsPlaceholders = this.emulateLoading(this.nextPageToLoad);
    this.news.push(...postsPlaceholders);
    this.nextPageToLoad++;
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

    const currentPage = this.pageByPostId.get(mostVisibleItemId);
    if (currentPage === this.visiblePage) {
      return;
    }

    this.router.navigate(
      ['.'],
      {
        queryParams: { page: currentPage },
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

  private emulateLoading(page: number): TrackingIdWithPost[] {
    const pageIndex = page - 1;
    const firstItemIndex = pageIndex * this.pageSize;
    const lastItemIndex = firstItemIndex + this.pageSize - 1;
    const idsWithPosts: TrackingIdWithPost[] = [];

    for (let i = firstItemIndex; i <= lastItemIndex; i++) {
      const idWithPost = new TrackingIdWithPost();
      idWithPost.id = i;
      idsWithPosts.push(idWithPost);
    }

    const firstAndLastPostsIds = [idsWithPosts[0].id, idsWithPosts[idsWithPosts.length - 1].id];
    for (const id of firstAndLastPostsIds) {
      this.pageByPostId.set(id, page);
    }
    this.postIdsToObserve.push(...firstAndLastPostsIds);

    setTimeout(
      () => idsWithPosts.forEach(p => {
        p.post = this.newPost(p.id + 1);
      }),
      this.pageLoadingDelay,
    );

    return idsWithPosts;
  }

  private newPost(id: number): Post {
    const post = new Post();
    post.id = id;
    post.title = `Post ${id}`;
    post.text = 'Post placeholder text.';
    return post;
  }

  postUniqueId(_, { id }: TrackingIdWithPost) {
    return id;
  }
}
