import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

const PACKAGE_JSON_VERSION = require('../../../../package.json').version;

export interface VersionInfo {
  version: string;
  name: string;
  path: string;
}

@Injectable()
export class NgdVersionService {

  supportedVersions$: Observable<VersionInfo[]>;

  constructor(private http: HttpClient) {
    this.supportedVersions$ = this.http.get<VersionInfo[]>(environment.versionsUrl)
      .pipe(shareReplay(1));
  }

  getCurrentVersion(): Observable<VersionInfo> {
    return this.supportedVersions$
      .pipe(
        map((versions: VersionInfo[]) => versions.find(info => info.version === PACKAGE_JSON_VERSION)),
      );
  }

  getSupportedVersions(): Observable<VersionInfo[]> {
    return this.supportedVersions$;
  }
}
