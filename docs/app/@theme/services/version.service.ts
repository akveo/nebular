import { Injectable } from '@angular/core';

@Injectable()
export class NgdVersionService {

  versionsExceptCurrent = [ '3.5.0', '3.6.0' ];

  getNebularVersion() {
    return require('../../../../package.json').version;
  }

  getNebularVersions(): string[] {
    return this.versionsExceptCurrent.concat(this.getNebularVersion());
  }

  getVersionPath(version: string): string {
    if (version === this.getNebularVersion()) {
      return '/';
    }

    return '/' + version;
  }
}
