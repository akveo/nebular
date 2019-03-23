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
 * form-control-bg:
 * form-control-border-width:
 * form-control-border-type:
 * form-control-border-color:
 * form-control-text-primary-color:
 * form-control-focus-bg:
 * form-control-selected-border-color:
 * form-control-placeholder-font-size:
 * form-control-placeholder-color:
 * form-control-font-size:
 * form-control-padding:
 * form-control-font-size-sm:
 * form-control-padding-sm:
 * form-control-font-size-lg:
 * form-control-padding-lg:
 * form-control-border-radius:
 * form-control-semi-round-border-radius:
 * form-control-round-border-radius:
 * form-control-info-border-color:
 * form-control-success-border-color:
 * form-control-warning-border-color:
 * form-control-danger-border-color:
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
  static readonly STATUS_BASIC = 'basic';

  static readonly SHAPE_RECTANGLE = 'rectangle';
  static readonly SHAPE_SEMI_ROUND = 'semi-round';
  static readonly SHAPE_ROUND = 'round';

  size: string = NbInputDirective.SIZE_MEDIUM;

  /**
   * Field size, available sizes:
   * `small`, `medium`, `large`
   * @param {string} val
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

  @HostBinding('class.status-basic')
  get basic() {
    return this.status === NbInputDirective.STATUS_BASIC;
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
