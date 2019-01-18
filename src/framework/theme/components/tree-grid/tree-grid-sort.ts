/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Directive, HostListener, Inject, Input } from '@angular/core';

import { NbSortable, NbSortRequest } from './tree-grid-data-source';
import { NB_SORT_HEADER_COLUMN_DEF } from './tree-grid-cell';

/** Column definition associated with a `NbSortHeaderDirective`. */
interface NbSortHeaderColumnDef {
  name: string;
}

@Directive({ selector: '[nbSort]' })
export class NbSortDirective {
  @Input('nbSort') sortable: NbSortable;

  sort(sortRequest: NbSortRequest) {
    this.sortable.sort(sortRequest);
  }
}

@Directive({ selector: '[nbSortHeader]' })
export class NbSortHeaderDirective {

  @Input('nbSortHeader') direction: 'asc' | 'desc' = 'asc';

  constructor(private sort: NbSortDirective,
              @Inject(NB_SORT_HEADER_COLUMN_DEF) private columnDef: NbSortHeaderColumnDef) {
  }

  @HostListener('click')
  sortData() {
    this.sort.sort({
      column: this.columnDef.name,
      direction: this.direction,
    });
  }
}

