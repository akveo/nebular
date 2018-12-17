/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import 'style-loader!../styles/styles.scss';


@Component({
  selector: 'nb-playground-base',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class PlaygroundBaseComponent implements OnInit {
  constructor(private themeService: NbThemeService) {
  }

  ngOnInit() {
    this.themeService.changeTheme('default');
  }
}
