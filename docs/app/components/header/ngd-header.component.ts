import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { Subscription } from 'rxjs/Subscription';

import { DocsService } from '../../docs/docs.service';

@Component({
  selector: 'ngd-header',
  styleUrls: ['ngd-header.component.scss'],
  // tslint:disable
  template: `
    <div class="logo-container">
      <a routerLink="/">
        <svg class="logo-title" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 945.58 209.93"><defs><style>.cls-1{font-size:180.16px;font-family:Exo-DemiBold, Exo;font-weight:600;}.cls-1,.cls-2,.cls-3,.cls-4,.cls-5{fill:#fff;}.cls-3{opacity:0.6;}.cls-4{opacity:0.3;}.cls-5{opacity:0.7;}</style></defs><title>Asset 18100</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_5" data-name="Layer 5"><g id="Layer_4" data-name="Layer 4"><text class="cls-1" transform="translate(305.64 160.38)">Nebular</text><circle class="cls-2" cx="118.16" cy="72.29" r="14.8"/><circle class="cls-2" cx="77.7" cy="72.29" r="14.8"/><circle class="cls-2" cx="77.75" cy="112.29" r="14.8"/><circle class="cls-2" cx="118.11" cy="112.29" r="14.8"/><circle class="cls-3" cx="77.7" cy="37.75" r="9.82"/><circle class="cls-3" cx="118.16" cy="37.75" r="9.82"/><circle class="cls-3" cx="148.11" cy="47.75" r="9.82"/><circle class="cls-3" cx="118.11" cy="153.05" r="9.82"/><circle class="cls-3" cx="77.7" cy="153.05" r="9.82"/><circle class="cls-3" cx="158.16" cy="113.05" r="9.82"/><circle class="cls-3" cx="158.11" cy="78.65" r="9.82"/><circle class="cls-3" cx="37.75" cy="112.29" r="9.82"/><circle class="cls-3" cx="37.75" cy="78.65" r="9.82"/><circle class="cls-4" cx="118.11" cy="7.75" r="7.75"/><circle class="cls-4" cx="77.7" cy="7.75" r="7.75"/><circle class="cls-4" cx="118.16" cy="183.05" r="7.75"/><circle class="cls-4" cx="77.7" cy="183.05" r="7.75"/><circle class="cls-4" cx="188.16" cy="113.05" r="7.75"/><circle class="cls-4" cx="188.11" cy="78.84" r="7.75"/><circle class="cls-4" cx="7.75" cy="112.62" r="7.75"/><circle class="cls-4" cx="7.75" cy="78.65" r="7.75"/><circle class="cls-4" cx="167.45" cy="25.6" r="7.75"/><circle class="cls-5" cx="148.16" cy="142.29" r="9.82"/><circle class="cls-4" cx="167.45" cy="161.63" r="7.75"/><circle class="cls-5" cx="47.7" cy="142.62" r="9.82"/><circle class="cls-4" cx="27.01" cy="161.63" r="7.75"/><circle class="cls-5" cx="47.75" cy="47.75" r="9.82"/><circle class="cls-4" cx="27.01" cy="25.6" r="7.75"/></g></g></g></svg>
      </a>
    </div>
    <div class="menu">
      <a routerLink="/home" routerLinkActive="active-link">HOME</a>
      <a routerLink="/docs" routerLinkActive="active-link">DOCUMENTATION</a>
    </div>
    <i class="menu-icon ion-navicon" (click)="toggleMenu()"></i>
    <nb-menu class="mobile-menu" [class.active]="isMenuActive" [items]="menuItems" tag="mobileMenu"></nb-menu>
  `,
})
// tslint:enable
export class NgdHeaderComponent implements OnInit, OnDestroy {

  isMenuActive: boolean = false;
  menuItems: NbMenuItem[] = [];

  private structure: any;
  private menuSubscription: Subscription;

  constructor(private service: DocsService,
              private menuService: NbMenuService,
              private renderer: Renderer2) {
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
    this.isMenuActive ?
      this.renderer.addClass(document.body, 'scrolless') :
      this.renderer.removeClass(document.body, 'scrolless');
  }

  ngOnInit() {
    this.menuItems = this.service.getPreparedMenu();
    this.structure = this.service.getPreparedStructure();
    this.menuSubscription = this.menuService.onItemSelect().subscribe(event => {
      if (this.isMenuActive) {
        this.toggleMenu();
      }
    });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'scrolless');
    this.menuSubscription.unsubscribe();
  }
}
