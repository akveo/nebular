import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngd-example-404',
  template: `
    <nb-layout>
      <nb-layout-column>Example not found.</nb-layout-column>
    </nb-layout>
  `,
  styleUrls: ['./example-404.component.scss'],
})
export class NgdExample404Component {

  constructor(private themeService: NbThemeService) {
    this.themeService.changeTheme('default');
  }
}
