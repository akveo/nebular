import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'npg-layout-theme-toggle',
  styleUrls: ['./layout-theme-toggle.component.scss'],
  template: `
    <div dir="ltr">
      <label *ngFor="let theme of themeList" class="theme-radio"
        ><input type="radio" value="theme" name="theme" (change)="handleChange(theme)" /> {{ theme }}
      </label>
    </div>
  `,
})
export class LayoutThemeToggleComponent {
  readonly themeList = ['default', 'dark', 'cosmic', 'corporate'];

  constructor(private themeService: NbThemeService) {}

  handleChange(theme: string): void {
    this.themeService.changeTheme(theme);
  }
}
