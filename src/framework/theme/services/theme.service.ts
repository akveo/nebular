/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Inject, Injectable, Type } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';
import { pairwise } from 'rxjs/operators/pairwise';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { startWith } from 'rxjs/operators/startWith';
import { share } from 'rxjs/operators/share';

import { nbThemeOptionsToken } from '../theme.options';
import { NbJSThemeOptions } from './js-themes/theme.options';
import { NbJSThemesRegistry } from './js-themes-registry.service';
import { NbMediaBreakpointsService, NbMediaBreakpoint } from './breakpoints.service';

/**
 * Main Nebular service. Includes various helper methods.
 */
@Injectable()
export class NbThemeService {

  // TODO: behavioral subject here?
  currentTheme: string;
  private themeChanges$ = new ReplaySubject(1);
  private appendToLayoutTop$ = new ReplaySubject();
  private createLayoutTop$ = new Subject();
  private appendLayoutClass$ = new Subject();
  private removeLayoutClass$ = new Subject();
  private changeWindowWidth$ = new ReplaySubject<number>(2);

  constructor(
    @Inject(nbThemeOptionsToken) protected options: any,
    private breakpointService: NbMediaBreakpointsService,
    private jsThemesRegistry: NbJSThemesRegistry,
  ) {
    if (options && options.name) {
      this.changeTheme(options.name);
    }
  }

  changeTheme(name: string): void {
    this.themeChanges$.next({ name, previous: this.currentTheme });
    this.currentTheme = name;
  }

  changeWindowWidth(width: number): void {
    this.changeWindowWidth$.next(width);
  }

  appendToLayoutTop<T>(component: Type<T>): Observable<any> {
    const subject = new ReplaySubject(1);
    this.appendToLayoutTop$.next({ component, listener: subject });
    return subject.asObservable();
  }

  /**
   * Returns a theme object with variables (color/paddings/etc) on a theme change.
   * Once subscribed - returns current theme.
   *
   * @returns {Observable<NbJSThemeOptions>}
   */
  getJsTheme(): Observable<NbJSThemeOptions> {
    return this.onThemeChange().pipe(
      map((theme: any) => {
        return this.jsThemesRegistry.get(theme.name);
      }),
    );
  }

  clearLayoutTop(): Observable<any> {
    const observable = new BehaviorSubject(null);
    this.createLayoutTop$.next({ listener: observable });
    this.appendToLayoutTop$ = new ReplaySubject();
    return observable.asObservable();
  }

  /**
   * Triggers media query breakpoint change
   * Returns a pair where the first item is previous media breakpoint and the second item is current breakpoit.
   * ```
   *  [{ name: 'xs', width: 0 }, { name: 'md', width: 768 }] // change from `xs` to `md`
   * ```
   * @returns {Observable<[NbMediaBreakpoint, NbMediaBreakpoint]>}
   */
  onMediaQueryChange(): Observable<NbMediaBreakpoint[]> {
    return this.changeWindowWidth$
      .pipe(
        startWith(undefined),
        pairwise(),
        map(([prevWidth, width]: [number, number]) => {
          return [
            this.breakpointService.getByWidth(prevWidth),
            this.breakpointService.getByWidth(width),
          ]
        }),
        filter(([prevPoint, point]: [NbMediaBreakpoint, NbMediaBreakpoint]) => {
          return prevPoint.name !== point.name;
        }),
        distinctUntilChanged(null, params => params[0].name + params[1].name),
        share(),
      );
  }

  onThemeChange(): Observable<any> {
    return this.themeChanges$.pipe(share());
  }

  onAppendToTop(): Observable<any> {
    return this.appendToLayoutTop$.pipe(share());
  }

  onClearLayoutTop(): Observable<any> {
    return this.createLayoutTop$.pipe(share());
  }

  appendLayoutClass(className: string) {
    this.appendLayoutClass$.next(className);
  }

  onAppendLayoutClass(): Observable<any> {
    return this.appendLayoutClass$.pipe(share());
  }

  removeLayoutClass(className: string) {
    this.removeLayoutClass$.next(className);
  }

  onRemoveLayoutClass(): Observable<any> {
    return this.removeLayoutClass$.pipe(share());
  }
}
