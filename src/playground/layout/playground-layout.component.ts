/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import 'style-loader!../styles/styles.scss';


@Component({
  selector: 'nb-playground-layout',
  template: `
    <nb-layout>
      <nb-layout-column>
        <router-outlet></router-outlet>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class PlaygroundLayoutComponent implements OnInit {
  constructor(private themeService: NbThemeService) {
  }

  ngOnInit() {
    this.themeService.changeTheme('default');
  }
}
