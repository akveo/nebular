import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'nb-layout-theme-toggle',
  styleUrls: ['./layout-theme-toggle.component.scss'],
  template: `
    <label dir="ltr">
      <button (click)="enable('cosmic')">Cosmic</button>
      &nbsp;
      <button (click)="enable('default')">Default</button>
      &nbsp;
      <button (click)="enable('corporate')">Corporate</button>
    </label>
  `,
})
export class NbLayoutThemeToggleComponent {
  constructor(private themeService: NbThemeService) {}

  enable(theme: string) {
    this.themeService.changeTheme(theme);
  }
}
