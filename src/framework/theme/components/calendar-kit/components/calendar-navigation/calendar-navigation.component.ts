/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'nb-calendar-navigation',
  styleUrls: ['./calendar-navigation.component.scss'],
  templateUrl: './calendar-navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarNavigationComponent<D> {
  @Input() date: D;
  @Output() changeMode = new EventEmitter<void>(true);
}
