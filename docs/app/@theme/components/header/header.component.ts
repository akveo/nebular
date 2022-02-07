import { ChangeDetectionStrategy, Component, HostBinding, Inject, Input, OnInit } from '@angular/core';
import { NB_WINDOW, NbMenuItem, NbSidebarService } from '@beast/theme';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { NgdVersionService, Version } from '../../services';

@Component({
  selector: 'ngd-header',
  styleUrls: ['./header.component.scss'],
  template: `
    <div class="section left">
      <button *ngIf="sidebarTag" class="sidebar-toggle" (click)="toggleSidebar()">
        <nb-icon icon="menu-2"></nb-icon>
      </button>
      <div class="logo">
        <a routerLink="/">
          <img src="assets/img/beast-logo-1.png" />
        </a>
        <!-- <span class="version" *ngIf="currentVersionName$ | async"> v{{ currentVersionName$ | async }} </span> -->
      </div>
    </div>
    <div class="section middle">
      <nb-menu [items]="mainMenu"></nb-menu>
      <ngd-search *ngIf="showSearch"></ngd-search>
      <!-- <nb-select
        class="version-select"
        *ngIf="showVersionSelect$ | async"
        [selected]="currentVersion$ | async"
        (selectedChange)="redirectToVersion($event)"
      >
        <nb-option *ngFor="let version of supportedVersions$ | async" [value]="version">
          {{ version.name }}
        </nb-option>
      </nb-select> -->
    </div>
    <div class="section right"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdHeaderComponent implements OnInit {
  @Input() showSearch = true;
  @HostBinding('class.docs-page') @Input() isDocs = false;

  private window: Window;
  supportedVersions$: Observable<Version[]>;
  currentVersion$: Observable<Version>;
  currentVersionName$: Observable<string>;
  showVersionSelect$: Observable<boolean>;

  mainMenu: NbMenuItem[] = [
    {
      title: 'Introdução',
      link: '/docs',
    },
    {
      title: 'Branding',
      link: '/docs/design-system/cores',
    },
    {
      title: 'Componentes',
      link: '/docs/componentes/overview',
    },
    {
      title: 'Recursos',
      link: '/docs/design-system/recursos',
    },
    // {
    //   title: 'Security',
    //   link: '/docs/security/introduction',
    // },
  ];

  @Input() sidebarTag: string;

  constructor(
    @Inject(NB_WINDOW) window,
    private versionService: NgdVersionService,
    private sidebarService: NbSidebarService,
  ) {
    this.window = window;
  }

  ngOnInit() {
    this.currentVersion$ = this.versionService.getCurrentVersion();
    this.currentVersionName$ = this.currentVersion$.pipe(map((version: Version) => version.name));
    this.supportedVersions$ = this.versionService.getSupportedVersions();

    this.showVersionSelect$ = this.supportedVersions$.pipe(
      map((versions: Version[]) => versions.length > 0),
      startWith(false),
    );
  }

  toggleSidebar() {
    this.sidebarService.toggle(false, this.sidebarTag);
  }

  redirectToVersion(version: Version): void {
    this.window.location.href = version.path;
  }
}
