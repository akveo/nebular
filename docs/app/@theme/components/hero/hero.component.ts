import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ngd-hero',
  styleUrls: ['./hero.component.scss'],
  template: `
    <div class="block">
      <h1>Nebular</h1>
      <p>Components, Auth & Security for your next Angular App</p>
      <a class="btn get-started" routerLink="docs">Get Started</a>
      <a class="btn" href="http://akveo.com/ngx-admin?utm_source=nebular_documentation&utm_medium=demo_button"
         target="_blank">Demo</a>
    </div>
    <div class="right-block">
      <div class="shield">
        <h3>Not Just Another</h3>
        <h3>UI Kit</h3>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdHeroComponent {
}
