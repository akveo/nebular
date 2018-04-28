/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { Observable } from 'rxjs/Observable';
import { filter, map, publishReplay, refCount } from 'rxjs/operators';

@Component({
  selector: 'ngd-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})

export class NgdPageComponent {

  currentItem$: Observable<any>;

  constructor(/*@Inject(NB_WINDOW) private window,*/
              private menuService: NbMenuService,
              /*private titleService: Title*/) {

    // TODO: set title
    this.currentItem$ = this.menuService.onItemSelect()
      .pipe(
        filter((event: { tag: string, item: any }) => event && event.item && event.item.data),
        map((event: { tag: string, item: any }) => event.item.data),
        // tap(_ => this.window.scrollTo(0, 0)),
        publishReplay(),
        refCount(),
      );
  }
}
