/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbDynamicToAddComponent } from '../layout-test/theme-dynamic-test.component';

@Component({
  selector: 'nb-popover-test',
  template: `
    <nb-layout>
      <nb-layout-column>

        <nb-card>
          <nb-card-header>Content Type</nb-card-header>
          <nb-card-body>
            <button class="btn btn-info" [nbPopover]="popoverTemplate" nbPopoverPlacement="right">Template Ref Test
            </button>
            <ng-template #popoverTemplate>
              <nb-card [style.margin.px]="0" [style.boxShadow]="'none'">
                <nb-card-body>
                  <label class="form-control-label" for="success-form-control">Success Form Control</label>
                  <input class="form-control form-control-success" id="success-form-control"
                         placeholder="Success Form Control">
                  <span class="form-control-feedback">Help text</span>
                </nb-card-body>
              </nb-card>
            </ng-template>

            <button class="btn btn-warning" [nbPopover]="customPopoverComponent">
              Component Test
            </button>

            <button class="btn btn-primary" nbPopover="Hi, I'm popover!" nbPopoverPlacement="bottom">String Test
            </button>

            <button class="btn btn-primary" [nbPopover]="125123" nbPopoverPlacement="bottom">Number Test
            </button>

            <button class="btn btn-primary" [nbPopover]="{ isAdmin: false }" nbPopoverPlacement="bottom">Object Test
            </button>

            <button class="btn btn-primary" [nbPopover]="['Test', 'Array']" nbPopoverPlacement="bottom">Array
              Test
            </button>
          </nb-card-body>
        </nb-card>

        <nb-card>
          <nb-card-header>Placement</nb-card-header>
          <nb-card-body>
            <button class="btn btn-outline-secondary" nbPopover="Right Popover!" nbPopoverPlacement="right">
              Right
            </button>
            <button class="btn btn-outline-secondary" nbPopover="Bottom Popover!" nbPopoverPlacement="bottom">
              Bottom
            </button>
            <button class="btn btn-outline-secondary" nbPopover="Top Popover!" nbPopoverPlacement="top">
              Top
            </button>
            <button class="btn btn-outline-secondary" nbPopover="Left Popover!" nbPopoverPlacement="left">
              Left
            </button>
          </nb-card-body>
        </nb-card>

        <nb-card>
          <nb-card-header>Trigger mode</nb-card-header>
          <nb-card-body>
            <button class="btn btn-outline-secondary" nbPopover="Click Popover!">
              Click
            </button>
            <button class="btn btn-outline-secondary" nbPopover="Hover Popover!" nbPopoverMode="hover">
              Hover
            </button>
          </nb-card-body>
        </nb-card>

      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbPopoverTestComponent {

  customPopoverComponent = NbDynamicToAddComponent;

  menuItems = [
    {
      title: 'Menu #1',
      link: '/menu/1',
      icon: 'nb-keypad',
    },
    {
      title: 'Menu #2',
      link: '/menu/2',
      icon: 'nb-keypad',
    },
    {
      title: 'Menu #3',
      link: '/menu/3',
      icon: 'nb-keypad',
    },
  ];
}
