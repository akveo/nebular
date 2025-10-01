/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ComponentRef,
  Directive,
  ElementRef,
  Input,
  Renderer2,
  ViewContainerRef,
  HostBinding,
} from '@angular/core';

import { NbComponentSize } from '../component-size';
import { NbComponentOrCustomStatus } from '../component-status';
import { NbSpinnerComponent } from './spinner.component';

/**
 * Styled spinner directive
 *
 * @stacked-example(Spinner Showcase, spinner/spinner-card.component)
 *
 *
 * ```ts
 * <nb-card [nbSpinner]="loading" nbSpinnerStatus="danger">
 *   <nb-card-body>Card Content</nb-card-body>
 * </nb-card>
 * ```
 *
 * ### Installation
 *
 * Import `NbSpinnerModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbSpinnerModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Could be colored using `status` property
 *
 * @stacked-example(Spinner Colors, spinner/spinner-colors.component)
 *
 * Available in different sizes with `size` property:
 *
 * @stacked-example(Spinner Sizes, spinner/spinner-sizes.component)
 *
 * It is also possible to place it into the button:
 * @stacked-example(Buttons with spinner, spinner/spinner-button.component)
 *
 * Or tabs:
 * @stacked-example(Spinner in tabs, spinner/spinner-tabs.component)
 */
@Directive({
    selector: '[nbSpinner]',
    standalone: false
})
export class NbSpinnerDirective {

  spinner: ComponentRef<NbSpinnerComponent>;

  /**
   * Spinner message shown next to the icon
   * @type {string}
   */
  @Input('nbSpinnerMessage') spinnerMessage: string;

  /**
   * Spinner status color
   * `basic`, `primary`, `info`, `success`, `warning`, `danger`, `control`.
   */
  @Input('nbSpinnerStatus') spinnerStatus: NbComponentOrCustomStatus = 'basic';

  /**
   * Spinner size. Possible values: `tiny`, `small`, `medium` (default), `large`, `giant`
   */
  @Input('nbSpinnerSize') spinnerSize: NbComponentSize = 'medium';

  /**
   * Directive value - show or hide spinner
   * @param {boolean} val
   */
  @Input('nbSpinner')
  set nbSpinner(val: boolean) {
    if (val) {
      this.show();
    } else {
      this.hide();
    }
  }

  @HostBinding('class.nb-spinner-container') isSpinnerExist = false;

  constructor(private directiveView: ViewContainerRef,
              private renderer: Renderer2,
              private directiveElement: ElementRef) {
  }

  hide() {
    if (this.isSpinnerExist) {
      this.directiveView.remove();
      this.isSpinnerExist = false;
    }
  }

  show() {
    if (!this.isSpinnerExist) {
      this.spinner = this.directiveView.createComponent(NbSpinnerComponent);
      this.setInstanceInputs(this.spinner.instance);
      this.spinner.changeDetectorRef.detectChanges();
      this.renderer.appendChild(this.directiveElement.nativeElement, this.spinner.location.nativeElement);
      this.isSpinnerExist = true;
    }
  }

  setInstanceInputs(instance: NbSpinnerComponent) {
    instance.message = this.spinnerMessage
    typeof this.spinnerStatus !== 'undefined' && (instance.status = this.spinnerStatus);
    typeof this.spinnerSize !== 'undefined' && (instance.size = this.spinnerSize);
  }
}
