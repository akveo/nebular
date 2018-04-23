import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngd-header',
  styleUrls: ['./ngd-header.component.scss'],
  template: `
    <div class="logo">
      <strong>Nebular</strong>
      <span class="version">v1.2.0</span>
    </div>
    <nb-menu [items]="mainMenu"></nb-menu>
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
      link: 'docs/components',
    },
    {
      title: 'Theme',
      link: 'docs/theme',
    },
    {
      title: 'Auth',
      link: 'docs/auth',
    },
    {
      title: 'Security',
      link: 'docs/security',
    },
  ];
}
