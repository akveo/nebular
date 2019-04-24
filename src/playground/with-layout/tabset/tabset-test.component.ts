/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nb-tabset-test',
  styles: [
    `
      nb-tabset {
        margin-bottom: 40px;
      }
    `,
  ],
  template: `
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
    <nb-tabset fullWidth>
      <nb-tab tabTitle="Tab #1" badgeText="29">
        <span>Content #1</span>
      </nb-tab>
      <nb-tab tabTitle="Tab #2"
        badgeText="29"
        badgeStatus="info"
        badgePosition="top left">
        <span>Content #2</span>
      </nb-tab>
      <nb-tab tabTitle="Tab #3"
        badgeText="29"
        badgeStatus="success"
        badgePosition="bottom right">
        <span>Content #3</span>
      </nb-tab>
      <nb-tab tabTitle="Tab #4"
        badgeText="29"
        badgeStatus="danger"
        badgePosition="bottom left">
        <span>Content #4</span>
      </nb-tab>
      <nb-tab tabTitle="Tab #5"
        badgeText="29"
        badgeStatus="warning"
        badgePosition="bottom right">
        <span>Content #5</span>
      </nb-tab>
    </nb-tabset>
    <nb-tabset>
      <nb-tab tabTitle="Tab #1" badgeText="29">
        <span>Content #1</span>
      </nb-tab>
      <nb-tab tabTitle="Tab #2"
        badgeText="29"
        badgeStatus="info"
        badgePosition="bottom right">
        <span>Content #2</span>
      </nb-tab>
      <nb-tab tabTitle="Tab #3"
        badgeText="29"
        badgeStatus="success"
        badgePosition="top left">
        <span>Content #3</span>
      </nb-tab>
      <nb-tab tabTitle="Tab #4"
        badgeText="29"
        badgeStatus="danger"
        badgePosition="bottom left">
        <span>Content #4</span>
      </nb-tab>
      <nb-tab tabTitle="Tab #5"
        badgeText="29"
        badgeStatus="warning"
        badgePosition="bottom right">
        <span>Content #5</span>
      </nb-tab>
    </nb-tabset>
    <nb-tabset>
      <nb-tab tabTitle="Tab #1">
        <span>Content #1</span>
      </nb-tab>
      <nb-tab tabTitle="Tab #2">
        <span>Content #2</span>
      </nb-tab>
      <nb-tab tabTitle="Tab #3" lazyLoad>
        <span>Content #3</span>
      </nb-tab>
      <nb-tab tabTitle="Tab #4" lazyLoad>
        <span>Content #4</span>
      </nb-tab>
    </nb-tabset>
  `,
})
export class TabsetTestComponent {

  constructor(private router: Router) {
  }

  changeTab($event: any) {
    this.router.navigate(['tabset', 'tabset-test.component', $event.route]);
  }
}
