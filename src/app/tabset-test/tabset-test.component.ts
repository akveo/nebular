/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nb-tabset-test',
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-tabset>
          <nb-tab tabTitle="Tab #1">
            <span>Content #1</span>
          </nb-tab>
          <nb-tab tabTitle="Tab #2">
            <span>Content #2</span>
          </nb-tab>
          <nb-tab tabTitle="Tab #3">
            <span>Content #3</span>
          </nb-tab>
        </nb-tabset>
        <nb-tabset>
          <nb-tab tabTitle="Tab #1">
            <span>Content #1</span>
          </nb-tab>
          <nb-tab tabTitle="Tab #2" [active]="true">
            <span>Content #2</span>
          </nb-tab>
          <nb-tab tabTitle="Tab #3">
            <span>Content #3</span>
          </nb-tab>
        </nb-tabset>
        <nb-tabset>
          <nb-tab tabTitle="Tab #1">
            <span>Content #1</span>
          </nb-tab>
          <nb-tab tabTitle="Tab #2">
            <span>Content #2</span>
          </nb-tab>
          <nb-tab tabTitle="Tab #3" [active]="true">
            <span>Content #3</span>
          </nb-tab>
        </nb-tabset>
        <nb-tabset (changeTab)="changeTab($event)" routeParam="tab">
          <nb-tab tabTitle="Tab #1" route="tab1">
            <span>Content #1</span>
          </nb-tab>
          <nb-tab tabTitle="Tab #2" route="tab2">
            <span>Content #2</span>
          </nb-tab>
          <nb-tab tabTitle="Tab #3" route="tab3">
            <span>Content #3</span>
          </nb-tab>
        </nb-tabset>
        <nb-tabset fullWidth>
          <nb-tab tabTitle="Tab #1">
            <span>Content #1</span>
          </nb-tab>
          <nb-tab tabTitle="Tab #2">
            <span>Content #2</span>
          </nb-tab>
          <nb-tab tabTitle="Tab #3">
            <span>Content #3</span>
          </nb-tab>
        </nb-tabset>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbTabsetTestComponent {
  constructor(private router: Router) {
  }

  changeTab($event: any) {
    this.router.navigate(['tabset', $event.route]);
  }
}
