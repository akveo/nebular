import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

const PACKAGE_JSON_VERSION = require('../../../../package.json').version;

export interface VersionsConfig {
  currentVersionName: string;
  versions: Version[];
}

export interface Version {
  checkoutTarget: string;
  name: string;
  path: string;
}

@Injectable()
export class NgdVersionService {

  supportedVersions$: Observable<Version[]>;

  constructor(private http: HttpClient) {
    this.supportedVersions$ = this.http.get<VersionsConfig>(environment.versionsUrl)
      .pipe(
        map((config: VersionsConfig) => config.versions),
        shareReplay(1),
      );
  }

  getCurrentVersion(): Observable<Version> {
    return this.supportedVersions$
      .pipe(
        map((versions: Version[]) => versions.find(v => v.name === PACKAGE_JSON_VERSION)),
      );
  }

  getSupportedVersions(): Observable<Version[]> {
    return this.supportedVersions$;
  }
}
