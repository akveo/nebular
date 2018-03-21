/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'nb-playground',
  template: '<router-outlet></router-outlet>',
})

export class NbPlaygroundComponent implements OnInit {
  constructor(private themeService: NbThemeService) {
  }

  ngOnInit() {
    this.themeService.changeTheme('default');
  }
}
