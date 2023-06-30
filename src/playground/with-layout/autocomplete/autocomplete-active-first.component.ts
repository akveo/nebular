/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'npg-autocomplete-active-first',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './autocomplete-active-first.component.html',
})
export class AutocompleteActiveFirstComponent implements OnInit {
  options: string[];
  filteredOptions$: Observable<string[]>;
  inputFormControl: FormControl;

  ngOnInit() {
    this.options = ['Option 1', 'Option 2', 'Option 3'];
    this.filteredOptions$ = of(this.options);

    this.inputFormControl = new FormControl();

    this.filteredOptions$ = this.inputFormControl.valueChanges.pipe(
      startWith(''),
      map((filterString) => this.filter(filterString)),
    );
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((optionValue) => optionValue.toLowerCase().includes(filterValue));
  }
}
