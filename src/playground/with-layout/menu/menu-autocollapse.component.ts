/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'npg-menu-autocollapse',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './menu-autocollapse.component.html',
})
export class MenuAutoCollapseComponent {
  items: NbMenuItem[] = [
    {
      title: 'Profile',
      expanded: true,
      role: 'button',
      children: [
        {
          title: 'Change Password',
        },
        {
          title: 'Privacy Policy',
        },
        {
          title: 'Logout',
        },
      ],
    },
    {
      title: 'Shopping Bag',
      role: 'button',
      children: [
        {
          title: 'First Product',
        },
        {
          title: 'Second Product',
        },
        {
          title: 'Third Product',
        },
      ],
    },
    {
      title: 'Orders',
      role: 'button',
      children: [
        {
          title: 'First Order',
        },
        {
          title: 'Second Order',
        },
        {
          title: 'Third Order',
        },
      ],
    },
  ];
}
