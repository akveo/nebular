/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

import 'style-loader!./app.themes.scss';
import { ActivatedRoute, ActivatedRouteSnapshot, Route, Router } from '@angular/router';

@Component({
  selector: 'nb-app-root',
  template: `
    <nb-layout-direction-toggle></nb-layout-direction-toggle>
    <router-outlet></router-outlet>
  `,
})
export class NbAppComponent {

  constructor(public route: ActivatedRoute) {
    // console.log(this.createMenuFromRoutes(this.router.config));

    // this.router.config.forEach(i => console.log(i.loadChildren));

  }

  // createMenuFromRoutes(items: Route[], parentLink = '') {
  //   return items.map((route: Route) => {
  //     return this.createMenuFromRoutes(route.children);
  //   });
  // }
}
