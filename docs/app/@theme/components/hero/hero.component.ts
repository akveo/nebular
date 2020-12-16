import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ngd-hero',
  styleUrls: ['./hero.component.scss'],
  template: `
    <div class="block">
      <h1>Nebular: Customizable UI Kit, Auth&nbsp;&&nbsp;Security</h1>
      <div class="btns-wrapper">
        <a class="btn get-started" routerLink="docs">Get Started</a>
        <a class="btn" href="https://www.akveo.com/ngx-admin?utm_campaign=ngx_admin%20-%20website%20-%20nebular%20landing%20-%20traffic&utm_source=nebular&utm_medium=referral&utm_content=nebular_docs_home_hero"
           target="_blank">Demo</a>
      </div>
      <div class="hero-features">
        <div class="hero-feature">
          <div class="feature-key">
            35+
          </div>
          <h3 class="feature-title">
            Angular Components
          </h3>
        </div>
        <div class="hero-feature">
          <div class="feature-key">
            4
          </div>
          <h3 class="feature-title">
            Visual themes
          </h3>
        </div>
        <div class="hero-feature">
          <div class="feature-key">
            3
          </div>
          <h3 class="feature-title">
            Auth strategies
          </h3>
        </div>
        <div class="hero-feature">
          <div class="feature-key">
            <nb-icon icon="lock"></nb-icon>
          </div>
          <h3 class="feature-title">
            Security
          </h3>
        </div>
      </div>
    </div>
    <div class="right-block">
      <div class="hero-components">
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdHeroComponent {
}
