/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class NgdHomeComponent {
  features = [
    {
      title: 'Introdução',
      description: 'Sessão de onboarding para entender tudo o que precisa saber para começar a utilizar o Beast',
      icon: 'assets/img/intro.svg',
      link: 'docs',
    },
    {
      title: 'Branding',
      description: `Os principais padrões e fundamentos para começar a usar a nossa marca`,
      icon: 'assets/img/themes.svg',
      link: 'docs/design-system/cores',
    },
    {
      title: 'Componentes',
      description: 'Explore os componentes que compõem a interface da Dadosfera',
      icon: 'assets/img/components.svg',
      link: 'docs/componentes/components-overview',
    },
    {
      title: 'Recursos',
      description: `Faça o download e acesse os principais links da nossa identidade visual`,
      icon: 'assets/img/guides.svg',
      link: 'docs/design-system/recursos',
    },
  ];

  constructor(themeService: NbThemeService) {
    themeService.changeTheme('docs-home');
  }
}
