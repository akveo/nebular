/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Directive, Input, HostBinding } from '@angular/core';
import { convertToBoolProperty } from '../helpers';
import { NbComponentStatus } from '../component-status';

export type NbInputSize = 'small' |  'medium' | '' | 'large';
export type NbInputShape = 'semi-round' | 'rectangle' | '' | 'round';

/**
 * Basic input directive.
 *
 * ```html
 * <input nbInput></input>
 * ```
 *
 * ### Installation
 *
 * Import `NbInputModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *   	// ...
 *     NbInputModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Default input size is `medium`:
 * @stacked-example(Showcase, input/input-showcase.component)
 *
 * Inputs are available in multiple colors using `status` property:
 * @stacked-example(Input Colors, input/input-colors.component)
 *
 * There are three input sizes:
 *
 * @stacked-example(Input Sizes, input/input-sizes.component)
 *
 * Inputs available in different shapes, which could be combined with the other properties:
 * @stacked-example(Input Shapes, input/input-shapes.component)
 *
 * `nbInput` could be applied to the following selectors - `input`, `textarea`:
 * @stacked-example(Input Elements, input/input-types.component)
 *
 * You can add `fullWidth` attribute to make element fill container:
 * @stacked-example(Full width inputs, input/input-full-width.component)
 *
 * Or you can bind control with form controls or ngModel:
 * @stacked-example(Input form binding, input/input-form.component)
 *
 * @styles
 *
 * input-background-color:
 * input-border-width:
 * input-border-radius:
 * input-padding:
 * input-placeholder-text-color:
 * input-placeholder-text-font-family:
 * input-placeholder-text-font-size:
 * input-placeholder-text-font-weight:
 * input-placeholder-text-line-height:
 * input-text-color:
 * input-text-font-family:
 * input-text-font-size:
 * input-text-font-weight:
 * input-text-line-height:
 * input-border-color:
 * input-focus-border-color:
 * input-hover-border-color:
 * input-disabled-border-color:
 * input-disabled-background-color:
 * input-disabled-text-color:
 * input-disabled-placeholder-text-color:
 * input-primary-border-color:
 * input-primary-focus-border-color:
 * input-primary-hover-border-color:
 * input-success-border-color:
 * input-success-focus-border-color:
 * input-success-hover-border-color:
 * input-info-border-color:
 * input-info-focus-border-color:
 * input-info-hover-border-color:
 * input-warning-border-color:
 * input-warning-focus-border-color:
 * input-warning-hover-border-color:
 * input-danger-border-color:
 * input-danger-focus-border-color:
 * input-danger-hover-border-color:
 * input-semi-round-border-radius:
 * input-round-border-radius:
 * input-small-text-font-size:
 * input-small-text-font-weight:
 * input-small-text-line-height:
 * input-small-padding:
 * input-large-text-font-size:
 * input-large-text-font-weight:
 * input-large-text-line-height:
 * input-large-padding:
 * input-state-transition-duration:
 * input-state-transition-timing-function:
 */
@Directive({
  selector: 'input[nbInput],textarea[nbInput]',
})
export class NbInputDirective {

  size: NbInputSize;

  /**
   * Field size, available sizes:
   * `small`, `medium` or `` (default), `large`
   * @param {string} value
   */
  @Input('fieldSize')
  set setSize(value: NbInputSize) {
    this.size = value;
  }

  /**
   * Field status (adds specific styles):
   * `primary`, `info`, `success`, `warning`, `danger`
   * @param {string} val
   */
  @Input('status')
  status: NbComponentStatus;

  /**
   * Field shapes: `rectangle` or `` (default), `round`, `semi-round`
   * @param {string} val
   */
  @Input('shape')
  shape: NbInputShape;

  /**
   * If set element will fill container
   * @param {string}
   */
  @Input('fullWidth')
  set setFullWidth(value) {
    this.fullWidth = convertToBoolProperty(value);
  }

  @HostBinding('class.input-full-width')
  fullWidth = false;

  @HostBinding('class.size-small')
  get small() {
    return this.size === 'small';
  }

  @HostBinding('class.size-large')
  get large() {
    return this.size === 'large';
  }

  @HostBinding('class.status-primary')
  get primary() {
    return this.status === 'primary';
  }

  @HostBinding('class.status-info')
  get info() {
    return this.status === 'info';
  }

  @HostBinding('class.status-success')
  get success() {
    return this.status === 'success';
  }

  @HostBinding('class.status-warning')
  get warning() {
    return this.status === 'warning';
  }

  @HostBinding('class.status-danger')
  get danger() {
    return this.status === 'danger';
  }

  @HostBinding('class.shape-semi-round')
  get semiRound() {
    return this.shape === 'semi-round';
  }

  @HostBinding('class.shape-round')
  get round() {
    return this.shape === 'round';
  }
}
