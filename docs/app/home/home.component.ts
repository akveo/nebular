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
    },
    {
      title: 'Guides',
      description: 'A set of essential modules for your next Angular App',
    },
    {
      title: 'Themes',
      description: 'A set of essential modules for your next Angular App',
    },
    {
      title: 'Components',
      description: 'A set of essential modules for your next Angular App',
    },
    {
      title: 'Auth',
      description: 'A set of essential modules for your next Angular App',
    },
    {
      title: 'Security',
      description: 'A set of essential modules for your next Angular App',
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
