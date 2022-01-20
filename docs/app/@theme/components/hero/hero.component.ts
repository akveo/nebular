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
      <h1>Beast: Design System da Dadosfera</h1>
      <p class="hero-promo">
        Nebular is a customizable Angular UI library that contains 40+ UI components, four visual themes, and Auth and
        Security modules. Recognized at the prestigious AngularConnect 2018, this Angular framework allows focusing on
        beautiful designs to adapt them to your brand. Nebular is free of charge and open-source.
      </p>
      <div class="btns-wrapper">
        <a class="btn get-started" routerLink="docs">Get Started</a>
      </div>
      <div class="hero-features">
        <div class="hero-feature">
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
          <h3 class="feature-title">Security</h3>
        </div>
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
