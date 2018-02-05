import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';

import { NbUserProvider } from './user.provider';
import { NbUser } from './user';

@Injectable()
export class NbPlainUserProvider implements NbUserProvider<NbUser> {

  constructor(@Optional() protected user: NbUser) {
  }

  load(force = false): Observable<NbUser> {
    return observableOf(this.user);
  }
}
