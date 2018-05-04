/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, publishReplay, refCount } from 'rxjs/operators';
import { NgdStructureService } from '../../@theme/services';

@Component({
  selector: 'ngd-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class NgdPageComponent {

  currentItem;

  constructor(/*@Inject(NB_WINDOW) private window,*/
              private activatedRoute: ActivatedRoute,
              private structureService: NgdStructureService,
              /*private titleService: Title*/) {

    // TODO: set title
    this.activatedRoute.params
      .pipe(
        filter((params: any) => params.subPage),
        map((params: any) => {
          return this.structureService.findPageBySlag(this.structureService.getPreparedStructure(), params.subPage);
        }),
        publishReplay(),
        refCount(),
      )
      .subscribe((item) => this.currentItem = item);
  }
}
