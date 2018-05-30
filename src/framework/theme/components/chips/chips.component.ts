/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, HostBinding } from '@angular/core';

/**
 * Renders provided content inside.
 *
 * @styles
 *
 * chip-bg
 * chip-fg
 * chip-active-bg
 * chip-active-fg
 * chip-disabled-bg
 * chip-disabled-fg
 * chip-disabled-border
 * chip-primary-bg
 * chip-primary-fg
 * chip-info-bg
 * chip-info-fg
 * chip-success-bg
 * chip-success-fg
 * chip-warning-bg
 * chip-warning-fg
 * chip-danger-bg
 * chip-danger-fg
 * chip-icon-bg
 * chip-icon-hover-bg
 */
@Component({
  selector: 'nb-chip',
  template: `
    <ng-content></ng-content>
    <i *ngIf="removable" class="remove-icon nb-close" (click)="remove()"></i>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChipComponent {
  /**
   * Chip status (adds specific styles):
   * 'active', 'disabled', 'primary', 'info', 'success', 'warning', 'danger'
   * @type string
   */
  @Input() status: string;

  /**
   * Makes chip is removable (the remove icon will displayed)
   * @type boolean
   */
  @Input() removable: boolean;

  /**
   * Makes chip is tabbable (change an active chip by click on 'tab' button)
   * @type boolean
   */
  @Input() tabbable: boolean;

  /**
   * Emits when chip is removed
   * @type EventEmitter<any>
   */
  @Output() removed = new EventEmitter();

  static readonly STATUS_ACTIVE = 'active';
  static readonly STATUS_DISABLED = 'disabled';
  static readonly STATUS_PRIMARY = 'primary';
  static readonly STATUS_INFO = 'info';
  static readonly STATUS_SUCCESS = 'success';
  static readonly STATUS_WARNING = 'warning';
  static readonly STATUS_DANGER = 'danger';

  @HostBinding('class.active-chip')
  get active(): boolean {
    return this.status === NbChipComponent.STATUS_ACTIVE;
  }

  @HostBinding('class.disabled-chip')
  get disabled(): boolean {
    return this.status === NbChipComponent.STATUS_DISABLED;
  }

  @HostBinding('class.primary-chip')
  get primary(): boolean {
    return this.status === NbChipComponent.STATUS_PRIMARY;
  }

  @HostBinding('class.info-chip')
  get info(): boolean {
    return this.status === NbChipComponent.STATUS_INFO;
  }

  @HostBinding('class.success-chip')
  get success(): boolean {
    return this.status === NbChipComponent.STATUS_SUCCESS;
  }

  @HostBinding('class.warning-chip')
  get warning(): boolean {
    return this.status === NbChipComponent.STATUS_WARNING;
  }

  @HostBinding('class.danger-chip')
  get danger(): boolean {
    return this.status === NbChipComponent.STATUS_DANGER;
  }

  @HostBinding('class.removable-chip')
  get isRemovable(): boolean {
    return !!this.removable;
  }

  @HostBinding('attr.tabindex')
  get isTabbable(): string {
    return this.tabbable ? '0' : '-1';
  }

  /**
   * Emits the removed chip event
   */
  remove() {
    this.removed.emit();
  }
}

/**
 * Displays a list of values as individual
 * Renders provided content inside.
 *
 * @stacked-example(Showcase, chips/chips-showcase.component)
 *
 * Basic setup:
 * ```html
 * <nb-chip-list>
 *   <nb-chip>chip #1</nb-chip>
 *   <nb-chip status="primary">chip #2</nb-chip>
 *   <nb-chip removable="true" (removed)="remove($event)">chip #3</nb-chip>
 * </nb-chip-list>
 * ```
 *
 * Tabbable Chips example:
 * @stacked-example(Tabbable chips, chips/chips-tabbable.component)
 *
 * Removable chips example:
 * @stacked-example(Removable chips, chips/chips-removable.component)
 *
 * Colored chips example:
 * @stacked-example(Colored chips, chips/chips-colors.component)
 */
@Component({
  selector: 'nb-chip-list',
  styleUrls: ['./chips.component.scss'],
  template: `
    <ng-content select="nb-chip"></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChipListComponent {
  @HostBinding('attr.role')
  get role(): string {
    return 'listbox';
  }
}
