/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, ViewChild, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';

@Component({
    selector: 'nb-autocomplete-showcase',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './autocomplete-showcase.component.html',
    standalone: false
})
export class AutocompleteShowcaseComponent implements OnInit {

  options: string[];
  filteredOptions$: Observable<string[]>;

  @ViewChild('autoInput') input;

  ngOnInit() {
    this.options = ['Option 1', 'Option 2', 'Option 3'];
    this.filteredOptions$ = of(this.options);
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }

  onChange() {
    this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
  }

  onSelectionChange($event) {
    this.filteredOptions$ = this.getFilteredOptions($event);
  }

}

