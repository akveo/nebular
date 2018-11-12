import { Component } from '@angular/core';
import { NbSearchService } from '@nebular/theme';

@Component({
  selector: 'nb-search-event',
  templateUrl: './search-event.component.html',
  styles: [`
    :host ::ng-deep nb-layout-column {
      height: 50vw;
      background: #f4f4f7;
    }
  `],
})
export class NbSearchEventComponent {

  value = '';

  constructor(private searchService: NbSearchService) {

    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        this.value = data.term;
      })

  }
}
