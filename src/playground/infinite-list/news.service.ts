import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

export class NewsPost {
  title: string;
  link: string;
  creator: string;
  text: string;
}

@Injectable()
export class NewsService {
  constructor(private http: HttpClient) {}

  load(): Observable<NewsPost[]> {
    return this.http
      .get<NewsPost[]>('/assets/data/news.json')
      .pipe(delay(2000));
  }
}
