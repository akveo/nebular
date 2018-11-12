/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-select-showcase',
  templateUrl: './select-showcase.component.html',
  styles: [`
    :host {
      display: block;
      width: 15rem;
      height: 15rem;
    }
  `],
})

export class NbSelectShowcaseComponent {
  selectedItem = '2';
}
