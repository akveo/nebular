/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { NbComponentSize } from '@nebular/theme';

@Component({
  selector: 'nb-autocomplete-sizes',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './autocomplete-sizes.component.html',
})
export class AutocompleteSizesComponent implements OnInit {

  options: string[];
  sizes: NbComponentSize[];
  filteredOptions$: Observable<string[]>;
  inputFormControl: FormControl;

  ngOnInit() {

    this.sizes = ['tiny', 'small', 'medium', 'large', 'giant'];
    this.options = ['Option 1', 'Option 2', 'Option 3'];
    this.filteredOptions$ = of(this.options);

    this.inputFormControl = new FormControl();

    this.filteredOptions$ = this.inputFormControl.valueChanges
      .pipe(
        startWith(''),
        map(item => this.filter(item)),
      );

  }

  private filter(name: string): string[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}

