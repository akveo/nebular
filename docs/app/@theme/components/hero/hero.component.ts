/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ngd-hero',
  styleUrls: ['./hero.component.scss'],
  template: `
    <div class="block">
      <h1>Bem vindo ao Beast</h1>
      <h2>O Design System da Dadosfera</h2>
      <p class="hero-promo">
        Design System é um ecossistema de bibliotecas instaláveis, com componentes programados e padrões semânticos de
        design, que reúne padrões de comportamentos e unifica a linguagem do Produto. Desenvolvido para criar
        experiências simples, intuitivas e bonitas, se apoia no atributo da Plataforma:
        <strong>Beautiful & Intuitive</strong>.
      </p>
      <div class="btns-wrapper">
        <a class="btn get-started" routerLink="docs">Documentação</a>
      </div>
      <div class="hero-features">
        <!--<div class="hero-feature">
          <div class="feature-key">40+</div>
          <h3 class="feature-title">Angular Components</h3>
        </div>
         <div class="hero-feature">
          <div class="feature-key">4</div>
          <h3 class="feature-title">Visual themes</h3>
        </div>
        <div class="hero-feature">
          <div class="feature-key">3</div>
          <h3 class="feature-title">Auth strategies</h3>
        </div>

        <div class="hero-feature">
          <div class="feature-key">
            <nb-icon icon="lock"></nb-icon>
          </div>
          <h3 class="feature-title">Segurança/ACL</h3>
        </div>-->
      </div>
    </div>
    <div class="right-block">
      <div class="hero-components"></div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdHeroComponent {
  constructor() {}
}
