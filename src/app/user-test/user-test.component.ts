/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-user-test',
  styles: [
    `
      .test-row {
        margin: 20px;
      }
    `,
  ],
  template: `
    <nb-layout id="layout-fluid">
      <nb-layout-header fixed>
        <nb-user showInitials size="medium" name="Dmitry Nehaychik" title="Worker"
                  [menu]="contextMenu" (menuClick)="onMenuItemClick($event)"></nb-user>
      </nb-layout-header>


      <nb-layout-column>
        <div class="test-row">
          <nb-user inverse></nb-user>
        </div>
        <div class="test-row">
          <nb-user inverse showInitials></nb-user>
        </div>
        <div class="test-row">
          <nb-user inverse size="large" name="Dmitry Nehaychik"></nb-user>
        </div>
        <div class="test-row">
          <nb-user inverse name="Dmitry Nehaychik" title="Worker"></nb-user>
        </div>
        <div class="test-row">
          <nb-user inverse size="small" name="Dmitry Nehaychik" title="Worker" showTitle="false"></nb-user>
        </div>
        <div class="test-row">
          <nb-user inverse onlyPicture size="medium" name="Dmitry Nehaychik" title="Worker"></nb-user>
        </div>
        <div class="test-row">
          <nb-user inverse size="medium" name="Dmitry Nehaychik" title="Worker"
                    [menu]="contextMenu" (menuClick)="onMenuItemClick($event)"></nb-user>
        </div>
        <div class="test-row">
          <nb-user inverse onlyPicture size="medium" name="Dmitry Nehaychik" title="Worker"
                    [menu]="contextMenu" (menuClick)="onMenuItemClick($event)"></nb-user>
        </div>
        <div class="test-row">
          <nb-user inverse size="large" picture="http://lorempixel.com/400/200/animals/"
                    name="Dmitry Nehaychik" title="Worker"
                    [menu]="contextMenu" (menuClick)="onMenuItemClick($event)"></nb-user>
        </div>
        <div class="test-row">
          <nb-user inverse showInitials size="medium" name="Dmitry Nehaychik" title="Worker"
                    [menu]="contextMenu" (menuClick)="onMenuItemClick($event)"></nb-user>
        </div>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbUserTestComponent {

  contextMenu = [
    { title: 'Profile', link: 'some/link', icon: 'nb-person' },
    { title: 'Billing', target: '_blank', url: 'http://akveo.com' },
    { title: 'Exit', key: 'exit' },
  ];

  onMenuItemClick(event) {
    console.info(event);
  }
}
