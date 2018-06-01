/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
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
  @Input() collapsed: boolean = true;

  @Output() opened = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<boolean>();

  readonly inputChanges = new Subject<SimpleChanges>();

  toggle() {
    this.collapsed = !this.collapsed;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.inputChanges.next(changes);
  }

  ngOnDestroy() {
    this.inputChanges.complete();
  }
}
