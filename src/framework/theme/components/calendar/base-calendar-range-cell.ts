/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NbCalendarRange } from './calendar-range.component';

export abstract class NbBaseCalendarRangeCell<D> {
  abstract selectedValue: NbCalendarRange<D>;

  get hasRange(): boolean {
    return !!(this.selectedValue && this.selectedValue.start && this.selectedValue.end);
  }
}
