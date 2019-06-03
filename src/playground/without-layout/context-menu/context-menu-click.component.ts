import { Component, Inject, OnInit } from '@angular/core';
import { NB_WINDOW, NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'nb-context-menu-click',
  templateUrl: './context-menu-click.component.html',
  styles: [`
    :host nb-layout-header ::ng-deep nav {
      justify-content: flex-end;
    }
  `],
})
export class ContextMenuClickComponent implements OnInit {
  items = [
    { title: 'Profile' },
    { title: 'Logout' },
  ];

  constructor(private nbMenuService: NbMenuService, @Inject(NB_WINDOW) private window) {
  }

  ngOnInit() {
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => this.window.alert(`${title} was clicked!`));
  }
}
