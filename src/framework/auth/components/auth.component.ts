/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnDestroy } from '@angular/core';
import { NbAuthService } from '../services/auth.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'nb-auth',
  styleUrls: ['./auth.component.scss'],
  template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-body>
            <div class="flex-centered col-xl-4 col-lg-6 col-md-8 col-sm-12">
              <router-outlet></router-outlet>
            </div>
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
  constructor(protected auth: NbAuthService) {

    this.subscription = auth.onAuthenticationChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe((authenticated: boolean) => {
        this.authenticated = authenticated;
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
