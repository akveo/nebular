import { Component, OnInit } from '@angular/core';
import {NbSearchService} from '@nebular/theme';
import {pipe, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'nb-search-with-input-event',
  template: `
    <nb-layout>
      <nb-layout-header fixed>
        <a class="navbar-brand" href="#">ngx-admin</a>
        <nb-search id="search-with-input-event"
                   type="rotate-layout"
                   tag="search-input-event"
                   placeholder="Type here."
        ></nb-search>
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
export class SearchWithInputEventComponent implements OnInit {

  constructor(private searchService: NbSearchService) {
  }

  ngOnInit() {
    this.searchService.onSearchSubmit().pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe((data: { term: string, tag: string }) => {
      console.info(`term: ${data.term}, from search: ${data.tag}`);
    });
  }

}
