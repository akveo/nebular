/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Create a list of items that can be shown individually by clicking an item's header.
 *
 * Basic example
 * @stacked-example(Showcase, accordion/accordion-showcase.component)
 *
 * ```ts
 * <nb-accordion>
 *  <nb-accordion-item>
 *    <nb-accordion-item-header>
 *      <nb-accordion-item-title>Accordion</nb-accordion-item-title>
 *      <nb-accordion-item-description>Description</nb-accordion-item-description>
 *    </nb-accordion-item-header>
 *    <nb-accordion-item-body>
 *      <span>An example of usage of component</span>
 *    </nb-accordion-item-body>
 *  </nb-accordion-item>
 * </nb-accordion>
 * ```
 *
 * @styles
 *
 * accordion-item-bg
 * accordion-item-horizontal-offset-color
 * accordion-item-vertical-offset-color
 * accordion-item-blur-color
 * accordion-item-header-hover-bg
 * accordion-item-description-color-fg
 */
@Component({
  selector: 'nb-accordion',
  template: `
    <ng-content select="nb-accordion-item"></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionComponent {
  /**
   * Whether the accordion should allow multiple expanded accordion items simultaneously.
   *
   * @type {boolean}
   */
  @Input() multi: boolean = false;

  /**
   * Stream that emits a close/open event for all accordion items.
   */
  readonly openCloseAllAccordionItems = new Subject<boolean>();

  /**
   * Stream that emits a close event for all expanded accordion items.
   */
  readonly closeAllAccordionItemsInMultiMode = new Subject<string>();

  /**
   * Opens all enabled accordion items in an accordion where multi is enabled.
   */
  openAll() {
    if (this.multi) {
      this.openCloseAllAccordionItems.next(false);
    }
  }

  /**
   * Closes all enabled accordion items in an accordion where multi is enabled.
   */
  closeAll() {
    if (this.multi) {
      this.openCloseAllAccordionItems.next(true);
    }
  }
}
