import { Component } from '@angular/core';
import { NbSearchService } from '@nebular/theme';

@Component({
  selector: 'nb-search-event',
  templateUrl: './search-event.component.html',
})
export class SearchEventComponent {

  value = '';

  constructor(private searchService: NbSearchService) {

    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.value = data.term;
      })

  }
}
