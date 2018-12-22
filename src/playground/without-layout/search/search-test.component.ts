/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnInit } from '@angular/core';

import { NbSearchService } from '@nebular/theme';

@Component({
  selector: 'nb-search-test',
  template: `
    <nb-layout>
      <nb-layout-header fixed>
        <a class="navbar-brand" href="#">ngx-admin</a>
        <nb-search type="rotate-layout" tag="header-search"></nb-search>
      </nb-layout-header>
      <nb-layout-column>
        <nb-card>
          <nb-card-header>
            <span>Header</span>
          </nb-card-header>
          <nb-card-body>
            <span>Body</span>
          </nb-card-body>
          <nb-card-footer>
            <span>Footer</span>
          </nb-card-footer>
        </nb-card>
        <nb-card size="small">
          <nb-card-header>
            <span>Header</span>
          </nb-card-header>
          <nb-card-body>
            <span>Body</span>
          </nb-card-body>
          <nb-card-footer>
            <span>Footer</span>
          </nb-card-footer>
        </nb-card>
        <nb-card size="medium">
          <nb-card-header>
            <span>Header</span>
          </nb-card-header>
          <nb-card-body>
            <span>Body</span>
          </nb-card-body>
          <nb-card-footer>
            <span>Footer</span>
          </nb-card-footer>
        </nb-card>
        <nb-card size="large">
          <nb-card-header>
            <span>Header</span>
          </nb-card-header>
          <nb-card-body>
            <span>Body</span>
          </nb-card-body>
          <nb-card-footer>
            <span>Footer</span>
          </nb-card-footer>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class SearchTestComponent implements OnInit {

  constructor(private searchService: NbSearchService) {
  }

  ngOnInit() {
    this.searchService.onSearchSubmit().subscribe((data: { term: string, tag: string }) => {
      console.info(`term: ${data.term}, from search: ${data.tag}`);
    });
  }
}
