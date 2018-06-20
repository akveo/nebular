import { Component, OnInit } from '@angular/core';

import { NgdMenuService } from '../../../@theme/services/menu.service';

@Component({
  selector: 'ngd-components-overview-block',
  styleUrls: ['./components-overview-block.component.scss'],
  templateUrl: './components-overview-block.component.html',
})
export class NgdComponentsOverviewBlockComponent implements OnInit {
  components: { name: string; icon: string; link: string }[];

  constructor(private menu: NgdMenuService) {}

  ngOnInit() {
    this.components = this.menu
      .getPreparedMenu('/docs')
      .find(({ title }) => title === 'Components')
      .children
      .slice(1)
      .map(({ data: { name, icon }, link }) => ({ name, icon, link }));
  }
}
