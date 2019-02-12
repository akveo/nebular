/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, HostListener, Input } from '@angular/core';
import { NbTreeGridCellDirective } from './tree-grid-cell.component';
import { NbTreeGridPresentationNode } from './data-source/tree-grid.model'

/**
 * NbTreeGridRowToggleComponent
 */
@Component({
  selector: 'nb-tree-grid-row-toggle',
  template: `
    <button *ngIf="row.hasChildren()"
            [attr.aria-label]="row.expanded ? 'collapse' : 'expand'">
      <i [class.nb-arrow-right]="!row.expanded" [class.nb-arrow-down]="row.expanded" aria-hidden="true"></i>
    </button>
  `,
  styles: [`
    button {
      background: transparent;
      border: none;
      padding: 0;
    }
  `],
})
export class NbTreeGridRowToggleComponent {
  // TODO: remove
  /**
   * row
   */
  @Input() row: NbTreeGridPresentationNode<any>;

  @HostListener('click', ['$event'])
  toggleRow($event: Event) {
    this.cell.toggleRow();
    $event.stopPropagation();
  }

  constructor(private cell: NbTreeGridCellDirective) {}
}
