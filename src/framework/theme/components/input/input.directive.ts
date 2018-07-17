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
 * @stacked-example(Showcase, input/input-showcase.component)
 */
@Directive({
  selector: 'input[nbInput],textarea[nbInput]',
})
export class NbInputDirective {

  static readonly SIZE_SMALL = 'small';
  static readonly SIZE_MEDIUM = 'medium';
  static readonly SIZE_LARGE = 'large';

  static readonly STATUS_INFO = 'info';
  static readonly STATUS_SUCCESS = 'success';
  static readonly STATUS_WARNING = 'warning';
  static readonly STATUS_DANGER = 'danger';

  static readonly SHAPE_RECTANGLE = 'rectangle';
  static readonly SHAPE_SEMI_ROUND = 'semi-round';
  static readonly SHAPE_ROUND = 'round';

  size: string = NbInputDirective.SIZE_MEDIUM;

  @Input('nbInputSize')
  set setSize(value: string) {
    this.size = value;
  }

  @Input('nbInputStatus')
  status: string;

  @Input('nbInputShape')
  shape: string = NbInputDirective.SHAPE_RECTANGLE;

  @Input('disabled')
  set setDisabled(value: boolean) {
    this.disabled = convertToBoolProperty(value)
      ? 'disabled'
      : null;
  }

  @HostBinding('attr.disabled')
  disabled: 'disabled' | null;

  @HostBinding('attr.tabindex')
  get tabbable() {
    return this.disabled ? -1 : 0;
  }

  @HostBinding('class.input-sm')
  get small() {
    return this.size === NbInputDirective.SIZE_SMALL;
  }

  @HostBinding('class.input-md')
  get medium() {
    return this.size === NbInputDirective.SIZE_MEDIUM;
  }

  @HostBinding('class.input-lg')
  get large() {
    return this.size === NbInputDirective.SIZE_LARGE;
  }

  @HostBinding('class.input-info')
  get info() {
    return this.status === NbInputDirective.STATUS_INFO;
  }

  @HostBinding('class.input-success')
  get success() {
    return this.status === NbInputDirective.STATUS_SUCCESS;
  }

  @HostBinding('class.input-warning')
  get warning() {
    return this.status === NbInputDirective.STATUS_WARNING;
  }

  @HostBinding('class.input-danger')
  get danger() {
    return this.status === NbInputDirective.STATUS_DANGER;
  }

  @HostBinding('class.input-rectangle')
  get rectangle() {
    return this.shape === NbInputDirective.SHAPE_RECTANGLE;
  }

  @HostBinding('class.input-semi-round')
  get semiRound() {
    return this.shape === NbInputDirective.SHAPE_SEMI_ROUND;
  }

  @HostBinding('class.input-round')
  get round() {
    return this.shape === NbInputDirective.SHAPE_ROUND;
  }
}
