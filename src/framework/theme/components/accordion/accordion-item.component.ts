/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  HostBinding,
  Host,
  OnInit,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NbAccordionComponent } from './accordion.component';
import { convertToBoolProperty, NbBooleanInput } from '../helpers';

/**
 * Component intended to be used within `<nb-accordion>` component
 */
@Component({
  selector: 'nb-accordion-item',
  styleUrls: ['./accordion-item.component.scss'],
  template: `
    <ng-content select="nb-accordion-item-header"></ng-content>
    <ng-content select="nb-accordion-item-body"></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class NbAccordionItemComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * Item is collapse (`true` by default)
   * @type {boolean}
   */
  @Input('collapsed')
  @HostBinding('class.collapsed')
  get collapsed(): boolean {
    return this.collapsedValue;
  }
  set collapsed(val: boolean) {
    this.collapsedValue = convertToBoolProperty(val);
    this.collapsedChange.emit(this.collapsedValue);
    this.invalidate();
  }
  static ngAcceptInputType_collapsed: NbBooleanInput;

  /**
   * Item is expanded (`false` by default)
   * @type {boolean}
   */
  @Input('expanded')
  @HostBinding('class.expanded')
  get expanded(): boolean {
    return !this.collapsed;
  }
  set expanded(val: boolean) {
    this.collapsedValue = !convertToBoolProperty(val);
  }
  static ngAcceptInputType_expanded: NbBooleanInput;

  /**
   * Item is disabled and cannot be opened.
   * @type {boolean}
   */
  @Input('disabled')
  @HostBinding('class.disabled')
  get disabled(): boolean {
    return this.disabledValue;
  }
  set disabled(val: boolean) {
    this.disabledValue = convertToBoolProperty(val);
    this.invalidate();
  }
  static ngAcceptInputType_disabled: NbBooleanInput;

  /**
   * Emits whenever the expanded state of the accordion changes.
   * Primarily used to facilitate two-way binding.
   */
  @Output() collapsedChange = new EventEmitter<boolean>();

  accordionItemInvalidate = new Subject<boolean>();

  private collapsedValue = true;
  private disabledValue = false;
  private destroy$ = new Subject<void>();

  constructor(@Host() private accordion: NbAccordionComponent, private cd: ChangeDetectorRef) {}

  /**
   * Open/close the item
   */
  toggle() {
    if (!this.disabled) {
      // we need this temporary variable as `openCloseItems.next` will change current value we need to save
      const willSet = !this.collapsed;

      if (!this.accordion.multi) {
        this.accordion.openCloseItems.next(true);
      }
      this.collapsed = willSet;
    }
  }

  /**
   * Open the item.
   */
  open() {
    !this.disabled && (this.collapsed = false);
  }

  /**
   * Collapse the item.
   */
  close() {
    !this.disabled && (this.collapsed = true);
  }

  ngOnInit() {
    this.accordion.openCloseItems.pipe(takeUntil(this.destroy$)).subscribe((collapsed) => {
      !this.disabled && (this.collapsed = collapsed);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.accordionItemInvalidate.next(true);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.accordionItemInvalidate.complete();
  }

  private invalidate() {
    this.accordionItemInvalidate.next(true);
    this.cd.markForCheck();
  }
}
