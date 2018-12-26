/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'nb-breakpoint-test',
  template: `
    <nb-layout>
      <nb-layout-header fixed>
        <a href="#" class="navbar-brand">Akveo</a>
      </nb-layout-header>

      <nb-layout-column>
        <nb-card>
          <nb-card-header>Breakpoint</nb-card-header>
          <nb-card-body>
            <p>Resize the window to the next/prev breakpoint to see the change</p>
            <div> Prev breakpoint : <strong>{{ change[0]?.name }} ({{ change[0]?.width }})</strong></div>
            <div> Current breakpoint : <strong>{{ change[1]?.name }} ({{ change[1]?.width }})</strong></div>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>


      <nb-layout-footer fixed>
        &copy; Akveo 2017
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class ThemeBreakpointTestComponent {

  change: any = [];

  constructor(private themeService: NbThemeService) {
    this.themeService.onMediaQueryChange()
      .subscribe((change: any) => {
        this.change = change;
      });
  }
}
