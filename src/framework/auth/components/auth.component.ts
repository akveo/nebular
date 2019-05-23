/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';

import { NbAuthService } from '../services/auth.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'nb-auth',
  styleUrls: ['./auth.component.scss'],
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-header>
            <nav class="navigation">
              <a href="#" (click)="back()" class="link back-link" aria-label="Back">
                <nb-icon icon="arrow-back"></nb-icon>
              </a>
            </nav>
          </nb-card-header>
          <nb-card-body>
            <nb-auth-block>
              <router-outlet></router-outlet>
            </nb-auth-block>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbAuthComponent implements OnDestroy {

  private alive = true;

  subscription: any;

  authenticated: boolean = false;
  token: string = '';

  // showcase of how to use the onAuthenticationChange method
  constructor(protected auth: NbAuthService, protected location: Location) {

    this.subscription = auth.onAuthenticationChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe((authenticated: boolean) => {
        this.authenticated = authenticated;
      });
  }

  back() {
    this.location.back();
    return false;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
