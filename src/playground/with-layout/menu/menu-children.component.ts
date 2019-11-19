/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-menu-children',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './menu-children.component.html',
})
export class MenuChildrenComponent {

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
      link: [],
    },
    {
      title: 'Orders',
      link: [],
    },
  ];
}
