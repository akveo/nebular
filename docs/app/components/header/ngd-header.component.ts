import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { Subscription } from 'rxjs/Subscription';

import { DocsService } from '../../docs/docs.service';

@Component({
  selector: 'ngd-header',
  styleUrls: ['ngd-header.component.scss'],
  template: `
    <div class="logo-container">
      <a routerLink="/">
        <img src="assets/images/logo.png">
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
    this.menuItems = this.service.getPreparedMenu([
      { title: 'Home', link: '/home' },
      { title: 'Docs', link: '/docs' },
    ]);
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
