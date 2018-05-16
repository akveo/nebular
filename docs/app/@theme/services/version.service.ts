import { Injectable } from '@angular/core';
import * as hljs from 'highlight.js';

@Injectable()
export class NgdVersionService {

  getNebularVersion() {
    return require('../../../../package.json').version;
  }
}
