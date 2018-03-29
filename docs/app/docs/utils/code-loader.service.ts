import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CodeLoaderService {

  /**
   * Contains cached files by url.
   * */
  private cache: Map<string, string> = new Map();

  /**
   * Contains pending file requests.
   * Useful when file downloading in progress and
   * new request for the same file received from the service client.
   * */
  private pending: Map<string, Subject<string>> = new Map();

  constructor(private http: HttpClient) {
  }

  load(id: string, lang: string): Observable<string> {
    const url = this.buildFilePath(id, lang);
    const cached = this.cache.get(url);
    const pending = this.pending.get(url);

    if (cached) {
      return observableOf(cached)
    }

    if (pending) {
      return pending;
    }

    return this.buildRequest(url);
  }

  private buildFilePath(id: string, lang: string): string {
    return `assets/examples/examples/${id}.component.${lang}`;
  }

  private buildRequest(url): Observable<string> {
    const pending = new Subject<string>();
    const request = this.http.get(url, { responseType: 'text' })
      .do((code: string) => this.cache.set(url, code))
      .do(() => this.pending.delete(url));

    request.subscribe(pending);

    this.pending.set(url, pending);

    return pending;
  }
}
