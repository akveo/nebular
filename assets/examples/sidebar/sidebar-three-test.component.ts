import { Component } from '@angular/core';

@Component({
  selector: 'nb-sidebar-three-test',
  styles: [
    `
    :host /deep/ nb-layout-column {
      background-color: #76ecff;
    }
    `,
  ],
  template: `
    <nb-layout>

      <nb-layout-header></nb-layout-header>

      <nb-sidebar state="collapsed">
        Left
      </nb-sidebar>

      <nb-sidebar state="compacted" fixed right>
        Right
      </nb-sidebar>

      <nb-layout-footer></nb-layout-footer>

    </nb-layout>
`,
})
export class NbSidebarThreeTestComponent {
}
