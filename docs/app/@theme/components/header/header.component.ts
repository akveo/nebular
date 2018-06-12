import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { NgdVersionService } from '../../services';

@Component({
  selector: 'ngd-header',
  styleUrls: ['./header.component.scss'],
  template: `
    <div class="section left">
      <button *ngIf="sidebarTag" class="sidebar-toggle" (click)="toggleSidebar()">
        <i class="nb-menu"></i>
      </button>
      <div class="logo">
        <a routerLink="/">Nebular</a>
        <span class="version">v{{ currentVersion }}</span>
      </div>
    </div>
    <div class="section middle">
      <nb-menu [items]="mainMenu"></nb-menu>
      <ngd-search *ngIf="showSearch"></ngd-search>
    </div>
    <div class="section right">
      <iframe class="stars"
              src="https://ghbtns.com/github-btn.html?user=akveo&repo=nebular&type=star&count=true"
              frameborder="0"
              scrolling="0">
      </iframe>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdHeaderComponent {

  @Input() showSearch = true;
  @HostBinding('class.docs-page') @Input() isDocs = false;

  currentVersion: string;

  constructor(
    versionService: NgdVersionService,
    private sidebarService: NbSidebarService,
  ) {
    this.currentVersion = versionService.getNebularVersion();
  }

  mainMenu: NbMenuItem[] = [
    {
      title: 'Docs',
      link: '/docs',
    },
    {
      title: 'Components',
      link: '/docs/components/components-overview',
    },
    {
      title: 'Theme System',
      link: '/docs/guides/theme-system',
    },
    {
      title: 'Auth',
      link: '/docs/auth/introduction',
    },
    {
      title: 'Security',
      link: '/docs/security/introduction',
    },
  ];

  @Input() sidebarTag: string;

  toggleSidebar() {
    this.sidebarService.toggle(false, this.sidebarTag);
  }
}
