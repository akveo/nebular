import { Component } from '@angular/core';

@Component({
  selector: 'nb-sidebar-showcase',
  templateUrl: './sidebar-showcase.component.html',
  styles: [`
    :host nb-layout-column {
      height: 50vw;
      background: #f4f4f7;
    }
  `],
})

export class NbSidebarShowcaseComponent {
}
