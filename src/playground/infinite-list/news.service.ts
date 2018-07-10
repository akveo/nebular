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
  constructor(private http: HttpClient) {}

  load(): Observable<NewsPost[]> {
    return this.http
      .get('/assets/data/news.json')
      .pipe(
        map(({ news }: { news: any[] }) => {
          return news.map(n => <NewsPost>{
            ...n,
            text: n.encoded,
          });
        }),
        delay(2000),
      );
  }
}
