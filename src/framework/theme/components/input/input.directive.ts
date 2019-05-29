/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Directive, Input, HostBinding } from '@angular/core';

import { convertToBoolProperty } from '../helpers';
import { NbComponentSize } from '../component-size';
import { NbComponentShape } from '../component-shape';
import { NbComponentStatus } from '../component-status';

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
 *     // ...
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
 * input-border-style:
 * input-border-width:
 * input-outline-color:
 * input-outline-width:
 * input-placeholder-text-color:
 * input-placeholder-text-font-family:
 * input-text-color:
 * input-text-font-family:
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
 * input-rectangle-border-radius:
 * input-semi-round-border-radius:
 * input-round-border-radius:
 * input-tiny-text-font-size:
 * input-tiny-text-font-weight:
 * input-tiny-text-line-height:
 * input-tiny-placeholder-text-font-size:
 * input-tiny-placeholder-text-font-weight:
 * input-tiny-placeholder-text-line-height:
 * input-tiny-padding:
 * input-tiny-max-width:
 * input-small-text-font-size:
 * input-small-text-font-weight:
 * input-small-text-line-height:
 * input-small-placeholder-text-font-size:
 * input-small-placeholder-text-font-weight:
 * input-small-placeholder-text-line-height:
 * input-small-padding:
 * input-small-max-width:
 * input-medium-text-font-size:
 * input-medium-text-font-weight:
 * input-medium-text-line-height:
 * input-medium-placeholder-text-font-size:
 * input-medium-placeholder-text-font-weight:
 * input-medium-placeholder-text-line-height:
 * input-medium-padding:
 * input-medium-max-width:
 * input-large-text-font-size:
 * input-large-text-font-weight:
 * input-large-text-line-height:
 * input-large-placeholder-text-font-size:
 * input-large-placeholder-text-font-weight:
 * input-large-placeholder-text-line-height:
 * input-large-padding:
 * input-large-max-width:
 * input-giant-text-font-size:
 * input-giant-text-font-weight:
 * input-giant-text-line-height:
 * input-giant-placeholder-text-font-size:
 * input-giant-placeholder-text-font-weight:
 * input-giant-placeholder-text-line-height:
 * input-giant-padding:
 * input-giant-max-width:
 */
@Directive({
  selector: 'input[nbInput],textarea[nbInput]',
})
export class NbInputDirective {

  /**
   * Field size modifications. Possible values: `small`, `medium` (default), `large`.
   */
  @Input()
  fieldSize: NbComponentSize = 'medium';

  /**
   * Field status (adds specific styles):
   * `primary`, `info`, `success`, `warning`, `danger`
   */
  @Input()
  status: '' | NbComponentStatus = '';

  /**
   * Field shapes modifications. Possible values: `rectangle` (default), `round`, `semi-round`.
   */
  @Input()
  shape: NbComponentShape = 'rectangle';

  /**
   * If set element will fill container. `false` by default.
   */
  @Input()
  @HostBinding('class.input-full-width')
  get fullWidth(): boolean {
    return this._fullWidth;
  }
  set fullWidth(value: boolean) {
    this._fullWidth = convertToBoolProperty(value);
  }
  private _fullWidth = false;

  @HostBinding('class.size-tiny')
  get tiny() {
    return this.fieldSize === 'tiny';
  }

  @HostBinding('class.size-small')
  get small() {
    return this.fieldSize === 'small';
  }

  @HostBinding('class.size-medium')
  get medium() {
    return this.fieldSize === 'medium';
  }

  @HostBinding('class.size-large')
  get large() {
    return this.fieldSize === 'large';
  }

  @HostBinding('class.size-giant')
  get giant() {
    return this.fieldSize === 'giant';
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

  @HostBinding('class.shape-rectangle')
  get rectangle() {
    return this.shape === 'rectangle';
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
