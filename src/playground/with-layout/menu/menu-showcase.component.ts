/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nb-menu-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './menu-showcase.component.html',
})
export class MenuShowcaseComponent {

  items = [
    {
      title: 'Profile',
      icon: 'person',
      link: [],
    },
    {
      title: 'Change Password',
      icon: 'locked',
      link: [],
    },
    {
      title: 'Privacy Policy',
      icon: 'checkmark',
      link: [],
    },
    {
      title: 'Logout',
      icon: 'arrow-thin-left',
      link: [],
    },
  ];
}
