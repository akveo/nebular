/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

export interface Group {
  name: string;
  children: string[];
}

@Component({
  selector: 'nb-autocomplete-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './autocomplete-group.component.html',
})
export class AutocompleteGroupComponent implements OnInit {

  groups: Group[];
  filteredGroups$: Observable<Group[]>;
  inputFormControl: FormControl;

  ngOnInit() {

    this.groups = [
      {
        name: 'Akveo',
        children: ['Akveo Inc.', 'Akveo Data'],
      },
      {
        name: 'Nebular',
        children: ['Autocomplete', 'Select'],
      }];
    this.filteredGroups$ = of(this.groups);

    this.inputFormControl = new FormControl();

    this.filteredGroups$ = this.inputFormControl.valueChanges
      .pipe(
        startWith(''),
        map(item => this.filter(item)),
      );

  }

  private filterChildren(children: string[], value: string) {
    return children.filter(item => item.toLowerCase().includes(value));
  }

  private filter(value: string): Group[] {
    const filterValue = value.toLowerCase();
    return this.groups
      .map(group => {
        return {
          name: group.name,
          children: this.filterChildren(group.children, filterValue),
        }
      })
      .filter(group => group.children.length);
  }

  trackByFn(index, item) {
    return item.name;
  }

}

