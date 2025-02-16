/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NgdMdSection } from '../../../@theme/services/text.service';
import { NgdLastViewedSectionService } from '../../../@theme/services';

@Component({
    selector: 'ngd-md-block',
    template: `
    <div [nbSpinner]="loading">
      <nb-card *ngFor="let section of sections$ | async" [ngdFragment]="section.fragment">
        <nb-card-body>
          <div [innerHtml]="getTemplate(section.html)"></div>
        </nb-card-body>
      </nb-card>
    </div>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class NgdMdBLockComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  loading = true;

  @Input()
  get sections$(): Observable<NgdMdSection[]> {
    return this.lastViewedSectionService.getSections();
  }
  set sections$(value: Observable<NgdMdSection[]>) {
    value.pipe(takeUntil(this.destroy$)).subscribe((sections) => {
      this.loading = false;
      this.lastViewedSectionService.setSection(sections);
    });
  }

  constructor(
    private readonly domSanitizer: DomSanitizer,
    private lastViewedSectionService: NgdLastViewedSectionService,
  ) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getTemplate(content: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(content);
  }
}
