/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'npg-layout-header-test',
  template: `
    <nb-layout>
      <nb-layout-header fixed>
        <a class="navbar-brand" href="#">ngx-admin</a>
      </nb-layout-header>
    </nb-layout>
  `,
})
export class LayoutHeaderTestComponent {}
