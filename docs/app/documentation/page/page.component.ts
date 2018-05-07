/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {Component, Inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Title} from '@angular/platform-browser';
import {filter, map, publishReplay, refCount, tap} from 'rxjs/operators';
import { NB_WINDOW } from '@nebular/theme';
import { NgdStructureService } from '../../@theme/services';

@Component({
  selector: 'ngd-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class NgdPageComponent {

  currentItem;

  constructor(@Inject(NB_WINDOW) private window,
              private activatedRoute: ActivatedRoute,
              private structureService: NgdStructureService,
              private titleService: Title) {

    // TODO: set title
    this.activatedRoute.params
      .pipe(
        filter((params: any) => params.subPage),
        map((params: any) => {
          this.window.scrollTo(0, 0);
          return this.structureService.findPageBySlag(this.structureService.getPreparedStructure(), params.subPage);
        }),
        tap((item: any) => {
          this.titleService.setTitle(`Nebular - ${item.name}`);
        }),
        publishReplay(),
        refCount(),
      )
      .subscribe((item) => this.currentItem = item);
  }
}
