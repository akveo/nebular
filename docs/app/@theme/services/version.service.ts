import { Injectable } from '@angular/core';

@Injectable()
export class NgdVersionService {

  versionsExceptCurrent = [ '3.6.0' ];

  getNebularVersion() {
    return require('../../../../package.json').version;
  }

  getNebularVersions(): string[] {
    return this.versionsExceptCurrent.concat(this.getNebularVersion());
  }

  getVersionPath(version: string): string {
    if (version === this.getNebularVersion()) {
      return '/nebular';
    }

    return `/nebular/${version}`;
  }
}
