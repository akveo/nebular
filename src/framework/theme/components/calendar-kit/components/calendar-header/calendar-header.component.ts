/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NbLayoutDirectionService } from '../../../../services/direction.service';
import { NbDateService } from '../../services';


@Component({
  selector: 'nb-calendar-header',
  templateUrl: './calendar-header.component.html',
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
