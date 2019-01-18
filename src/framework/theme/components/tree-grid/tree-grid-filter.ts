/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Directive, HostListener, Input } from '@angular/core';

import { NbFilterable } from './data-source/tree-grid-data-source';

@Directive({ selector: '[nbFilter]' })
export class NbFilterDirective {
  @Input('nbFilter') filterable: NbFilterable;

  filter(filterRequest: string) {
    this.filterable.filter(filterRequest);
  }
}

@Directive({
  selector: '[nbFilterInput]',
  providers: [{ provide: NbFilterDirective, useExisting: NbFilterInputDirective }],
})
export class NbFilterInputDirective extends NbFilterDirective {
  @Input('nbFilterInput') filterable: NbFilterable;

  @HostListener('input', ['$event'])
  filter(event) {
    super.filter(event.target.value);
  }
}
