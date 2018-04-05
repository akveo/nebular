import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import { publishReplay } from 'rxjs/operators/publishReplay';
import { refCount } from 'rxjs/operators/refCount';
import { catchError } from 'rxjs/operators/catchError';

@Injectable()
export class CodeLoaderService {

  /**
   * Contains cached files by url.
   * */
  private cache: Map<string, Observable<string>> = new Map();

  constructor(private http: HttpClient) {
  }

  load(path: string): Observable<string> {
    const url = this.buildFilePath(path);
    const cached = this.cache.get(url);

    if (cached) {
      return cached;
    }

    return this.buildRequest(url);
  }

  private buildFilePath(path: string): string {
    return `assets/examples/${path}`;
  }

  private buildRequest(url): Observable<string> {
    const request = this.http.get(url, { responseType: 'text' })
      .pipe(
        publishReplay(1),
        refCount(),
        catchError(e => observableOf('')),
      );

    this.cache.set(url, request);

    return request;
  }
}
