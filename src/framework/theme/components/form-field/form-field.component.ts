/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  ChangeDetectionStrategy,
  ContentChild,
  AfterContentChecked,
  ChangeDetectorRef,
  ContentChildren,
  QueryList,
  AfterContentInit,
  OnDestroy,
  NgZone,
  ElementRef,
  Renderer2,
  AfterViewInit,
  HostBinding,
} from '@angular/core';
import { merge, Subject, Observable, combineLatest, ReplaySubject } from 'rxjs';
import { takeUntil, distinctUntilChanged, map, tap } from 'rxjs/operators';

import { NbPrefixDirective } from './prefix.directive';
import { NbSuffixDirective } from './suffix.directive';
import { NbFormFieldControl, NbFormControlState, NbFormFieldControlConfig } from './form-field-control';

export type NbFormControlAddon = 'prefix' | 'suffix';

function throwFormControlElementNotFound() {
  throw new Error(`NbFormFieldComponent must contain [nbInput]`);
}

/*
 * NbFormFieldComponent
 *
 * @styles
 *
 * form-field-addon-basic-text-color:
 * form-field-addon-basic-highlight-text-color:
 * form-field-addon-primary-text-color:
 * form-field-addon-primary-highlight-text-color:
 * form-field-addon-success-text-color:
 * form-field-addon-success-highlight-text-color:
 * form-field-addon-info-text-color:
 * form-field-addon-info-highlight-text-color:
 * form-field-addon-warning-text-color:
 * form-field-addon-warning-highlight-text-color:
 * form-field-addon-danger-text-color:
 * form-field-addon-danger-highlight-text-color:
 * form-field-addon-control-text-color:
 * form-field-addon-control-highlight-text-color:
 * form-field-addon-disabled-text-color:
 * form-field-addon-tiny-height:
 * form-field-addon-tiny-width:
 * form-field-addon-tiny-icon-size:
 * form-field-addon-tiny-font-size:
 * form-field-addon-tiny-line-height:
 * form-field-addon-tiny-font-weight:
 * form-field-addon-small-height:
 * form-field-addon-small-width:
 * form-field-addon-small-icon-size:
 * form-field-addon-small-font-size:
 * form-field-addon-small-line-height:
 * form-field-addon-small-font-weight:
 * form-field-addon-medium-height:
 * form-field-addon-medium-width:
 * form-field-addon-medium-icon-size:
 * form-field-addon-medium-font-size:
 * form-field-addon-medium-line-height:
 * form-field-addon-medium-font-weight:
 * form-field-addon-large-height:
 * form-field-addon-large-width:
 * form-field-addon-large-icon-size:
 * form-field-addon-large-font-size:
 * form-field-addon-large-line-height:
 * form-field-addon-large-font-weight:
 * form-field-addon-giant-height:
 * form-field-addon-giant-width:
 * form-field-addon-giant-icon-size:
 * form-field-addon-giant-font-size:
 * form-field-addon-giant-line-height:
 * form-field-addon-giant-font-weight:
 **/
@Component({
  selector: 'nb-form-field',
  styleUrls: ['./form-field.component.scss'],
  templateUrl: './form-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbFormFieldComponent implements AfterContentChecked, AfterContentInit, AfterViewInit, OnDestroy {
  protected readonly destroy$ = new Subject<void>();

  protected formControlState$ = new ReplaySubject<NbFormControlState>(1);
  prefixClasses$: Observable<string[]> = this.formControlState$.pipe(map((s) => this.getAddonClasses('prefix', s)));
  suffixClasses$: Observable<string[]> = this.formControlState$.pipe(map((s) => this.getAddonClasses('suffix', s)));

  @ContentChildren(NbPrefixDirective, { descendants: true }) prefix: QueryList<NbPrefixDirective>;
  @ContentChildren(NbSuffixDirective, { descendants: true }) suffix: QueryList<NbSuffixDirective>;

  @ContentChild(NbFormFieldControl, { static: false }) formControl: NbFormFieldControl;
  @ContentChild(NbFormFieldControlConfig, { static: false }) formControlConfig: NbFormFieldControlConfig;

  @HostBinding('class') formFieldClasses;

  constructor(
    protected cd: ChangeDetectorRef,
    protected zone: NgZone,
    protected elementRef: ElementRef,
    protected renderer: Renderer2,
  ) {}

  ngAfterContentChecked() {
    if (!this.formControl) {
      throwFormControlElementNotFound();
    }
  }

  ngAfterContentInit() {
    this.subscribeToFormControlStateChange();
    this.subscribeToAddonChange();
  }

  ngAfterViewInit() {
    // TODO: #2254
    this.zone.runOutsideAngular(() =>
      setTimeout(() => {
        this.renderer.addClass(this.elementRef.nativeElement, 'nb-transition');
      }),
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  shouldShowPrefix(): boolean {
    return this.getFormControlConfig().supportsPrefix && !!this.prefix.length;
  }

  shouldShowSuffix(): boolean {
    return this.getFormControlConfig().supportsSuffix && !!this.suffix.length;
  }

  protected subscribeToFormControlStateChange() {
    const { disabled$, focused$, size$, status$, fullWidth$ } = this.formControl;

    combineLatest([disabled$, focused$, size$, status$, fullWidth$])
      .pipe(
        map(([disabled, focused, size, status, fullWidth]) => ({ disabled, focused, size, status, fullWidth })),
        distinctUntilChanged((oldState, state) => this.isStatesEqual(oldState, state)),
        tap(({ size, fullWidth }) => {
          const formFieldClasses = [`nb-form-field-size-${size}`];
          if (!fullWidth) {
            formFieldClasses.push('nb-form-field-limited-width');
          }
          this.formFieldClasses = formFieldClasses.join(' ');
        }),
        takeUntil(this.destroy$),
      )
      .subscribe(this.formControlState$);
  }

  protected subscribeToAddonChange() {
    merge(this.prefix.changes, this.suffix.changes)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.cd.markForCheck());
  }

  protected getAddonClasses(addon: NbFormControlAddon, state: NbFormControlState): string[] {
    const classes = ['nb-form-field-addon', `nb-form-field-${addon}-${state.size}`];

    if (state.disabled) {
      classes.push(`nb-form-field-addon-disabled`);
    } else if (state.focused) {
      classes.push(`nb-form-field-addon-${state.status}-highlight`);
    } else {
      classes.push(`nb-form-field-addon-${state.status}`);
    }

    return classes;
  }

  protected getFormControlConfig(): NbFormFieldControlConfig {
    return this.formControlConfig || new NbFormFieldControlConfig();
  }

  protected isStatesEqual(oldState: NbFormControlState, state: NbFormControlState): boolean {
    return (
      oldState.status === state.status &&
      oldState.disabled === state.disabled &&
      oldState.focused === state.focused &&
      oldState.fullWidth === state.fullWidth &&
      oldState.size === state.size
    );
  }
}
