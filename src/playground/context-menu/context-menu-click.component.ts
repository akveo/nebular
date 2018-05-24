import { Component, Inject, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NB_WINDOW, NbMenuService } from '@nebular/theme';

@Component({
  selector: 'nb-context-menu-click',
  templateUrl: './context-menu-click.component.html',
  styles: [`
    :host nb-layout-column {
      height: 50vw;
    }

    :host nb-layout-column:first-child {
      background: #f4f4f7;
    }

    :host nb-layout-header /deep/ nav {
      justify-content: flex-end;
    }
  `],
})
export class NbContextMenuClickComponent implements OnInit {
  items = [
    { title: 'Profile' },
    { title: 'Logout' },
  ];

  constructor(private nbMenuService: NbMenuService, @Inject(NB_WINDOW) private window) {
  }

  ngOnInit() {
    this.nbMenuService.onItemClick()
      .pipe(filter(({ tag }) => tag === 'my-context-menu'))
      .subscribe(({ item: { title } }) => this.window.alert(`${title} was clicked!`));
  }
}
