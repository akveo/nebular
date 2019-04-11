/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, HostListener, Input } from '@angular/core';
import { NbTreeGridCellDirective } from './tree-grid-cell.component';

/**
 * NbTreeGridRowToggleComponent
 */
@Component({
  selector: 'nb-tree-grid-row-toggle',
  templateUrl: './tree-grid-row-toggle.component.html',
  styleUrls: ['./tree-grid-row-toggle.component.scss'],
})
export class NbTreeGridRowToggleComponent {
  private expandedValue: boolean;
  @Input()
  set expanded(value: boolean) {
    this.expandedValue = value;
  }
  get expanded(): boolean {
    return this.expandedValue;
  }

  @HostListener('click', ['$event'])
  toggleRow($event: Event) {
    this.cell.toggleRow();
    $event.stopPropagation();
  }

  constructor(private cell: NbTreeGridCellDirective) {}
}
