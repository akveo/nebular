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
    selector: 'nb-autocomplete-custom-display',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './autocomplete-custom-display.component.html',
    standalone: false
})
export class AutocompleteCustomDisplayComponent implements OnInit {

  options: string[];
  filteredOptions$: Observable<string[]>;
  inputFormControl: FormControl;

  ngOnInit() {

    this.options = ['Option 1', 'Option 2', 'Option 3'];
    this.filteredOptions$ = of(this.options);

    this.inputFormControl = new FormControl();

    this.filteredOptions$ = this.inputFormControl.valueChanges
      .pipe(
        startWith(''),
        map(filterString => this.filter(filterString)),
      );

  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  viewHandle(value: string) {
    return value.toUpperCase();
  }
}

