/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-action-test',
  template: `
    <nb-layout>
      <nb-layout-header>
        <nb-actions>
          <nb-action icon="search-outline" (click)="actionOnClick('first')"></nb-action>
          <nb-action icon="search-outline"></nb-action>
          <nb-action>
            <nb-user></nb-user>
          </nb-action>
          <nb-action icon="search-outline"></nb-action>
          <nb-action icon="search-outline"></nb-action>
          <nb-action icon="search-outline" disabled></nb-action>
          <nb-action>
            Hello
          </nb-action>
        </nb-actions>
      </nb-layout-header>
      <nb-layout-column>

        <nb-card>
          <nb-card-body>
            <nb-actions inverse>
              <nb-action icon="search-outline" (click)="actionOnClick('first')"></nb-action>
              <nb-action icon="search-outline"></nb-action>
              <nb-action>
                <nb-user></nb-user>
              </nb-action>
              <nb-action icon="search-outline"></nb-action>
              <nb-action icon="search-outline"></nb-action>
              <nb-action icon="search-outline" disabled></nb-action>
              <nb-action>
                Hello
              </nb-action>
            </nb-actions>
          </nb-card-body>
        </nb-card>

        <nb-card>
          <nb-card-body>
            <nb-actions inverse size="medium">
              <nb-action icon="search-outline" (click)="actionOnClick('first')"></nb-action>
              <nb-action icon="search-outline"></nb-action>
              <nb-action>
                <nb-user></nb-user>
              </nb-action>
              <nb-action icon="search-outline"></nb-action>
              <nb-action icon="search-outline"></nb-action>
              <nb-action icon="search-outline" disabled></nb-action>
              <nb-action>
                Hello
              </nb-action>
            </nb-actions>
          </nb-card-body>
        </nb-card>

        <nb-card>
          <nb-card-body>
            <nb-actions inverse size="large">
              <nb-action icon="search-outline" (click)="actionOnClick('first')"></nb-action>
              <nb-action icon="search-outline"></nb-action>
              <nb-action>
                <nb-user></nb-user>
              </nb-action>
              <nb-action icon="search-outline"></nb-action>
              <nb-action icon="search-outline"></nb-action>
              <nb-action icon="search-outline" disabled></nb-action>
              <nb-action>
                Hello
              </nb-action>
            </nb-actions>
          </nb-card-body>
        </nb-card>

        <nb-card>
          <nb-card-body>
            <nb-actions size="large">
              <nb-action
                badgeText="29"
                badgeStatus="success"
                badgePosition="bottom left">
                <nb-user></nb-user>
              </nb-action>
              <nb-action
                badgeText="29"
                badgeStatus="danger"
                badgePosition="top left"
                icon="search-outline">
              </nb-action>
              <nb-action
                badgeText="29"
                badgeStatus="warning"
                badgePosition="bottom right"
                icon="search-outline">
              </nb-action>
              <nb-action
                badgeText="29"
                badgeStatus="success"
                badgePosition="bottom left"
                icon="search-outline">
              </nb-action>
              <nb-action
                badgeText="29"
                badgeStatus="info"
                badgePosition="top right"
                icon="search-outline">
              </nb-action>
              <nb-action
                badgeText="29"
                badgeStatus="info"
                badgePosition="top right"
                icon="search-outline"
                disabled>
              </nb-action>
              <nb-action badgeText="29">Badge</nb-action>
            </nb-actions>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class ActionTestComponent {

  actionOnClick(event: any) {
    console.info(event);
  }
}
