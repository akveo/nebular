/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-menu-autocollapse',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './menu-autocollapse.component.html',
})

export class MenuAutoCollapseComponent {

  items = [
    {
      title: 'Profile',
      expanded: true,
      children: [
        {
          title: 'Change Password',
          link: [], // goes into angular `routerLink`
        },
        {
          title: 'Privacy Policy',
          url: '#', // goes directly into `href` attribute
        },
        {
          title: 'Logout',
          link: [],
        },
      ],
    },
    {
      title: 'Shopping Bag',
      children: [
        {
          title: 'First Product',
          link: [], // goes into angular `routerLink`
        },
        {
          title: 'Second Product',
          url: '#', // goes directly into `href` attribute
        },
        {
          title: 'Third Product',
          link: [],
        },
      ],
    },
    {
      title: 'Orders',
      children: [
        {
          title: 'First Order',
          link: [], // goes into angular `routerLink`
        },
        {
          title: 'Second Order',
          url: '#', // goes directly into `href` attribute
        },
        {
          title: 'Third Order',
          link: [],
        },
      ],
    },
  ];
}
