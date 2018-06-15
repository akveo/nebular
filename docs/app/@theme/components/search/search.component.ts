import { AfterViewInit, ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { NB_WINDOW } from '@nebular/theme';

@Component({
  selector: 'ngd-search',
  styleUrls: ['./search.component.scss'],
  template: `
    <i class="icon feather-search"></i>
    <input type="text" id="doc-search" placeholder="Start typing...">
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdSearchComponent implements AfterViewInit {

  constructor(@Inject(NB_WINDOW) private window) {
  }

  ngAfterViewInit() {
    this.window.docsearch({
      apiKey: 'fe0dbef6ee2b748314266d7d71d7dea3',
      indexName: 'nebular',
      inputSelector: '#doc-search',
      debug: false,
    });
  }
}
