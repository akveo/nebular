/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'npg-select-search-showcase',
  templateUrl: './select-search-showcase.component.html',
})
export class SelectSearchShowcaseComponent {
  selectedItem = '2';
  filterValue = '';

  isEqual(a?, b?, c?): boolean {
    if (!a) {
      return true;
    }

    a = a?.toString().toLowerCase() ?? '';
    a = new RegExp(
      a
        .split('')
        .map((letter) => letter + '.*')
        .join(''),
    );
    b = b?.toString().toLowerCase() ?? '';
    c = c?.toString().toLowerCase() ?? '';

    if (b && a.test(b)) {
      return true;
    }

    if (c && a.test(c)) {
      return true;
    }

    return false;
  }
}
