/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-actions-test',
  template: `
    <nb-layout>
      <nb-layout-header>
        <nb-actions>
          <nb-action icon="ion-ios-email-outline" (click)="actionOnClick('first')"></nb-action>
          <nb-action icon="ion-ios-bell-outline"></nb-action>
          <nb-action>
            <nb-user></nb-user>
          </nb-action>
          <nb-action icon="ion-ios-flower-outline"></nb-action>
          <nb-action icon="ion-ios-medical-outline"></nb-action>
          <nb-action icon="ion-ios-download-outline" disabled></nb-action>
          <nb-action>
            Hello
          </nb-action>
        </nb-actions>
      </nb-layout-header>
      <nb-layout-column>

        <nb-card>
          <nb-card-body>
            <nb-actions inverse>
              <nb-action icon="ion-ios-email-outline" (click)="actionOnClick('first')"></nb-action>
              <nb-action icon="ion-ios-bell-outline"></nb-action>
              <nb-action>
                <nb-user></nb-user>
              </nb-action>
              <nb-action icon="ion-ios-flower-outline"></nb-action>
              <nb-action icon="ion-ios-medical-outline"></nb-action>
              <nb-action icon="ion-ios-download-outline" disabled></nb-action>
              <nb-action>
                Hello
              </nb-action>
            </nb-actions>
          </nb-card-body>
        </nb-card>

        <nb-card>
          <nb-card-body>
            <nb-actions inverse size="medium">
              <nb-action icon="ion-ios-email-outline" (click)="actionOnClick('first')"></nb-action>
              <nb-action icon="ion-ios-bell-outline"></nb-action>
              <nb-action>
                <nb-user></nb-user>
              </nb-action>
              <nb-action icon="ion-ios-flower-outline"></nb-action>
              <nb-action icon="ion-ios-medical-outline"></nb-action>
              <nb-action icon="ion-ios-download-outline" disabled></nb-action>
              <nb-action>
                Hello
              </nb-action>
            </nb-actions>
          </nb-card-body>
        </nb-card>

        <nb-card>
          <nb-card-body>
            <nb-actions inverse size="large">
              <nb-action icon="ion-ios-email-outline" (click)="actionOnClick('first')"></nb-action>
              <nb-action icon="ion-ios-bell-outline"></nb-action>
              <nb-action>
                <nb-user></nb-user>
              </nb-action>
              <nb-action icon="ion-ios-flower-outline"></nb-action>
              <nb-action icon="ion-ios-medical-outline"></nb-action>
              <nb-action icon="ion-ios-download-outline" disabled></nb-action>
              <nb-action>
                Hello
              </nb-action>
            </nb-actions>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbActionsTestComponent {

  actionOnClick(event: any) {
    console.info(event);
  }
}
