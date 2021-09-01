/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgdTextService } from '../../../@theme/services';

@Component({
  selector: 'ngd-md-block',
  template: `
    <nb-card *ngFor="let section of content | async;" [ngdFragment]="section?.fragment">
      <nb-card-body>
        <div [innerHtml]="section?.html"></div>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdMdBLockComponent implements OnInit {
  @Input() source: string;
  content: Observable<MdChildren[]> | undefined;

  constructor(private textService: NgdTextService) {
  }

  ngOnInit() {
    const article = import(`../../../../articles/${this.source}!txt`);

    this.content = from(article).pipe(map((str) => this.textService.mdToSectionsHTML(str)));
  }
}

interface MdChildren {
  fragment: string;
  html: string;
  source: string;
  title: string;
}
