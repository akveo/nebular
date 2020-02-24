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
  Renderer2,
  ElementRef,
  ContentChildren,
  QueryList,
  AfterContentInit,
  OnDestroy,
} from '@angular/core';
import { merge, Subject, fromEvent, Observable, BehaviorSubject } from 'rxjs';
import { takeUntil, switchMap, tap, distinctUntilChanged, map } from 'rxjs/operators';

import { NbPrefixDirective } from './prefix.directive';
import { NbSuffixDirective } from './suffix.directive';
import { NbInputDirective } from '../input/input.directive';
import { NbComponentSize } from '../component-size';
import { NbComponentStatus } from '../component-status';

export type NbFormControlAddon = 'prefix' | 'suffix';

export interface NbFormControlState {
  status: NbComponentStatus;
  size: NbComponentSize;
  focused: boolean;
  disabled: boolean;
}

function throwFormControlElementNotFound() {
  throw new Error(`NbFormFieldComponent must contain [nbInput]`)
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
 * form-field-addon-small-height:
 * form-field-addon-small-width:
 * form-field-addon-medium-height:
 * form-field-addon-medium-width:
 * form-field-addon-large-height:
 * form-field-addon-large-width:
 * form-field-addon-giant-height:
 * form-field-addon-giant-width:
 **/
@Component({
  selector: 'nb-form-field',
  styleUrls: ['./form-field.component.scss'],
  templateUrl: './form-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbFormFieldComponent implements AfterContentChecked, AfterContentInit, OnDestroy {

  protected readonly destroy$ = new Subject<void>();

  protected formControlState$ = new BehaviorSubject<NbFormControlState>({
    status: 'basic',
    size: 'medium',
    focused: false,
    disabled: false,
  });
  prefixClasses$: Observable<string[]> = this.getAddonClassesObservable('prefix');
  suffixClasses$: Observable<string[]> = this.getAddonClassesObservable('suffix');

  @ContentChildren(NbPrefixDirective, { descendants: true }) prefix: QueryList<NbPrefixDirective>;
  @ContentChildren(NbSuffixDirective, { descendants: true }) suffix: QueryList<NbSuffixDirective>;

  @ContentChild(NbInputDirective, { static: false }) formControl: NbInputDirective;
  @ContentChild(NbInputDirective, { static: false, read: ElementRef }) formControlElement: ElementRef<HTMLInputElement>;

  constructor(
    protected cd: ChangeDetectorRef,
    protected renderer: Renderer2,
  ) {
  }

  ngAfterContentChecked() {
    if (!this.formControl) {
      throwFormControlElementNotFound();
    }

    this.checkFormControlState();
  }

  ngAfterContentInit() {
    this.subscribeToFormControlFocusChange();
    this.subscribeToAddonChange();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  protected subscribeToFormControlFocusChange() {
    const formControlEl = this.formControlElement.nativeElement;
    fromEvent(formControlEl, 'focusin')
      .pipe(
        tap(() => this.updateFormControlState({ focused: true })),
        switchMap(() => fromEvent(formControlEl, 'focusout')),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.updateFormControlState({ focused: false }));
  }

  protected subscribeToAddonChange() {
    merge(this.prefix.changes, this.suffix.changes)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.cd.markForCheck());
  }

  protected checkFormControlState() {
    const formControlEl: HTMLElement = this.formControlElement.nativeElement;
    const prevSize = this.formControlState$.value.size;
    const size = this.formControl.fieldSize;

    this.renderer.removeClass(formControlEl, this.getAddonSizeClass('prefix', prevSize));
    this.renderer.removeClass(formControlEl, this.getAddonSizeClass('suffix', prevSize));

    if (this.prefix.length) {
      this.renderer.addClass(formControlEl, this.getAddonSizeClass('prefix', size));
    }
    if (this.suffix.length) {
      this.renderer.addClass(formControlEl, this.getAddonSizeClass('suffix', size));
    }

    this.updateFormControlState({
      size: this.formControl.fieldSize,
      status: this.formControl.status,
      disabled: this.formControlElement.nativeElement.disabled,
    });
  }

  protected updateFormControlState(updatedState: Partial<NbFormControlState>) {
    this.formControlState$.next({ ...this.formControlState$.value, ...updatedState });
  }

  protected getAddonSizeClass(addon: NbFormControlAddon, size: NbComponentSize): string {
    return `nb-form-field-control-${addon}-${size}`;
  }

  protected getAddonClassesObservable(addon: NbFormControlAddon): Observable<string[]> {
    return this.formControlState$
      .pipe(
        distinctUntilChanged((x, y) => x.status === y.status && x.disabled === y.disabled && x.focused === y.focused),
        map((state: NbFormControlState) => this.getAddonClasses(addon, state)),
      );
  }

  protected getAddonClasses(addon: NbFormControlAddon, state: NbFormControlState): string[] {
    const classes = [
      'nb-form-field-addon',
      `nb-form-field-${addon}-${state.size}`,
    ];

    if (state.disabled) {
      classes.push(`nb-form-field-addon-disabled`);
    } else if (state.focused) {
      classes.push(`nb-form-field-addon-${state.status}-highlight`);
    } else {
      classes.push(`nb-form-field-addon-${state.status}`);
    }

    return classes;
  }
}
