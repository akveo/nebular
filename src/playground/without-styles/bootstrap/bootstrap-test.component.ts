/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { NbThemeService } from '@nebular/theme';

import 'style-loader!./styles.scss';

@Component({
  selector: 'nb-bootstrap-test',
  styles: [
    `
    button {
      margin-right: 1rem;
    }

    .input-group {
      margin-bottom: 1rem;
    }
    `,
  ],
  templateUrl: './bootstrap-test.component.html',
})
export class BootstrapTestComponent implements OnInit {

  constructor(
    private themeService: NbThemeService,
    private modalService: NgbModal,
  ) {}

  ngOnInit() {
    this.themeService.changeTheme('default');
  }

  openModal(content) {
    this.modalService.open(content);
  }
}
