/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-popover-modes',
  templateUrl: './popover-modes.component.html',
  styles: [`
    :host {
      display: block;
      padding-bottom: 5rem;
    }

    button + button {
      margin-left: 1rem;
    }
  `],
})
export class PopoverModesComponent {
}
