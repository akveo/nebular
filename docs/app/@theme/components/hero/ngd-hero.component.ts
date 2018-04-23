import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ngd-hero',
  styleUrls: ['./ngd-hero.component.scss'],
  template: `
    <div class="block">
      <h1>Nebular</h1>
      <p>A set of essential modules for your next Angular app</p>
      <a class="btn btn-primary get-started" [routerLink]="docs">Get Started</a>
      <a class="btn btn-success" href="#">Demo</a>
    </div>
    <div class="shield">
      <h3>Not Just Another UI kit</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdHeroComponent {
}
