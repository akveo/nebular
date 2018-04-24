import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngd-header',
  styleUrls: ['./ngd-header.component.scss'],
  template: `
    <div class="logo">
      <a href="#">Nebular</a>
      <span class="version">v1.2.0</span>
    </div>
    <nb-menu [items]="mainMenu"></nb-menu>
    <iframe class="stars"
            src="https://ghbtns.com/github-btn.html?user=akveo&repo=nebular&type=star&count=true"
            frameborder="0"
            scrolling="0">
    </iframe>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdHeaderComponent {

  mainMenu: NbMenuItem[] = [
    {
      title: 'Docs',
      link: 'docs',
    },
    {
      title: 'Components',
      link: '/docs/components',
    },
    {
      title: 'Theme',
      link: '/docs/theme',
    },
    {
      title: 'Auth',
      link: '/docs/auth',
    },
    {
      title: 'Security',
      link: '/docs/security',
    },
  ];
}
