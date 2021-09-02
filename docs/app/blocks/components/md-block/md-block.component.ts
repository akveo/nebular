/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { NgdArticleService, NgdTextService } from '../../../@theme/services';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'ngd-md-block',
  template: `
    <nb-card *ngFor="let section of content;" [ngdFragment]="section.fragment">
      <nb-card-body>
        <div [innerHtml]="getTemplate(section.html)"></div>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdMdBLockComponent implements OnInit, OnDestroy {
  @Input() source: string | undefined;
  public content: MdChildren[] = [];
  private _destroy = new Subject();

  constructor(
    private textService: NgdTextService,
    private articleService: NgdArticleService,
    private cdr: ChangeDetectorRef,
    private readonly domSanitizer: DomSanitizer) {
  }

  // TODO: create NbDOMPurifyPipe
  getTemplate(content: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(content);
  }

  ngOnInit(): void {
    if (this.source) {
      this.articleService.getArticle(this.source).pipe(
        takeUntil(this._destroy),
        map((item) => this.textService.mdToSectionsHTML(item)),
      ).subscribe((item) => {
        this.content = item;
        this.cdr.markForCheck();
      });
    }
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
}

interface MdChildren {
  fragment: string;
  html: string;
  source: string;
  title: string;
}
