/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-layout-test',
  styles: [
    `
      :host ::ng-deep nb-layout-column {
        background-color: #fb75ff;
      }
      :host ::ng-deep nb-layout-column.right {
        background-color: #aeff34;
      }
      :host ::ng-deep nb-layout-column.left {
        background-color: #76ecff;
      }

    `,
  ],
  template: `
    <nb-layout id="layout-fluid">
      <nb-layout-header fixed>
        <a href="#" class="navbar-brand">Akveo</a>
      </nb-layout-header>

      <nb-layout-column left>
        Left
      </nb-layout-column>
      <nb-layout-column>
        Center
      </nb-layout-column>
      <nb-layout-column>
        Right<br>
        <div style="overflow: hidden">
          <div style="width: 20000px; background: red;">super long </div>
        </div>
      </nb-layout-column>

      <nb-layout-footer>
        &copy; Akveo 2017
      </nb-layout-footer>
    </nb-layout>

    <nb-layout center id="layout-center">
      <nb-layout-header fixed>
        <a href="#" class="navbar-brand">Akveo</a>
      </nb-layout-header>

      <nb-layout-column left>
        Left
      </nb-layout-column>
      <nb-layout-column>
        Center
      </nb-layout-column>
      <nb-layout-column>
        Right<br>
        <div style="overflow: hidden">
          <div style="width: 20000px; background: red;">super long </div>
        </div>
      </nb-layout-column>

      <nb-layout-footer fixed>
        &copy; Akveo 2017
      </nb-layout-footer>
    </nb-layout>
`,
})
export class LayoutTestComponent {
}
