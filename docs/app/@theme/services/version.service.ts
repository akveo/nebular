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

/*
  In production we run multiple versions of docs apps and all of them load single versions.json config.
  To help determine which version entry from the config is associated with a currently running app, docs build script
  adds `versionName` to the package.json and sets it to name of version associated with this app.
  When running docs locally we could just find version with `isCurrent` flag as it would always refer to the
  version associated with a current revision.
*/
const currentVersionPredicate = environment.production
  ? (version: Version) => version.name === require('../../../../package.json').versionName
  : (version: Version) => version.isCurrent;

@Injectable()
export class NgdVersionService {

  supportedVersions$: Observable<Version[]>;

  constructor(private http: HttpClient) {
    this.supportedVersions$ = this.http.get<Version[]>(environment.versionsUrl)
      .pipe(
        catchError(() => of([])),
        shareReplay(1),
      );
  }

  getCurrentVersion(): Observable<Version> {
    return this.supportedVersions$
      .pipe(
        map((versions: Version[]) => versions.find(currentVersionPredicate)),
      );
  }

  getSupportedVersions(): Observable<Version[]> {
    return this.supportedVersions$;
  }
}
