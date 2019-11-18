/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { merge } from 'rxjs';
import { startWith, switchMap, takeWhile, filter } from 'rxjs/operators';

import {
  NbAdjustableConnectedPositionStrategy,
  NbAdjustment,
  NbPosition,
  NbPositionBuilderService,
} from '../cdk/overlay/overlay-position';
import { NbOverlayRef, NbPortalDirective, NbScrollStrategy } from '../cdk/overlay/mapping';
import { NbOverlayService } from '../cdk/overlay/overlay-service';
import { NbTrigger, NbTriggerStrategy, NbTriggerStrategyBuilderService } from '../cdk/overlay/overlay-trigger';
import { NbFocusKeyManager, NbFocusKeyManagerFactoryService } from '../cdk/a11y/focus-key-manager';
import { ESCAPE } from '../cdk/keycodes/keycodes';
import { NbComponentSize } from '../component-size';
import { NbComponentShape } from '../component-shape';
import { NbComponentStatus } from '../component-status';
import { NB_DOCUMENT } from '../../theme.options';
import { NbOptionComponent } from './option.component';
import { convertToBoolProperty } from '../helpers';
import { NB_SELECT_INJECTION_TOKEN } from './select-injection-tokens';

export type NbSelectAppearance = 'outline' | 'filled' | 'hero';

@Component({
  selector: 'nb-select-label',
  template: '<ng-content></ng-content>',
})
export class NbSelectLabelComponent {
}

/**
 * The `NbSelectComponent` provides a capability to select one of the passed items.
 *
 * @stacked-example(Showcase, select/select-showcase.component)
 *
 * ### Installation
 *
 * Import `NbSelectModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbSelectModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * If you want to use it as the multi-select control you have to mark it as `multiple`.
 * In this case, `nb-select` will work only with arrays - accept arrays and propagate arrays.
 *
 * @stacked-example(Multiple, select/select-multiple.component)
 *
 * Items without values will clean the selection. Both `null` and `undefined` values will also clean the selection.
 *
 * @stacked-example(Clean selection, select/select-clean.component)
 *
 * Select may be bounded using `selected` input:
 *
 * ```html
 * <nb-select [(selected)]="selected"></nb-selected>
 * ```
 *
 * Or you can bind control with form controls or ngModel:
 *
 * @stacked-example(Select form binding, select/select-form.component)
 *
 * Options in the select may be grouped using `nb-option-group` component.
 *
 * @stacked-example(Grouping, select/select-groups.component)
 *
 * Select may have a placeholder that will be shown when nothing selected:
 *
 * @stacked-example(Placeholder, select/select-placeholder.component)
 *
 * You can disable select, options and whole groups.
 *
 * @stacked-example(Disabled select, select/select-disabled.component)
 *
 * Also, the custom label may be provided in select.
 * This custom label will be used for instead placeholder when something selected.
 *
 * @stacked-example(Custom label, select/select-label.component)
 *
 * Default `nb-select` size is `medium` and status is `basic`.
 * Select is available in multiple colors using `status` property:
 *
 * @stacked-example(Select statuses, select/select-status.component)
 *
 * There are five select sizes:
 *
 * @stacked-example(Select sizes, select/select-sizes.component)
 *
 * And two additional style types - `filled`:
 *
 * @stacked-example(Filled select, select/select-filled.component)
 *
 * and `hero`:
 *
 * @stacked-example(Select colors, select/select-hero.component)
 *
 * Select is available in different shapes, that could be combined with the other properties:
 *
 * @stacked-example(Select shapes, select/select-shapes.component)
 *
 * @additional-example(Interactive, select/select-interactive.component)
 *
 * @styles
 *
 * select-cursor:
 * select-disabled-cursor:
 * select-min-width:
 * select-options-list-max-height:
 * select-options-list-shadow:
 * select-options-list-border-style:
 * select-options-list-border-width:
 * select-outline-width:
 * select-outline-color:
 * select-text-font-family:
 * select-placeholder-text-font-family:
 * select-option-background-color:
 * select-option-text-color:
 * select-option-selected-background-color:
 * select-option-selected-text-color:
 * select-option-focus-background-color:
 * select-option-focus-text-color:
 * select-option-hover-background-color:
 * select-option-hover-text-color:
 * select-option-disabled-background-color:
 * select-option-disabled-text-color:
 * select-tiny-text-font-size:
 * select-tiny-text-font-weight:
 * select-tiny-text-line-height:
 * select-tiny-placeholder-text-font-size:
 * select-tiny-placeholder-text-font-weight:
 * select-tiny-max-width:
 * select-small-text-font-size:
 * select-small-text-font-weight:
 * select-small-text-line-height:
 * select-small-placeholder-text-font-size:
 * select-small-placeholder-text-font-weight:
 * select-small-max-width:
 * select-medium-text-font-size:
 * select-medium-text-font-weight:
 * select-medium-text-line-height:
 * select-medium-placeholder-text-font-size:
 * select-medium-placeholder-text-font-weight:
 * select-medium-max-width:
 * select-large-text-font-size:
 * select-large-text-font-weight:
 * select-large-text-line-height:
 * select-large-placeholder-text-font-size:
 * select-large-placeholder-text-font-weight:
 * select-large-max-width:
 * select-giant-text-font-size:
 * select-giant-text-font-weight:
 * select-giant-text-line-height:
 * select-giant-placeholder-text-font-size:
 * select-giant-placeholder-text-font-weight:
 * select-giant-max-width:
 * select-rectangle-border-radius:
 * select-semi-round-border-radius:
 * select-round-border-radius:
 * select-outline-border-style:
 * select-outline-border-width:
 * select-outline-tiny-padding:
 * select-outline-small-padding:
 * select-outline-medium-padding:
 * select-outline-large-padding:
 * select-outline-giant-padding:
 * select-outline-basic-icon-color:
 * select-outline-basic-text-color:
 * select-outline-basic-placeholder-text-color:
 * select-outline-basic-background-color:
 * select-outline-basic-border-color:
 * select-outline-basic-focus-background-color:
 * select-outline-basic-focus-border-color:
 * select-outline-basic-hover-background-color:
 * select-outline-basic-hover-border-color:
 * select-outline-basic-disabled-background-color:
 * select-outline-basic-disabled-border-color:
 * select-outline-basic-disabled-icon-color:
 * select-outline-basic-disabled-text-color:
 * select-outline-primary-icon-color:
 * select-outline-primary-text-color:
 * select-outline-primary-placeholder-text-color:
 * select-outline-primary-background-color:
 * select-outline-primary-border-color:
 * select-outline-primary-focus-background-color:
 * select-outline-primary-focus-border-color:
 * select-outline-primary-hover-background-color:
 * select-outline-primary-hover-border-color:
 * select-outline-primary-disabled-background-color:
 * select-outline-primary-disabled-border-color:
 * select-outline-primary-disabled-icon-color:
 * select-outline-primary-disabled-text-color:
 * select-outline-success-icon-color:
 * select-outline-success-text-color:
 * select-outline-success-placeholder-text-color:
 * select-outline-success-background-color:
 * select-outline-success-border-color:
 * select-outline-success-focus-background-color:
 * select-outline-success-focus-border-color:
 * select-outline-success-hover-background-color:
 * select-outline-success-hover-border-color:
 * select-outline-success-disabled-background-color:
 * select-outline-success-disabled-border-color:
 * select-outline-success-disabled-icon-color:
 * select-outline-success-disabled-text-color:
 * select-outline-info-icon-color:
 * select-outline-info-text-color:
 * select-outline-info-placeholder-text-color:
 * select-outline-info-background-color:
 * select-outline-info-border-color:
 * select-outline-info-focus-background-color:
 * select-outline-info-focus-border-color:
 * select-outline-info-hover-background-color:
 * select-outline-info-hover-border-color:
 * select-outline-info-disabled-background-color:
 * select-outline-info-disabled-border-color:
 * select-outline-info-disabled-icon-color:
 * select-outline-info-disabled-text-color:
 * select-outline-warning-icon-color:
 * select-outline-warning-text-color:
 * select-outline-warning-placeholder-text-color:
 * select-outline-warning-background-color:
 * select-outline-warning-border-color:
 * select-outline-warning-focus-background-color:
 * select-outline-warning-focus-border-color:
 * select-outline-warning-hover-background-color:
 * select-outline-warning-hover-border-color:
 * select-outline-warning-disabled-background-color:
 * select-outline-warning-disabled-border-color:
 * select-outline-warning-disabled-icon-color:
 * select-outline-warning-disabled-text-color:
 * select-outline-danger-icon-color:
 * select-outline-danger-text-color:
 * select-outline-danger-placeholder-text-color:
 * select-outline-danger-background-color:
 * select-outline-danger-border-color:
 * select-outline-danger-focus-background-color:
 * select-outline-danger-focus-border-color:
 * select-outline-danger-hover-background-color:
 * select-outline-danger-hover-border-color:
 * select-outline-danger-disabled-background-color:
 * select-outline-danger-disabled-border-color:
 * select-outline-danger-disabled-icon-color:
 * select-outline-danger-disabled-text-color:
 * select-outline-control-icon-color:
 * select-outline-control-text-color:
 * select-outline-control-placeholder-text-color:
 * select-outline-control-background-color:
 * select-outline-control-border-color:
 * select-outline-control-focus-background-color:
 * select-outline-control-focus-border-color:
 * select-outline-control-hover-background-color:
 * select-outline-control-hover-border-color:
 * select-outline-control-disabled-background-color:
 * select-outline-control-disabled-border-color:
 * select-outline-control-disabled-icon-color:
 * select-outline-control-disabled-text-color:
 * select-option-outline-tiny-padding:
 * select-option-outline-small-padding:
 * select-option-outline-medium-padding:
 * select-option-outline-large-padding:
 * select-option-outline-giant-padding:
 * select-outline-adjacent-border-style:
 * select-outline-adjacent-border-width:
 * select-outline-basic-open-border-color:
 * select-outline-basic-adjacent-border-color:
 * select-outline-primary-open-border-color:
 * select-outline-primary-adjacent-border-color:
 * select-outline-success-open-border-color:
 * select-outline-success-adjacent-border-color:
 * select-outline-info-open-border-color:
 * select-outline-info-adjacent-border-color:
 * select-outline-warning-open-border-color:
 * select-outline-warning-adjacent-border-color:
 * select-outline-danger-open-border-color:
 * select-outline-danger-adjacent-border-color:
 * select-outline-control-open-border-color:
 * select-outline-control-adjacent-border-color:
 * select-group-option-outline-tiny-start-padding:
 * select-group-option-outline-small-start-padding:
 * select-group-option-outline-medium-start-padding:
 * select-group-option-outline-large-start-padding:
 * select-group-option-outline-giant-start-padding:
 * select-options-list-outline-basic-border-color:
 * select-options-list-outline-primary-border-color:
 * select-options-list-outline-success-border-color:
 * select-options-list-outline-info-border-color:
 * select-options-list-outline-warning-border-color:
 * select-options-list-outline-danger-border-color:
 * select-options-list-outline-control-border-color:
 * select-filled-border-style:
 * select-filled-border-width:
 * select-filled-tiny-padding:
 * select-filled-small-padding:
 * select-filled-medium-padding:
 * select-filled-large-padding:
 * select-filled-giant-padding:
 * select-filled-basic-background-color:
 * select-filled-basic-border-color:
 * select-filled-basic-icon-color:
 * select-filled-basic-text-color:
 * select-filled-basic-placeholder-text-color:
 * select-filled-basic-focus-background-color:
 * select-filled-basic-focus-border-color:
 * select-filled-basic-hover-background-color:
 * select-filled-basic-hover-border-color:
 * select-filled-basic-disabled-background-color:
 * select-filled-basic-disabled-border-color:
 * select-filled-basic-disabled-icon-color:
 * select-filled-basic-disabled-text-color:
 * select-filled-primary-background-color:
 * select-filled-primary-border-color:
 * select-filled-primary-icon-color:
 * select-filled-primary-text-color:
 * select-filled-primary-placeholder-text-color:
 * select-filled-primary-focus-background-color:
 * select-filled-primary-focus-border-color:
 * select-filled-primary-hover-background-color:
 * select-filled-primary-hover-border-color:
 * select-filled-primary-disabled-background-color:
 * select-filled-primary-disabled-border-color:
 * select-filled-primary-disabled-icon-color:
 * select-filled-primary-disabled-text-color:
 * select-filled-success-background-color:
 * select-filled-success-border-color:
 * select-filled-success-icon-color:
 * select-filled-success-text-color:
 * select-filled-success-placeholder-text-color:
 * select-filled-success-focus-background-color:
 * select-filled-success-focus-border-color:
 * select-filled-success-hover-background-color:
 * select-filled-success-hover-border-color:
 * select-filled-success-disabled-background-color:
 * select-filled-success-disabled-border-color:
 * select-filled-success-disabled-icon-color:
 * select-filled-success-disabled-text-color:
 * select-filled-info-background-color:
 * select-filled-info-border-color:
 * select-filled-info-icon-color:
 * select-filled-info-text-color:
 * select-filled-info-placeholder-text-color:
 * select-filled-info-focus-background-color:
 * select-filled-info-focus-border-color:
 * select-filled-info-hover-background-color:
 * select-filled-info-hover-border-color:
 * select-filled-info-disabled-background-color:
 * select-filled-info-disabled-border-color:
 * select-filled-info-disabled-icon-color:
 * select-filled-info-disabled-text-color:
 * select-filled-warning-background-color:
 * select-filled-warning-border-color:
 * select-filled-warning-icon-color:
 * select-filled-warning-text-color:
 * select-filled-warning-placeholder-text-color:
 * select-filled-warning-focus-background-color:
 * select-filled-warning-focus-border-color:
 * select-filled-warning-hover-background-color:
 * select-filled-warning-hover-border-color:
 * select-filled-warning-disabled-background-color:
 * select-filled-warning-disabled-border-color:
 * select-filled-warning-disabled-icon-color:
 * select-filled-warning-disabled-text-color:
 * select-filled-danger-background-color:
 * select-filled-danger-border-color:
 * select-filled-danger-icon-color:
 * select-filled-danger-text-color:
 * select-filled-danger-placeholder-text-color:
 * select-filled-danger-focus-background-color:
 * select-filled-danger-focus-border-color:
 * select-filled-danger-hover-background-color:
 * select-filled-danger-hover-border-color:
 * select-filled-danger-disabled-background-color:
 * select-filled-danger-disabled-border-color:
 * select-filled-danger-disabled-icon-color:
 * select-filled-danger-disabled-text-color:
 * select-filled-control-background-color:
 * select-filled-control-border-color:
 * select-filled-control-icon-color:
 * select-filled-control-text-color:
 * select-filled-control-placeholder-text-color:
 * select-filled-control-focus-background-color:
 * select-filled-control-focus-border-color:
 * select-filled-control-hover-background-color:
 * select-filled-control-hover-border-color:
 * select-filled-control-disabled-background-color:
 * select-filled-control-disabled-border-color:
 * select-filled-control-disabled-icon-color:
 * select-filled-control-disabled-text-color:
 * select-option-filled-tiny-padding:
 * select-group-option-filled-tiny-padding-start:
 * select-option-filled-small-padding:
 * select-group-option-filled-small-padding-start:
 * select-option-filled-medium-padding:
 * select-group-option-filled-medium-padding-start:
 * select-option-filled-large-padding:
 * select-group-option-filled-large-padding-start:
 * select-option-filled-giant-padding:
 * select-group-option-filled-giant-padding-start:
 * select-options-list-filled-basic-border-color:
 * select-options-list-filled-primary-border-color:
 * select-options-list-filled-success-border-color:
 * select-options-list-filled-info-border-color:
 * select-options-list-filled-warning-border-color:
 * select-options-list-filled-danger-border-color:
 * select-options-list-filled-control-border-color:
 * select-hero-tiny-padding:
 * select-hero-small-padding:
 * select-hero-medium-padding:
 * select-hero-large-padding:
 * select-hero-giant-padding:
 * select-hero-basic-left-background-color:
 * select-hero-basic-right-background-color:
 * select-hero-basic-icon-color:
 * select-hero-basic-text-color:
 * select-hero-basic-placeholder-text-color:
 * select-hero-basic-focus-left-background-color:
 * select-hero-basic-focus-right-background-color:
 * select-hero-basic-hover-left-background-color:
 * select-hero-basic-hover-right-background-color:
 * select-hero-basic-disabled-background-color:
 * select-hero-basic-disabled-icon-color:
 * select-hero-basic-disabled-text-color:
 * select-hero-primary-left-background-color:
 * select-hero-primary-right-background-color:
 * select-hero-primary-icon-color:
 * select-hero-primary-text-color:
 * select-hero-primary-placeholder-text-color:
 * select-hero-primary-focus-left-background-color:
 * select-hero-primary-focus-right-background-color:
 * select-hero-primary-hover-left-background-color:
 * select-hero-primary-hover-right-background-color:
 * select-hero-primary-disabled-background-color:
 * select-hero-primary-disabled-icon-color:
 * select-hero-primary-disabled-text-color:
 * select-hero-success-left-background-color:
 * select-hero-success-right-background-color:
 * select-hero-success-icon-color:
 * select-hero-success-text-color:
 * select-hero-success-placeholder-text-color:
 * select-hero-success-focus-left-background-color:
 * select-hero-success-focus-right-background-color:
 * select-hero-success-hover-left-background-color:
 * select-hero-success-hover-right-background-color:
 * select-hero-success-disabled-background-color:
 * select-hero-success-disabled-icon-color:
 * select-hero-success-disabled-text-color:
 * select-hero-info-left-background-color:
 * select-hero-info-right-background-color:
 * select-hero-info-icon-color:
 * select-hero-info-text-color:
 * select-hero-info-placeholder-text-color:
 * select-hero-info-focus-left-background-color:
 * select-hero-info-focus-right-background-color:
 * select-hero-info-hover-left-background-color:
 * select-hero-info-hover-right-background-color:
 * select-hero-info-disabled-background-color:
 * select-hero-info-disabled-icon-color:
 * select-hero-info-disabled-text-color:
 * select-hero-warning-left-background-color:
 * select-hero-warning-right-background-color:
 * select-hero-warning-icon-color:
 * select-hero-warning-text-color:
 * select-hero-warning-placeholder-text-color:
 * select-hero-warning-focus-left-background-color:
 * select-hero-warning-focus-right-background-color:
 * select-hero-warning-hover-left-background-color:
 * select-hero-warning-hover-right-background-color:
 * select-hero-warning-disabled-background-color:
 * select-hero-warning-disabled-icon-color:
 * select-hero-warning-disabled-text-color:
 * select-hero-danger-left-background-color:
 * select-hero-danger-right-background-color:
 * select-hero-danger-icon-color:
 * select-hero-danger-text-color:
 * select-hero-danger-placeholder-text-color:
 * select-hero-danger-focus-left-background-color:
 * select-hero-danger-focus-right-background-color:
 * select-hero-danger-hover-left-background-color:
 * select-hero-danger-hover-right-background-color:
 * select-hero-danger-disabled-background-color:
 * select-hero-danger-disabled-icon-color:
 * select-hero-danger-disabled-text-color:
 * select-hero-control-left-background-color:
 * select-hero-control-right-background-color:
 * select-hero-control-icon-color:
 * select-hero-control-text-color:
 * select-hero-control-placeholder-text-color:
 * select-hero-control-focus-left-background-color:
 * select-hero-control-focus-right-background-color:
 * select-hero-control-hover-left-background-color:
 * select-hero-control-hover-right-background-color:
 * select-hero-control-disabled-background-color:
 * select-hero-control-disabled-icon-color:
 * select-hero-control-disabled-text-color:
 * select-option-hero-tiny-padding:
 * select-group-option-hero-tiny-padding-start:
 * select-option-hero-small-padding:
 * select-group-option-hero-small-padding-start:
 * select-option-hero-medium-padding:
 * select-group-option-hero-medium-padding-start:
 * select-option-hero-large-padding:
 * select-group-option-hero-large-padding-start:
 * select-option-hero-giant-padding:
 * select-group-option-hero-giant-padding-start:
 * select-options-list-hero-basic-border-color:
 * select-options-list-hero-primary-border-color:
 * select-options-list-hero-success-border-color:
 * select-options-list-hero-info-border-color:
 * select-options-list-hero-warning-border-color:
 * select-options-list-hero-danger-border-color:
 * select-options-list-hero-control-border-color:
 * */
@Component({
  selector: 'nb-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NbSelectComponent),
      multi: true,
    },
    { provide: NB_SELECT_INJECTION_TOKEN, useExisting: NbSelectComponent },
  ],
})
export class NbSelectComponent<T> implements AfterViewInit, AfterContentInit, OnDestroy, ControlValueAccessor {

  /**
   * Select size, available sizes:
   * `tiny`, `small`, `medium` (default), `large`, `giant`
   */
  @Input() size: NbComponentSize = 'medium';

  /**
   * Select status (adds specific styles):
   * `basic`, `primary`, `info`, `success`, `warning`, `danger`, `control`
   */
  @Input() status: NbComponentStatus = 'basic';

  /**
   * Select shapes: `rectangle` (default), `round`, `semi-round`
   */
  @Input() shape: NbComponentShape = 'rectangle';

  /**
   * Select appearances: `outline` (default), `filled`, `hero`
   */
  @Input() appearance: NbSelectAppearance = 'outline';

  /**
   * Adds `outline` styles
   */
  @Input()
  @HostBinding('class.appearance-outline')
  get outline(): boolean {
    return this.appearance === 'outline';
  }
  set outline(value: boolean) {
    if (convertToBoolProperty(value)) {
      this.appearance = 'outline';
    }
  }

  /**
   * Adds `filled` styles
   */
  @Input()
  @HostBinding('class.appearance-filled')
  get filled(): boolean {
    return this.appearance === 'filled';
  }
  set filled(value: boolean) {
    if (convertToBoolProperty(value)) {
      this.appearance = 'filled';
    }
  }

  /**
   * Adds `hero` styles
   */
  @Input()
  @HostBinding('class.appearance-hero')
  get hero(): boolean {
    return this.appearance === 'hero';
  }
  set hero(value: boolean) {
    if (convertToBoolProperty(value)) {
      this.appearance = 'hero';
    }
  }

  /**
   * Disables the select
   */
  @Input()
  get disabled(): boolean {
    return !!this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = convertToBoolProperty(value);
  }
  protected _disabled: boolean;

  /**
   * If set element will fill its container
   */
  @Input()
  @HostBinding('class.full-width')
  get fullWidth(): boolean {
    return this._fullWidth;
  }
  set fullWidth(value: boolean) {
    this._fullWidth = convertToBoolProperty(value);
  }
  protected _fullWidth: boolean = false;

  /**
   * Renders select placeholder if nothing selected.
   * */
  @Input() placeholder: string = '';

  /**
   * Accepts selected item or array of selected items.
   * */
  @Input()
  set selected(value: T | T[]) {
    this.writeValue(value);
  }
  get selected(): T | T[] {
    return this.multiple
      ? this.selectionModel.map(o => o.value)
      : this.selectionModel[0].value;
  }

  /**
   * Gives capability just write `multiple` over the element.
   * */
  @Input()
  get multiple(): boolean {
    return this._multiple;
  }
  set multiple(value: boolean) {
    this._multiple = convertToBoolProperty(value);
  }
  protected _multiple: boolean = false;

  /**
   * Will be emitted when selected value changes.
   * */
  @Output() selectedChange: EventEmitter<T | T[]> = new EventEmitter();

  /**
   * List of `NbOptionComponent`'s components passed as content.
   * TODO maybe it would be better provide wrapper
   * */
  @ContentChildren(NbOptionComponent, { descendants: true }) options: QueryList<NbOptionComponent<T>>;

  /**
   * Custom select label, will be rendered instead of default enumeration with coma.
   * */
  @ContentChild(NbSelectLabelComponent, { static: false }) customLabel;

  /**
   * NbCard with options content.
   * */
  @ViewChild(NbPortalDirective, { static: false }) portal: NbPortalDirective;

  @ViewChild('selectButton', { read: ElementRef, static: false }) button: ElementRef<HTMLButtonElement>;

  /**
   * Determines is select opened.
   * */
  @HostBinding('class.open')
  get isOpen(): boolean {
    return this.ref && this.ref.hasAttached();
  }

  /**
   * List of selected options.
   * */
  selectionModel: NbOptionComponent<T>[] = [];

  positionStrategy: NbAdjustableConnectedPositionStrategy;

  /**
   * Current overlay position because of we have to toggle overlayPosition
   * in [ngClass] direction and this directive can use only string.
   */
  overlayPosition: NbPosition = '' as NbPosition;

  protected ref: NbOverlayRef;

  protected triggerStrategy: NbTriggerStrategy;

  protected alive: boolean = true;

  protected keyManager: NbFocusKeyManager<NbOptionComponent<T>>;

  /**
   * If a user assigns value before content nb-options's rendered the value will be putted in this variable.
   * And then applied after content rendered.
   * Only the last value will be applied.
   * */
  protected queue: T | T[];

  /**
   * Function passed through control value accessor to propagate changes.
   * */
  protected onChange: Function = () => {};
  protected onTouched: Function = () => {};

  constructor(@Inject(NB_DOCUMENT) protected document,
              protected overlay: NbOverlayService,
              protected hostRef: ElementRef<HTMLElement>,
              protected positionBuilder: NbPositionBuilderService,
              protected triggerStrategyBuilder: NbTriggerStrategyBuilderService,
              protected cd: ChangeDetectorRef,
              protected focusKeyManagerFactoryService: NbFocusKeyManagerFactoryService<NbOptionComponent<T>>) {
  }

  /**
   * Determines is select hidden.
   * */
  get isHidden(): boolean {
    return !this.isOpen;
  }

  /**
   * Returns width of the select button.
   * */
  get hostWidth(): number {
    return this.button.nativeElement.getBoundingClientRect().width;
  }

  get selectButtonClasses(): string[] {
    const classes = [];

    if (!this.selectionModel.length) {
      classes.push('placeholder');
    }
    if (!this.selectionModel.length && !this.placeholder) {
      classes.push('empty');
    }
    if (this.isOpen) {
      classes.push(this.overlayPosition);
    }

    return classes;
  }

  get optionsListClasses(): string[] {
    const classes = [
      `appearance-${this.appearance}`,
      `size-${this.size}`,
      `shape-${this.shape}`,
      `status-${this.status}`,
      this.overlayPosition,
    ];

    if (this.fullWidth) {
      classes.push('full-width');
    }

    return classes;
  }

  /**
   * Content rendered in the label.
   * */
  get selectionView() {
    if (this.selectionModel.length > 1) {
      return this.selectionModel.map((option: NbOptionComponent<T>) => option.content).join(', ');
    }

    return this.selectionModel[0].content;
  }

  ngAfterContentInit() {
    this.options.changes
      .pipe(
        takeWhile(() => this.alive),
        startWith(this.options),
        filter(() => this.queue != null && this.canSelectValue()),
      )
      .subscribe(() => {
        // Call 'writeValue' when current change detection run is finished.
        // When writing is finished, change detection starts again, since
        // microtasks queue is empty.
        // Prevents ExpressionChangedAfterItHasBeenCheckedError.
        Promise.resolve().then(() => {
          this.writeValue(this.queue);
        });
      });
  }

  ngAfterViewInit() {
    this.triggerStrategy = this.createTriggerStrategy();

    this.subscribeOnTriggers();
    this.subscribeOnOptionClick();
  }

  ngOnDestroy() {
    this.alive = false;

    if (this.ref) {
      this.ref.dispose();
    }
    if (this.triggerStrategy) {
      this.triggerStrategy.destroy();
    }
  }

  show() {
    if (this.isHidden) {
      this.attachToOverlay();
      this.setActiveOption();
      this.cd.markForCheck();
    }
  }

  hide() {
    if (this.isOpen) {
      this.ref.detach();
      this.cd.markForCheck();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cd.markForCheck();
  }

  writeValue(value: T | T[]): void {
    if (!this.alive) {
      return;
    }

    if (this.canSelectValue()) {
      this.setSelection(value);
      if (this.selectionModel.length) {
        this.queue = null;
      }
    } else {
      this.queue = value;
    }
  }

  /**
   * Selects option or clear all selected options if value is null.
   * */
  protected handleOptionClick(option: NbOptionComponent<T>) {
    this.queue = null;
    if (option.value == null) {
      this.reset();
    } else {
      this.selectOption(option);
    }

    this.cd.markForCheck();
  }

  /**
   * Deselect all selected options.
   * */
  protected reset() {
    this.selectionModel.forEach((option: NbOptionComponent<T>) => option.deselect());
    this.selectionModel = [];
    this.hide();
    this.button.nativeElement.focus();
    this.emitSelected(this.multiple ? [] : null);
  }

  /**
   * Determines how to select option as multiple or single.
   * */
  protected selectOption(option: NbOptionComponent<T>) {
    if (this.multiple) {
      this.handleMultipleSelect(option);
    } else {
      this.handleSingleSelect(option);
    }
  }

  /**
   * Select single option.
   * */
  protected handleSingleSelect(option: NbOptionComponent<T>) {
    const selected = this.selectionModel.pop();

    if (selected && selected !== option) {
      selected.deselect();
    }

    this.selectionModel = [option];
    option.select();
    this.hide();
    this.button.nativeElement.focus();

    this.emitSelected(option.value);
  }

  /**
   * Select for multiple options.
   * */
  protected handleMultipleSelect(option: NbOptionComponent<T>) {
    if (option.selected) {
      this.selectionModel = this.selectionModel.filter(s => s.value !== option.value);
      option.deselect();
    } else {
      this.selectionModel.push(option);
      option.select();
    }

    this.emitSelected(this.selectionModel.map((opt: NbOptionComponent<T>) => opt.value));
  }

  protected attachToOverlay() {
    if (!this.ref) {
      this.createOverlay();
      this.subscribeOnPositionChange();
      this.createKeyManager();
      this.subscribeOnOverlayKeys();
    }

    this.ref.attach(this.portal);
  }

  protected setActiveOption() {
    if (this.selectionModel.length) {
      this.keyManager.setActiveItem(this.selectionModel[ 0 ]);
    } else {
      this.keyManager.setFirstItemActive();
    }
  }

  protected createOverlay() {
    const scrollStrategy = this.createScrollStrategy();
    this.positionStrategy = this.createPositionStrategy();
    this.ref = this.overlay.create({ positionStrategy: this.positionStrategy, scrollStrategy });
  }

  protected createKeyManager(): void {
    this.keyManager = this.focusKeyManagerFactoryService.create(this.options).withTypeAhead(200);
  }

  protected createPositionStrategy(): NbAdjustableConnectedPositionStrategy {
    return this.positionBuilder
      .connectedTo(this.button)
      .position(NbPosition.BOTTOM)
      .offset(0)
      .adjustment(NbAdjustment.VERTICAL);
  }

  protected createScrollStrategy(): NbScrollStrategy {
    return this.overlay.scrollStrategies.block();
  }

  protected createTriggerStrategy(): NbTriggerStrategy {
    return this.triggerStrategyBuilder
      .trigger(NbTrigger.CLICK)
      .host(this.hostRef.nativeElement)
      .container(() => this.getContainer())
      .build();
  }

  protected subscribeOnTriggers() {
    this.triggerStrategy.show$.subscribe(() => this.show());
    this.triggerStrategy.hide$
      .pipe(filter(() => this.isOpen))
      .subscribe(($event: Event) => {
        this.hide();
        if (!this.isClickedWithinComponent($event)) {
          this.onTouched();
        }
      });
  }

  protected subscribeOnPositionChange() {
    this.positionStrategy.positionChange
      .pipe(takeWhile(() => this.alive))
      .subscribe((position: NbPosition) => {
        this.overlayPosition = position;
        this.cd.detectChanges();
      });
  }

  protected subscribeOnOptionClick() {
    /**
     * If the user changes provided options list in the runtime we have to handle this
     * and resubscribe on options selection changes event.
     * Otherwise, the user will not be able to select new options.
     * */
    this.options.changes
      .pipe(
        startWith(this.options),
        switchMap((options: QueryList<NbOptionComponent<T>>) => {
          return merge(...options.map(option => option.click));
        }),
        takeWhile(() => this.alive),
      )
      .subscribe((clickedOption: NbOptionComponent<T>) => this.handleOptionClick(clickedOption));
  }

  protected subscribeOnOverlayKeys(): void {
    this.ref.keydownEvents()
      .pipe(
        takeWhile(() => this.alive),
        filter(() => this.isOpen),
      )
      .subscribe((event: KeyboardEvent) => {
        if (event.keyCode === ESCAPE) {
          this.button.nativeElement.focus();
          this.hide();
        } else {
          this.keyManager.onKeydown(event);
        }
      });

    this.keyManager.tabOut
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.hide();
        this.onTouched();
      });
  }

  protected getContainer() {
    return this.ref && this.ref.hasAttached() && <ComponentRef<any>> {
      location: {
        nativeElement: this.ref.overlayElement,
      },
    };
  }

  /**
   * Propagate selected value.
   * */
  protected emitSelected(selected: T | T[]) {
    this.onChange(selected);
    this.selectedChange.emit(selected);
  }

  /**
   * Set selected value in model.
   * */
  protected setSelection(value: T | T[]) {
    const isArray: boolean = Array.isArray(value);

    if (this.multiple && !isArray) {
      throw new Error('Can\'t assign single value if select is marked as multiple');
    }

    if (!this.multiple && isArray) {
      throw new Error('Can\'t assign array if select is not marked as multiple');
    }

    const previouslySelectedOptions = this.selectionModel;
    this.selectionModel = [];

    if (isArray) {
      (<T[]> value).forEach((option: T) => this.selectValue(option));
    } else {
      this.selectValue(<T> value);
    }

    // find options which were selected before and trigger deselect
    previouslySelectedOptions
      .filter((option: NbOptionComponent<T>) => !this.selectionModel.includes(option))
      .forEach((option: NbOptionComponent<T>) => option.deselect());

    this.cd.markForCheck();
  }

  /**
   * Selects value.
   * */
  protected selectValue(value: T) {
    const corresponding = this.options.find((option: NbOptionComponent<T>) => option.value === value);

    if (corresponding) {
      corresponding.select();
      this.selectionModel.push(corresponding);
    }
  }

  /**
   * Sets touched if focus moved outside of button and overlay,
   * ignoring the case when focus moved to options overlay.
   */
  trySetTouched() {
    if (this.isHidden) {
      this.onTouched();
    }
  }

  protected isClickedWithinComponent($event: Event) {
    return this.hostRef.nativeElement === $event.target || this.hostRef.nativeElement.contains($event.target as Node);
  }

  protected canSelectValue(): boolean {
    return !!(this.options && this.options.length);
  }

  @HostBinding('class.size-tiny')
  get tiny(): boolean {
    return this.size === 'tiny';
  }
  @HostBinding('class.size-small')
  get small(): boolean {
    return this.size === 'small';
  }
  @HostBinding('class.size-medium')
  get medium(): boolean {
    return this.size === 'medium';
  }
  @HostBinding('class.size-large')
  get large(): boolean {
    return this.size === 'large';
  }
  @HostBinding('class.size-giant')
  get giant(): boolean {
    return this.size === 'giant';
  }
  @HostBinding('class.status-primary')
  get primary(): boolean {
    return this.status === 'primary';
  }
  @HostBinding('class.status-info')
  get info(): boolean {
    return this.status === 'info';
  }
  @HostBinding('class.status-success')
  get success(): boolean {
    return this.status === 'success';
  }
  @HostBinding('class.status-warning')
  get warning(): boolean {
    return this.status === 'warning';
  }
  @HostBinding('class.status-danger')
  get danger(): boolean {
    return this.status === 'danger';
  }
  @HostBinding('class.status-basic')
  get basic(): boolean {
    return this.status === 'basic';
  }
  @HostBinding('class.status-control')
  get control(): boolean {
    return this.status === 'control';
  }
  @HostBinding('class.shape-rectangle')
  get rectangle(): boolean {
    return this.shape === 'rectangle';
  }
  @HostBinding('class.shape-round')
  get round(): boolean {
    return this.shape === 'round';
  }
  @HostBinding('class.shape-semi-round')
  get semiRound(): boolean {
    return this.shape === 'semi-round';
  }
}
