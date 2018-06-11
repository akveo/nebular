import { Component } from '@angular/core';

@Component({
  selector: 'nb-sidebar-one-test',
  styles: [
    `
    :host /deep/ nb-layout-column {
      background-color: #76ecff;
    }
    `,
  ],
  template: `
    <nb-layout>
      <nb-sidebar>
        Left
      </nb-sidebar>

      <nb-sidebar right>
        Right
      </nb-sidebar>
    </nb-layout>
`,
})
export class NbSidebarOneTestComponent {
}
