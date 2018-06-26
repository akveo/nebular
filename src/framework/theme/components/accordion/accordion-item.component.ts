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
import { takeWhile } from 'rxjs/operators';

import { NbAccordionComponent } from './accordion.component';

/**
 * Used to generate unique ID for each accordion item.
 */
let nextId = 0;

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
})
export class NbAccordionItemComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * Whether the AccordionItem is collapsed.
   * @type {boolean}
   */
  @Input('collapsed')
  get collapsed(): boolean {
    return this._collapsed;
  }
  set collapsed(value: boolean) {
    this._collapsed = value;
    this.collapsedChange.emit(value);

    if (value) {
      this.closed.emit();
    } else {
      this.opened.emit();
    }

    this.cdr.markForCheck();
  }

  /**
   * Whether the AccordionItem is disabled.
   * @type {boolean}
   */
  @Input() disabled: boolean = false;

  /**
   * Whether the toggle indicator should be hidden.
   * @type {boolean}
   */
  @Input() hideToggle: boolean = false;

  /**
   * Event emitted every time the AccordionItem is opened.
   */
  @Output() opened = new EventEmitter<void>();

  /**
   * Event emitted every time the AccordionItem is closed.
   */
  @Output() closed = new EventEmitter<void>();

  /**
   * Event emitted when the AccordionItem is destroyed.
   */
  @Output() destroyed = new EventEmitter<void>();

  /**
   * Emits whenever the expanded state of the accordion changes.
   * Primarily used to facilitate two-way binding.
   */
  @Output() collapsedChange = new EventEmitter<boolean>();

  @HostBinding('class.accordion-item-collapsed')
  get isCollapsed(): boolean {
    return !!this.collapsed;
  }

  @HostBinding('class.accordion-item-expanded')
  get isExpanded(): boolean {
    return !this.collapsed;
  }

  @HostBinding('attr.id')
  get componentId(): string {
    return this.id;
  }

  /**
   * Stream that emits for changes in `@Input` changes
   */
  readonly accordionItemInputChanges = new Subject<SimpleChanges>();

  /**
   * A readonly id value to use for unique selection coordination.
   */
  private readonly id = `nb-accordion-item-${nextId++}`;
  private _collapsed: boolean = true;
  private alive: boolean = true;

  constructor(@Host() private accordion: NbAccordionComponent, private cdr: ChangeDetectorRef) {}

  /**
   * Toggles the expanded state of the panel.
   */
  toggle() {
    if (!this.disabled) {
      if (!this.accordion.multi) {
        this.accordion.closeAllAccordionItemsInMultiMode.next(this.id);
      }

      this.collapsed = !this.collapsed;
    }
  }

  /**
   * Sets the collapsed state of the accordion item to false.
   */
  open() {
    if (!this.disabled) {
      this.collapsed = false;
    }
  }

  /**
   * Sets the collapsed state of the accordion item to true.
   */
  close() {
    if (!this.disabled) {
      this.collapsed = true;
    }
  }

  ngOnInit() {
    this.accordion.openCloseAllAccordionItems.pipe(takeWhile(() => this.alive)).subscribe(collapsed => {
      if (!this.disabled) {
        this.collapsed = collapsed;
      }
    });

    this.accordion.closeAllAccordionItemsInMultiMode.pipe(takeWhile(() => this.alive)).subscribe(accordionId => {
      if (accordionId !== this.id) {
        this.collapsed = true;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.accordionItemInputChanges.next(changes);
  }

  ngOnDestroy() {
    this.alive = false;
    this.accordionItemInputChanges.complete();
    this.opened.complete();
    this.closed.complete();
    this.destroyed.emit();
    this.destroyed.complete();
  }
}
