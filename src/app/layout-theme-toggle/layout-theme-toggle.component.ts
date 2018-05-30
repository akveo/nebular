import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'nb-layout-theme-toggle',
  styleUrls: ['./layout-theme-toggle.component.scss'],
  template: `
    <label dir="ltr">
      <input type="checkbox" value="isCosmic" (click)="toggle()">
      <span>Cosmic</span>
    </label>
  `,
})
export class NbLayoutThemeToggleComponent {
  constructor(private themeService: NbThemeService) {}

  get isCosmic(): boolean {
    return this.themeService.currentTheme === 'cosmic';
  }

  toggle() {
    this.isCosmic ? this.themeService.changeTheme('default') : this.themeService.changeTheme('cosmic');
  }
}
