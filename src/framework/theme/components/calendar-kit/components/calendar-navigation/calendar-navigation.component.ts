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

    :host button {
      height: 3.125rem;
    }
  `],
  template: `
    <button nbButton (click)="changeMode.emit()">
      {{ date | date: 'MMM yyyy' }}
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarNavigationComponent<D> {
  @Input() date: D;
  @Output() changeMode = new EventEmitter<void>(true);
}
