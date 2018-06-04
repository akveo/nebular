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
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'nb-accordion',
  styleUrls: ['./accordion.component.scss'],
  template: `
    <ng-content select="nb-accordion-header"></ng-content>
    <ng-content select="nb-accordion-body"></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAccordionComponent implements OnChanges, OnDestroy {
  @Input('collapsed')
  get collapsed() {
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

  @Input() disabled: boolean = false;
  @Input() hideToggle: boolean = false;

  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();
  @Output() destroyed = new EventEmitter<void>();

  @Output() collapsedChange = new EventEmitter<boolean>();

  @HostBinding('class.accordion-collapsed')
  get isCollapsed(): boolean {
    return !!this.collapsed;
  }

  @HostBinding('class.accordion-expanded')
  get isExpanded(): boolean {
    return !this.collapsed;
  }

  readonly inputChanges = new Subject<SimpleChanges>();

  private _collapsed: boolean = true;

  constructor(private cdr: ChangeDetectorRef) {}

  toggle() {
    if (!this.disabled) {
      this.collapsed = !this.collapsed;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.inputChanges.next(changes);
  }

  ngOnDestroy() {
    this.inputChanges.complete();
    this.opened.complete();
    this.closed.complete();
    this.destroyed.emit();
    this.destroyed.complete();
  }
}
