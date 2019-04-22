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
        <nb-user showInitials size="medium" name="Dmitry Nehaychik" title="Worker"></nb-user>
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
          <nb-user inverse size="medium" name="Dmitry Nehaychik" title="Worker"></nb-user>
        </div>
        <div class="test-row">
          <nb-user inverse onlyPicture size="medium" name="Dmitry Nehaychik" title="Worker"></nb-user>
        </div>
        <div class="test-row">
          <nb-user inverse size="large" picture="http://lorempixel.com/400/200/animals/"
                   name="Dmitry Nehaychik" title="Worker"></nb-user>
        </div>
        <div class="test-row">
          <nb-user inverse showInitials size="medium" name="Dmitry Nehaychik" title="Worker"></nb-user>
        </div>

        <div class="test-row">
          <nb-user inverse size="large" name="Dmitry Nehaychik" badgeText="29"></nb-user>
        </div>
        <div class="test-row">
          <nb-user inverse
            name="Dmitry Nehaychik"
            title="Worker"
            badgeText="29"
            badgeStatus="info"
            badgePosition="top left">
          </nb-user>
        </div>
        <div class="test-row">
          <nb-user inverse
            size="small"
            name="Dmitry Nehaychik"
            title="Worker"
            showTitle="false"
            badgeText="29"
            badgeStatus="success"
            badgePosition="bottom right">
          </nb-user>
        </div>
        <div class="test-row">
          <nb-user inverse
            onlyPicture
            size="medium"
            name="Dmitry Nehaychik"
            title="Worker"
            badgeText="29"
            badgeStatus="warning"
            badgePosition="bottom left">
          </nb-user>
        </div>
        <div class="test-row">
          <nb-user inverse
            size="large"
            picture="http://lorempixel.com/400/200/animals/"
            name="Dmitry Nehaychik"
            title="Worker"
            badgeText="29"
            badgeStatus="danger"
            badgePosition="top left">
          </nb-user>
        </div>
        <div class="test-row" id="base64-image">
          <nb-user
            [picture]="'data:image/png;base64,aaa'"></nb-user>
        </div>
        <div class="test-row">
          <nb-user
            size="large"
            picture="http://lorempixel.com/400/200/animals/"
            name="Dmitry Nehaychik"
            title="Worker"
            badgeText="29"
            badgeStatus="danger"
            badgePosition="top start">
          </nb-user>
        </div>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class UserTestComponent {
}
