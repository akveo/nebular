import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, shareReplay, catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

export interface Version {
  checkoutTarget: string;
  name: string;
  path: string;
  isCurrent?: boolean;
}

import { VERSION_NAME } from '../../../version';

@Injectable()
export class NgdVersionService {
  protected readonly devVersion: Version = { name: VERSION_NAME, path: '.', checkoutTarget: 'master', isCurrent: true };

  supportedVersions$: Observable<Version[]>;

  constructor(private http: HttpClient) {
    if (environment.production) {
      this.supportedVersions$ = this.http.get<Version[]>(environment.versionsUrl).pipe(
        catchError(() => of([])),
        shareReplay(1),
      );
    }
    this.supportedVersions$ = of([this.devVersion]).pipe(shareReplay(1));
  }

  getCurrentVersion(): Observable<Version> {
    if (environment.production) {
      return this.supportedVersions$.pipe(
        map((versions: Version[]) => versions.find(({ name }) => name === VERSION_NAME)),
      );
    }
    return of(this.devVersion);
  }

  getSupportedVersions(): Observable<Version[]> {
    return this.supportedVersions$;
  }
}
