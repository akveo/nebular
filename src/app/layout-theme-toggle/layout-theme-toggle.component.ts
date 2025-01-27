import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'npg-layout-theme-toggle',
  styleUrls: ['./layout-theme-toggle.component.scss'],
  template: `
    <div dir="ltr">
      <label *ngFor="let theme of themeList; index as i" class="theme-radio-label">
        <input
          type="radio"
          [value]="theme"
          name="theme"
          [attr.checked]="i === 0 || null"
          (change)="handleChange(theme)"
          class="theme-radio"
        />{{ theme | titlecase }}
      </label>
    </div>
  `,
  standalone: false,
})
export class LayoutThemeToggleComponent {
  readonly themeList = ['default', 'dark', 'cosmic', 'corporate'];

  constructor(private themeService: NbThemeService) {}

  handleChange(theme: string): void {
    this.themeService.changeTheme(theme);
  }
}
