/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

import 'style-loader!./app.themes.scss';

@Component({
  selector: 'nb-app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <div class="framework-options-bar" dir="ltr">
      <nb-layout-direction-toggle></nb-layout-direction-toggle>
      <nb-layout-theme-toggle></nb-layout-theme-toggle>
    </div>
    <router-outlet></router-outlet>
  `,
})
export class NbAppComponent {}
