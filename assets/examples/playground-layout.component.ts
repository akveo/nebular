import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  template: `
    <nb-layout>
      <nb-layout-column>
        <router-outlet></router-outlet>
      </nb-layout-column>
    </nb-layout>
  `,
  styleUrls: ['../styles/styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PlaygroundLayoutComponent implements OnInit {
  constructor(private themeService: NbThemeService) {}

  ngOnInit() {
    this.themeService.changeTheme('default');
  }
}
