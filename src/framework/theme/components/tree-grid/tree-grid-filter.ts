/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Directive, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeWhile } from 'rxjs/operators';

import { NbFilterable } from './data-source/tree-grid-data-source';

@Directive({ selector: '[nbFilter]' })
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
})
export class NbFilterInputDirective extends NbFilterDirective implements OnInit, OnDestroy {
  private search$: Subject<string> = new Subject<string>();
  private alive: boolean = true;

  @Input('nbFilterInput') filterable: NbFilterable;

  /**
   * Debounce time before triggering filter method. Set in milliseconds.
   * Default 200.
   */
  @Input() debounceTime: number = 200;

  ngOnInit() {
    this.search$
      .pipe(
        takeWhile(() => this.alive),
        debounceTime(this.debounceTime),
      )
      .subscribe((query: string) => {
        super.filter(query)
      });
  }

  ngOnDestroy() {
    this.alive = false;
    this.search$.complete();
  }

  @HostListener('input', ['$event'])
  filter(event) {
    this.search$.next(event.target.value);
  }
}
