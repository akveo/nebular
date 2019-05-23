/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeWhile, skip, distinctUntilChanged, debounceTime } from 'rxjs/operators';


@Component({
  selector: 'ngd-theme-block',
  styleUrls: ['./theme-block.component.scss'],
  templateUrl: './theme-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdThemeComponent implements OnInit, OnDestroy {
  searchControl = new FormControl();

  private alive: boolean = true;

  properties = [];
  themeName = '';
  parentThemeName = '';


  @Input('block')
  set _block(block: any) {
    this.themeName = block.source.name;
    this.parentThemeName = block.source.parent;

    this.properties = Object.entries(block.source.data).map(([key, data]: [string, any]) => {
      const propertyValue = data.value;
      return {
        name: key,
        value: Array.isArray(propertyValue) ? propertyValue.join(' ') : propertyValue,
        parents: data.parents,
      };
    });
  }

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(skip(1), distinctUntilChanged(), debounceTime(300), takeWhile(() => this.alive))
      .subscribe((value: string) => {
        console.log(value);
        this.properties = this.properties
          .filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()));
      });
  }

  trackByFn(index, item) {
    return item.name;
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
