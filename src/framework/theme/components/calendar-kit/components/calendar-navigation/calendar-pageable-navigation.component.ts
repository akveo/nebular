/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { NbLayoutDirectionService } from '../../../../services/direction.service';


@Component({
  selector: 'nb-calendar-pageable-navigation',
  styleUrls: ['./calendar-pageable-navigation.component.scss'],
  templateUrl: './calendar-pageable-navigation.component.html',
})
export class NbCalendarPageableNavigationComponent<D> {
  @Input() date: D;
  @Output() changeMode = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();
  @Output() prev = new EventEmitter<void>();

  constructor(private directionService: NbLayoutDirectionService) {
  }

  get isRtl(): boolean {
    return this.directionService.isRtl();
  }

  get isLtr(): boolean {
    return this.directionService.isLtr();
  }
}
