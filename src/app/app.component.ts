/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

import 'style-loader!./app.themes.scss';

@Component({
  selector: 'nb-app-root',
  template: `
    <nb-layout-direction-toggle></nb-layout-direction-toggle>
    <router-outlet></router-outlet>
  `,
})
export class NbAppComponent {
}
