/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'npg-change-theme-test',
  template: `
    <nb-layout>
      <nb-layout-header fixed>
        <a href="#" class="navbar-brand">Akveo</a>
        <button id="change-theme" (click)="changeTheme()">Change Theme</button>
      </nb-layout-header>

      <nb-sidebar right> Sidebar content </nb-sidebar>

      <nb-layout-column>
        <nb-card>
          <nb-card-header>Hello</nb-card-header>
          <nb-card-body> Some Test content </nb-card-body>
        </nb-card>
      </nb-layout-column>

      <nb-layout-footer fixed> &copy; Akveo 2017 </nb-layout-footer>
    </nb-layout>
  `,
})
export class ThemeChangeTestComponent {
  currentTheme = 'default';

  constructor(private themeService: NbThemeService) {}

  changeTheme() {
    this.currentTheme = this.currentTheme === 'default' ? 'cosmic' : 'default';
    this.themeService.changeTheme(this.currentTheme);
  }
}
