import { Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import 'style-loader!./styles/styles.scss';


@Component({
  selector: 'nb-playground-base',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class NbPlaygroundBaseComponent implements OnInit {
  constructor(private themeService: NbThemeService) {
  }

  ngOnInit() {
    this.themeService.changeTheme('default');
  }
}
