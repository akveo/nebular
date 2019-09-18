/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, ViewChild, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'nb-autocomplete-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './autocomplete-showcase.component.html',
})
export class AutocompleteShowcaseComponent implements OnInit {

  options: string[];
  filteredOptions$: Observable<string[]>;

  @ViewChild('autoInput', { static: false }) input;

  ngOnInit() {
    this.options = ['Akveo', 'Nebular', 'Eva'];
    this.filteredOptions$ = of(this.options);
  }

  private filter(name: string): string[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getFilteredOptions (value: string): Observable<string[]> {
    return of(value).pipe(
      map(item => this.filter(item)),
    );
  }

  onChange() {
    this.filteredOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
  }

  onSelectionChange($event) {
    this.filteredOptions$ = this.getFilteredOptions($event);
  }

}

