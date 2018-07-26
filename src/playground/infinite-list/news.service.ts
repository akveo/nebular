import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export class NewsPost {
  title: string;
  link: string;
  creator: string;
  text: string;
}

@Injectable()
export class NewsService {
  totalPages = 7;
  pageSize = 10;

  constructor(private http: HttpClient) {}

  load(page: number): Observable<NewsPost[]> {
    const startIndex = ((page - 1) % this.totalPages) * this.pageSize;

    return this.http
      .get<NewsPost[]>('/assets/data/news.json')
      .pipe(
        map(news => news.splice(startIndex, this.pageSize)),
        delay(1000),
      );
  }
}
