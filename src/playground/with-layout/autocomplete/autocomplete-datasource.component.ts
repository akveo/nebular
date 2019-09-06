/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'nb-autocomplete-datasource',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './autocomplete-datasource.component.html',
})
export class AutocompleteDataSourceComponent implements OnInit {

  @ViewChild('autoInput', { static: false }) input;

  options: string[];

  ngOnInit() {
    this.options = ['Akveo', 'Nebular', 'Eva'];
  }

}
