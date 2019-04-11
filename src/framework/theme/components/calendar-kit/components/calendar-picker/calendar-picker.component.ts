/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, Type } from '@angular/core';

import { NbCalendarCell } from '../../model';


@Component({
  selector: 'nb-calendar-picker',
  templateUrl: 'calendar-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarPickerComponent<D, T> {
  @Input() data: D[][];
  @Input() visibleDate: D;
  @Input() selectedValue: T;
  @Input() cellComponent: Type<NbCalendarCell<D, T>>;
  @Input() min: D;
  @Input() max: D;
  @Input() filter: (D) => boolean;
  @Output() select: EventEmitter<D> = new EventEmitter();
}
