/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbBadgeComponent } from '@nebular/theme';

@Component({
  selector: 'nb-action-test',
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

        <nb-card>
          <nb-card-body>
            <nb-actions size="large">
              <nb-action
                badgeText="29"
                [badgeStatus]="badge.STATUS_SUCCESS"
                [badgePosition]="badge.BOTTOM_LEFT">
                <nb-user></nb-user>
              </nb-action>
              <nb-action
                badgeText="29"
                [badgeStatus]="badge.STATUS_DANGER"
                [badgePosition]="badge.TOP_LEFT"
                icon="ion-ios-flower-outline">
              </nb-action>
              <nb-action
                badgeText="29"
                [badgeStatus]="badge.STATUS_WARNING"
                [badgePosition]="badge.BOTTOM_RIGHT"
                icon="ion-ios-medical-outline">
              </nb-action>
              <nb-action
                badgeText="29"
                [badgeStatus]="badge.STATUS_SUCCESS"
                [badgePosition]="badge.BOTTOM_LEFT"
                icon="ion-ios-download-outline">
              </nb-action>
              <nb-action
                badgeText="29"
                [badgeStatus]="badge.STATUS_INFO"
                [badgePosition]="badge.TOP_RIGHT"
                icon="ion-ios-download-outline">
              </nb-action>
              <nb-action
                badgeText="29"
                [badgeStatus]="badge.STATUS_INFO"
                [badgePosition]="badge.TOP_RIGHT"
                icon="ion-ios-download-outline"
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
export class NbActionTestComponent {

  badge = NbBadgeComponent;

  actionOnClick(event: any) {
    console.info(event);
  }
}
