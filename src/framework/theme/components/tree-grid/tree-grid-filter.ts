/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Directive, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { NbFilterable } from './data-source/tree-grid-data-source';

@Directive({
  selector: '[nbFilter]',
  standalone: false,
})
export class NbFilterDirective {
  @Input('nbFilter') filterable: NbFilterable;

  filter(filterRequest: string) {
    this.filterable.filter(filterRequest);
  }
}

/**
 * Helper directive to trigger data source's filter method when user types in input
 */
@Directive({
  selector: '[nbFilterInput]',
  providers: [{ provide: NbFilterDirective, useExisting: NbFilterInputDirective }],
  standalone: false,
})
export class NbFilterInputDirective extends NbFilterDirective implements OnInit, OnDestroy {
  private search$: Subject<string> = new Subject<string>();
  private destroy$ = new Subject<void>();

  @Input('nbFilterInput') filterable: NbFilterable;

  /**
   * Debounce time before triggering filter method. Set in milliseconds.
   * Default 200.
   */
  @Input() debounceTime: number = 200;

  ngOnInit() {
    this.search$.pipe(debounceTime(this.debounceTime), takeUntil(this.destroy$)).subscribe((query: string) => {
      super.filter(query);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.search$.complete();
  }

  @HostListener('input', ['$event'])
  filter(event) {
    this.search$.next(event.target.value);
  }
}
