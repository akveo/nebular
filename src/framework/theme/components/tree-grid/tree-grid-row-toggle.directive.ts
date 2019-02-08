/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Directive, HostListener } from '@angular/core';
import { NbTreeGridCellDirective } from './tree-grid-cell.component';

/**
 * NbTreeGridRowToggleDirective
 */
@Directive({
  selector: '[nbTreeGridRowToggle]',
})
export class NbTreeGridRowToggleDirective {
  @HostListener('click', ['$event'])
  toggleRow($event: Event) {
    this.cell.toggleRow();
    $event.stopPropagation();
  }

  constructor(private cell: NbTreeGridCellDirective) {}
}
