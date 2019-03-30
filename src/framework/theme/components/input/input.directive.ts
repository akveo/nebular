/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Directive, Input, HostBinding } from '@angular/core';
import { convertToBoolProperty } from '../helpers';

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
 * input-text-color:
 * input-padding:
 * input-placeholder-text-color:
 * input-placeholder-text-font-family:
 * input-placeholder-text-font-size:
 * input-placeholder-text-font-weight:
 * input-placeholder-text-line-height:
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
 * input-basic-border-color:
 * input-basic-focus-border-color:
 * input-basic-hover-border-color:
 */
@Directive({
  selector: 'input[nbInput],textarea[nbInput]',
})
export class NbInputDirective {

  static readonly SIZE_SMALL = 'small';
  static readonly SIZE_MEDIUM = 'medium';
  static readonly SIZE_LARGE = 'large';

  static readonly STATUS_PRIMARY = 'primary';
  static readonly STATUS_INFO = 'info';
  static readonly STATUS_SUCCESS = 'success';
  static readonly STATUS_WARNING = 'warning';
  static readonly STATUS_DANGER = 'danger';

  static readonly SHAPE_RECTANGLE = 'rectangle';
  static readonly SHAPE_SEMI_ROUND = 'semi-round';
  static readonly SHAPE_ROUND = 'round';

  size: string = NbInputDirective.SIZE_MEDIUM;

  /**
   * Field size, available sizes:
   * `small`, `medium`, `large`
   * @param {string} value
   */
  @Input('fieldSize')
  set setSize(value: string) {
    this.size = value;
  }

  /**
   * Field status (adds specific styles):
   * `info`, `success`, `warning`, `danger`
   * @param {string} val
   */
  @Input('status')
  status: string;

  /**
   * Field shapes: `rectangle`, `round`, `semi-round`
   * @param {string} val
   */
  @Input('shape')
  shape: string = NbInputDirective.SHAPE_RECTANGLE;

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
    return this.size === NbInputDirective.SIZE_SMALL;
  }

  @HostBinding('class.size-medium')
  get medium() {
    return this.size === NbInputDirective.SIZE_MEDIUM;
  }

  @HostBinding('class.size-large')
  get large() {
    return this.size === NbInputDirective.SIZE_LARGE;
  }

  @HostBinding('class.status-primary')
  get primary() {
    return this.status === NbInputDirective.STATUS_PRIMARY;
  }

  @HostBinding('class.status-info')
  get info() {
    return this.status === NbInputDirective.STATUS_INFO;
  }

  @HostBinding('class.status-success')
  get success() {
    return this.status === NbInputDirective.STATUS_SUCCESS;
  }

  @HostBinding('class.status-warning')
  get warning() {
    return this.status === NbInputDirective.STATUS_WARNING;
  }

  @HostBinding('class.status-danger')
  get danger() {
    return this.status === NbInputDirective.STATUS_DANGER;
  }

  @HostBinding('class.shape-rectangle')
  get rectangle() {
    return this.shape === NbInputDirective.SHAPE_RECTANGLE;
  }

  @HostBinding('class.shape-semi-round')
  get semiRound() {
    return this.shape === NbInputDirective.SHAPE_SEMI_ROUND;
  }

  @HostBinding('class.shape-round')
  get round() {
    return this.shape === NbInputDirective.SHAPE_ROUND;
  }
}
