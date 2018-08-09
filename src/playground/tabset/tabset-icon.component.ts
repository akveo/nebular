/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-tabset-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tabset-icon.component.html',
  styles: [`
    :host nb-tab {
      padding: 1.25rem;
    }
  `],
})
export class NbTabsetIconComponent {
}
