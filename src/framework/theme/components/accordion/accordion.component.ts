/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { convertToBoolProperty } from '../helpers';

/**
 * An accordion allows to toggle the display of sections of content
 *
 * Basic example
 * @stacked-example(Showcase, accordion/accordion-showcase.component)
 *
 * ```ts
 * <nb-accordion>
 *  <nb-accordion-item>
 *   <nb-accordion-item-header>Product Details</nb-accordion-item-header>
 *   <nb-accordion-item-body>
 *     Item Content
 *   </nb-accordion-item-body>
 *  </nb-accordion-item>
 * </nb-accordion>
 * ```
 * ### Installation
 *
 * Import `NbAccordionModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *   	// ...
 *     NbAccordionModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * With `multi` mode acordion can have multiple items expanded:
 * @stacked-example(Showcase, accordion/accordion-multi.component)
 *
 * `NbAccordionItemComponent` has several method, for example it is possible to trigger item click/toggle:
 * @stacked-example(Showcase, accordion/accordion-toggle.component)
 *
 * @styles
 *
 * accordion-padding:
 * accordion-separator:
 * accordion-header-font-family:
 * accordion-header-font-size:
 * accordion-header-font-weight:
 * accordion-header-fg-heading:
 * accordion-header-disabled-fg:
 * accordion-header-border-width:
 * accordion-header-border-type:
 * accordion-header-border-color:
 * accordion-item-bg:
 * accordion-item-font-size:
 * accordion-item-font-weight:
 * accordion-item-font-family:
 * accordion-item-fg-text:
 * accordion-item-shadow:
 */
@Component({
  selector: 'nb-accordion',
  template: `
    <ng-content select="nb-accordion-item"></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionComponent {

  openCloseItems = new Subject<boolean>();

  /**
   *  Allow multiple items to be expanded at the same time.
   * @type {boolean}
   */
  @Input('multi')
  get multi(): boolean {
    return this.multiValue;
  }
  set multi(val: boolean) {
    this.multiValue = convertToBoolProperty(val);
  }

  private multiValue = false;

  /**
   * Opens all enabled accordion items.
   */
  openAll() {
    if (this.multi) {
      this.openCloseItems.next(false);
    }
  }

  /**
   * Closes all enabled accordion items.
   */
  closeAll() {
    this.openCloseItems.next(true);
  }
}
