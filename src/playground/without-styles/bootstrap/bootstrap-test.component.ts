/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'npg-bootstrap-test',
  templateUrl: './bootstrap-test.component.html',
  styleUrls: ['./bootstrap-test.component.scss', './styles.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BootstrapTestComponent implements OnInit {
  constructor(private themeService: NbThemeService, private modalService: NgbModal) {}

  ngOnInit() {
    this.themeService.changeTheme('default');
  }

  openModal(content) {
    this.modalService.open(content);
  }
}
