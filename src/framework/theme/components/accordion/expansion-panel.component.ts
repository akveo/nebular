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
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';

import { NbAccordionComponent } from './accordion.component';

@Component({
  selector: 'nb-expansion-panel',
  styleUrls: ['./expansion-panel.component.scss'],
  template: `
    <ng-content select="nb-expansion-panel-header"></ng-content>
    <ng-content select="nb-expansion-panel-body"></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbExpansionPanelComponent implements OnChanges, OnDestroy {
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

  @HostBinding('class.panel-collapsed')
  get isCollapsed(): boolean {
    return !!this.collapsed;
  }

  @HostBinding('class.panel-expanded')
  get isExpanded(): boolean {
    return !this.collapsed;
  }

  get multi(): boolean {
    return this.accordion.multi;
  }

  readonly panelInputChanges = new Subject<SimpleChanges>();

  private _collapsed: boolean = true;

  constructor(@Host() private accordion: NbAccordionComponent, private cdr: ChangeDetectorRef) {}

  toggle() {
    if (!this.disabled) {
      this.collapsed = !this.collapsed;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.panelInputChanges.next(changes);
  }

  ngOnDestroy() {
    this.panelInputChanges.complete();
    this.opened.complete();
    this.closed.complete();
    this.destroyed.emit();
    this.destroyed.complete();
  }
}
