/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  HostBinding,
  Input,
  OnDestroy,
  QueryList,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { convertToBoolProperty } from '../helpers';
import { NbOptionComponent } from './option.component';

/**
 * NbOptionGroupComponent
 *
 * @styles
 *
 * option-group-text-color:
 * option-group-tiny-start-padding:
 * option-group-small-start-padding:
 * option-group-medium-start-padding:
 * option-group-large-start-padding:
 * option-group-giant-start-padding:
 **/
@Component({
  selector: 'nb-option-group',
  styleUrls: ['./option-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="option-group-title">{{ title }}</span>
    <ng-content select="nb-option, ng-container"></ng-content>
  `,
})
export class NbOptionGroupComponent implements AfterContentInit, OnDestroy {

  protected destroy$ = new Subject<void>();

  @Input() title: string;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = convertToBoolProperty(value);

    if (this.options) {
      this.updateOptionsDisabledState();
    }
  }
  protected _disabled: boolean = false;

  @HostBinding('attr.disabled')
  get disabledAttribute(): '' | null {
    return this.disabled ? '' : null;
  }

  @ContentChildren(NbOptionComponent, { descendants: true }) options: QueryList<NbOptionComponent<any>>;

  ngAfterContentInit() {
    if (this.options.length) {
      this.asyncUpdateOptionsDisabledState();
    }

    this.options.changes
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.asyncUpdateOptionsDisabledState());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Sets disabled state for each option to current group disabled state.
   */
  protected updateOptionsDisabledState(): void {
    this.options.forEach((option: NbOptionComponent<any>) => option.setDisabledByGroupState(this.disabled));
  }

  /**
   * Updates options disabled state after promise resolution.
   * This way change detection will be triggered after options state updated.
   * Use this method when updating options during change detection run (e.g. QueryList.changes, lifecycle hooks).
   */
  protected asyncUpdateOptionsDisabledState(): void {
    Promise.resolve().then(() => this.updateOptionsDisabledState());
  }
}


