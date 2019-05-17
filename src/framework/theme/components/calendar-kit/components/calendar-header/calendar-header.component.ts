/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NbLayoutDirectionService } from '../../../../services/direction.service';
import { NbDateService } from '../../services/date.service';


@Component({
  selector: 'nb-calendar-header',
  template: `
    <div class="header">
      <span class="title" (click)="navigateToday.emit()">
        {{ date | date: 'mediumDate' }}
        <i [ngClass]="{ 'nb-arrow-dropright': isLtr, 'nb-arrow-dropleft': isRtl }"></i>
      </span>
      <span class="sub-title">Today</span>
    </div>
  `,
})
export class NbCalendarHeaderComponent<D> {
  @Input() date: D;
  @Output() navigateToday: EventEmitter<void> = new EventEmitter();

  constructor(protected directionService: NbLayoutDirectionService, protected dateService: NbDateService<D>) {
    this.date = this.dateService.today();
  }

  get isRtl(): boolean {
    return this.directionService.isRtl();
  }

  get isLtr(): boolean {
    return this.directionService.isLtr();
  }
}
