/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnInit } from '@angular/core';

import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'nb-sidebar-test',
  styles: [
    `
    :host /deep/ nb-layout-column {
      background-color: #76ecff;
    }
    `,
  ],
  template: `
    <nb-layout>
      <nb-layout-header fixed>
        <a href="#" class="navbar-brand">Akveo</a>

        <button id="collapse-start" (click)="collapseLeft()">Collapse Start</button>
        <button id="collapse-end" (click)="collapseRight()">Collapse End</button>
      </nb-layout-header>

      <nb-sidebar state="collapsed" fixed tag="start">
      </nb-sidebar>

      <nb-sidebar end state="compacted" tag="end">
        <nb-sidebar-header>Some Header</nb-sidebar-header>
        {{ content }}
      </nb-sidebar>

      <nb-layout-column left>
       {{ content }}
      </nb-layout-column>
      <nb-layout-column>
       {{ content }}
      </nb-layout-column>
      <nb-layout-column>
       {{ content }}
      </nb-layout-column>


      <nb-layout-footer fixed>
        &copy; Akveo 2017
      </nb-layout-footer>
    </nb-layout>
`,
})
export class NbSidebarTestComponent implements OnInit {

  content = 'First ';

  constructor(private sidebarService: NbSidebarService) { }

  collapseLeft() {
    this.sidebarService.toggle(false, 'start');
  }

  collapseRight() {
    this.sidebarService.toggle(true, 'end');
  }

  ngOnInit() {

    for (let i = 0; i < 1000; i++) {
      this.content += 'Akveo ';
    }
    this.content += ' Last';
  }
}
