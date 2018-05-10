/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

/**
 * Search component service, connects you code to a page-level search component.
 */
@Injectable()
export class NbSearchService {
  private searchSubmittings$ = new Subject<{ term: string, tag?: string }>();
  private searchActivations$ = new Subject<{ searchType: string, tag?: string }>();
  private searchDeactivations$ = new Subject<{ searchType: string, tag?: string }>();

  /***
   * Activate (open) search component
   * @param {string} searchType
   * @param {string} tag
   */
  activateSearch(searchType: string, tag?: string) {
    this.searchActivations$.next({ searchType, tag });
  }

  /**
   * Deactibate (close) search component
   * @param {string} searchType
   * @param {string} tag
   */
  deactivateSearch(searchType: string, tag?: string) {
    this.searchDeactivations$.next({ searchType, tag });
  }

  /**
   * Trigger search submit
   * @param {string} term
   * @param {string} tag
   */
  submitSearch(term: string, tag?: string) {
    this.searchSubmittings$.next({ term, tag });
  }

  /**
   * Subscribe to 'activate' event
   * @returns Observable<{searchType: string; tag?: string}>
   */
  onSearchActivate(): Observable<{ searchType: string, tag?: string }> {
    return this.searchActivations$.pipe(share());
  }

  /**
   * Subscribe to 'deactivate' event
   * @returns Observable<{searchType: string; tag?: string}>
   */
  onSearchDeactivate(): Observable<{ searchType: string, tag?: string }> {
    return this.searchDeactivations$.pipe(share());
  }

  /**
   * Subscribe to 'submit' event (when submit button clicked)
   * @returns Observable<{term: string; tag?: string}>
   */
  onSearchSubmit(): Observable<{ term: string, tag?: string }> {
    return this.searchSubmittings$.pipe(share());
  }
}
