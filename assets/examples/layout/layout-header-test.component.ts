import { Component } from '@angular/core';

@Component({
  selector: 'nb-layout-header-test',
  template: `
    <nb-layout>
      <nb-layout-header fixed>
        <a class="navbar-brand" href="#">ngx-admin</a>
      </nb-layout-header>
    </nb-layout>
`,
})
export class NbLayoutHeaderTestComponent {
}
