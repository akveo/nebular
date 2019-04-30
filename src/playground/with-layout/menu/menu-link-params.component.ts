/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'nb-menu-link-params',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './menu-link-params.component.html',
})
export class MenuLinkParamsComponent {

  items: NbMenuItem[] = [
    {
      title: 'Menu link with parameters',
      expanded: true,
      children: [
        {
          title: 'Goes into angular `routerLink`',
          link: '', // goes into angular `routerLink`
        },
        {
          title: 'Goes directly into `href` attribute',
          url: '/example/menu/menu-link-params.component#some-location', // goes directly into `href` attribute
        },
        {
          title: 'Menu item path match `prefix`',
          link: '/example/menu/menu-link-params.component',
          queryParams: {someUrlParam: 'true'},
          pathMatch: 'prefix',
        },
        {
          title: 'Will be opened in new window (target=`_blank`)',
          url: 'https://github.com/akveo/nebular',
          target: '_blank',
        },
        {
          title: 'Menu item with icon',
          link: '/example/menu/menu-link-params.component',
          icon: 'search-outline',
        },
        {
          title: 'Hidden menu item',
          link: '',
          hidden: true,
        },
      ],
    },
  ];
}
