/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';


@Component({
  selector: 'nb-popover-placements',
  templateUrl: './popover-placements.component.html',
  styles: [`
    :host {
      margin: 4rem 0;
      display: block;
    }

    nb-layout-column {
      height: 50vw;
    }

    button {
      margin: 1rem;
    }
  `],
})
export class NbPopoverPlacementsComponent {
}
