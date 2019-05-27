import { Component, OnInit } from '@angular/core';
import {NbSearchService} from '@nebular/theme';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'nb-search-with-input-event',
  template: `
    <nb-layout>
      <nb-layout-header fixed>
        <nb-search type="rotate-layout" tag="search-input-event"></nb-search>
      </nb-layout-header>
      <nb-sidebar>
      </nb-sidebar>

      <nb-layout-column class="colored-column-basic">
        <nb-card accent="info">
          <nb-card-header>You searched for:</nb-card-header>
          <nb-card-body>
            <h3>{{ value || '-' }}</h3>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class SearchWithInputEventComponent implements OnInit {
  value: string;
  constructor(private searchService: NbSearchService) {
  }

  ngOnInit() {
    this.searchService.onSearchInput().pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe((data: { term: string, tag: string }) => {
      this.value = data.term;
    });
  }

}
