/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'ngd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class NgdHomeComponent {

  features = [
    {
      title: 'Introduction',
      description: 'A set of essential modules for your next Angular App',
      icon: 'assets/img/intro.svg',
    },
    {
      title: 'Guides',
      description: 'A set of essential modules for your next Angular App',
      icon: 'assets/img/guides.svg',
    },
    {
      title: 'Themes',
      description: 'A set of essential modules for your next Angular App',
      icon: 'assets/img/themes.svg',
    },
    {
      title: 'Components',
      description: 'A set of essential modules for your next Angular App',
      icon: 'assets/img/components.svg',
    },
    {
      title: 'Auth',
      description: 'A set of essential modules for your next Angular App',
      icon: 'assets/img/auth.svg',
    },
    {
      title: 'Security',
      description: 'A set of essential modules for your next Angular App',
      icon: 'assets/img/security.svg',
    },
  ];

  advantages = [
    {
      title: 'Modular',
      description: `Far far away, behind the word mountains,
      far from the countries Vokalia and Consonantia,
      there live the blind texts.`,
    },
    {
      title: 'Modular',
      description: `Far far away, behind the word mountains,
      far from the countries Vokalia and Consonantia,
      there live the blind texts.`,
    },
    {
      title: 'Modular',
      description: `Far far away, behind the word mountains,
      far from the countries Vokalia and Consonantia,
      there live the blind texts.`,
    },
    {
      title: 'Modular',
      description: `Far far away, behind the word mountains,
      far from the countries Vokalia and Consonantia,
      there live the blind texts.`,
    },
  ];
}
