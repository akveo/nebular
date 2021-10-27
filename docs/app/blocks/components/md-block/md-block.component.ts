/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NgdMdSection } from '../../../@theme/services/text.service';
import { NgdMdSectionsService } from '../../../@theme/services';

@Component({
  selector: 'ngd-md-block',
  template: `
    <div [nbSpinner]="loading">
      <nb-card *ngFor="let section of sections | async" [ngdFragment]="section.fragment">
        <nb-card-body>
          <div [innerHtml]="getTemplate(section.html)"></div>
        </nb-card-body>
      </nb-card>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdMdBLockComponent implements OnInit, OnDestroy {
  @Input() sections$: Observable<NgdMdSection[]> | undefined;
  public loading = false;
  private destroy$ = new Subject();

  constructor(private readonly domSanitizer: DomSanitizer, private mdSectionsService: NgdMdSectionsService) {}

  public ngOnInit(): void {
    if (this.sections$) {
      this.loading = true;

      this.sections$.pipe(takeUntil(this.destroy$)).subscribe((sections) => {
        this.loading = false;
        this.mdSectionsService.setSections(sections);
      })
    }
  }

  public get sections(): Observable<NgdMdSection[]> {
    return this.mdSectionsService.sections$;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getTemplate(content: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(content);
  }
}
