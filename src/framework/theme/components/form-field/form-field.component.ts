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
} from '@angular/core';

import { NbStartActionDirective } from './start-action.directive';
import { NbEndActionDirective } from './end-action.directive';
import { NbInputDirective } from '../input/input.directive';
import { NbComponentSize } from '../component-size';
import { merge, Subject, fromEvent } from 'rxjs';
import { takeUntil, switchMap, tap } from 'rxjs/operators';
import { NbComponentStatus } from '../component-status';

export type NbFormControlActionPosition = 'start' | 'end';

function throwFormControlElementNotFound() {
  throw new Error(`NbFormFieldComponent must contain [nbInput]`)
}

/*
 * NbFormFieldComponent
 *
 * @styles
 *
 * form-field-basic-icon-color:
 * form-field-basic-disabled-icon-color:
 * form-field-primary-icon-color:
 * form-field-primary-disabled-icon-color:
 * form-field-success-icon-color:
 * form-field-success-disabled-icon-color:
 * form-field-info-icon-color:
 * form-field-info-disabled-icon-color:
 * form-field-warning-icon-color:
 * form-field-warning-disabled-icon-color:
 * form-field-danger-icon-color:
 * form-field-danger-disabled-icon-color:
 * form-field-control-icon-color:
 * form-field-control-disabled-icon-color:
 * form-field-tiny-icon-size:
 * form-field-tiny-icon-margin:
 * form-field-small-icon-size:
 * form-field-small-icon-margin:
 * form-field-medium-icon-size:
 * form-field-medium-icon-margin:
 * form-field-large-icon-size:
 * form-field-large-icon-margin:
 * form-field-giant-icon-size:
 * form-field-giant-icon-margin:
 **/
@Component({
  selector: 'nb-form-field',
  styleUrls: ['./form-field.component.scss'],
  templateUrl: './form-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbFormFieldComponent implements AfterContentChecked, AfterContentInit {

  protected readonly destroy$ = new Subject<void>();
  protected previousSize: NbComponentSize | undefined;
  protected formControlFocused = false;

  @ContentChildren(NbStartActionDirective, { descendants: true }) startAction: QueryList<NbStartActionDirective>;
  @ContentChildren(NbEndActionDirective, { descendants: true }) endAction: QueryList<NbEndActionDirective>;

  @ContentChild(NbInputDirective, { static: false }) formControl;
  @ContentChild(NbInputDirective, { static: false, read: ElementRef }) formControlElement: ElementRef<HTMLElement>;

  constructor(
    protected cd: ChangeDetectorRef,
    protected renderer: Renderer2,
  ) {
  }

  ngAfterContentChecked() {
    if (!this.formControl) {
      throwFormControlElementNotFound();
    }

    this.updateActionClasses();
  }

  ngAfterContentInit() {
    const controlEl = this.formControlElement.nativeElement;
    fromEvent(controlEl, 'focusin')
      .pipe(
        tap(() => {
          this.formControlFocused = true;
          this.cd.markForCheck();
        }),
        switchMap(() => fromEvent(controlEl, 'focusout')),
        tap(() => this.cd.markForCheck()),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.formControlFocused = false;
        this.cd.markForCheck();
      });

    merge(this.startAction.changes, this.endAction.changes)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.cd.markForCheck());
  }

  getFormControlSize(): NbComponentSize | undefined {
    if (this.formControl.fieldSize) {
      return this.formControl.fieldSize;
    }
  }

  getFormControlStatusClass(): string {
    if (this.formControlFocused) {
      return this.getFormFieldActionStatusClass(this.formControl.status, this.formControlFocused);
    }
    return this.getFormFieldActionStatusClass(this.formControl.status, this.formControlFocused);
  }

  protected updateActionClasses() {
    const formControlEl: HTMLElement = this.formControlElement.nativeElement;

    this.renderer.removeClass(formControlEl, this.getFormFieldControlActionClass('start', this.previousSize));
    this.renderer.removeClass(formControlEl, this.getFormFieldControlActionClass('end', this.previousSize));

    const currentSize = this.getFormControlSize();
    if (!currentSize) {
      return;
    }

    this.previousSize = currentSize;

    if (this.startAction.length) {
      this.renderer.addClass(formControlEl, this.getFormFieldControlActionClass('start', currentSize));
    }
    if (this.endAction.length) {
      this.renderer.addClass(formControlEl, this.getFormFieldControlActionClass('end', currentSize));
    }
  }

  protected getFormFieldControlActionClass(actionPosition: NbFormControlActionPosition, size: NbComponentSize): string {
    return `nb-form-field-control-action-${actionPosition}-${size}`;
  }

  protected getFormFieldActionStatusClass(status: NbComponentStatus, focused: boolean): string {
    if (focused) {
      return `nb-form-field-action-${status}-focus`;
    }
    return `nb-form-field-action-${status}`;
  }
}
