/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'nb-calendar-navigation',
  styles: [`
    :host {
      display: flex;
      justify-content: center;
    }
  `],
  template: `
    <button class="btn btn-success" (click)="changeMode.emit()">
      {{ date | nbCalendarDate }}
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarNavigationComponent {
  @Input() date: Date;
  @Output() changeMode = new EventEmitter<void>();
}
