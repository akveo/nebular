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
          <nb-card-header>Multiple Hints</nb-card-header>
          <nb-card-body>
            <button class="btn btn-outline-secondary" nbPopover="Right Popover!" nbPopoverMode="hint">
              show hint
            </button>
            <button class="btn btn-outline-secondary" nbPopover="Bottom Popover!" nbPopoverMode="hint">
              show hint
            </button>
            <button class="btn btn-outline-secondary" nbPopover="Top Popover!" nbPopoverMode="hint">
              show hint
            </button>
            <button class="btn btn-outline-secondary" nbPopover="Left Popover!" nbPopoverMode="hint">
              show hint
            </button>
            <button class="btn btn-outline-secondary" nbPopover="Right Popover!" nbPopoverMode="hint">
              show hint
            </button>
            <button class="btn btn-outline-secondary" nbPopover="Bottom Popover!" nbPopoverMode="hint">
              show hint
            </button>
            <button class="btn btn-outline-secondary" nbPopover="Top Popover!" nbPopoverMode="hint">
              show hint
            </button>
            <button class="btn btn-outline-secondary" nbPopover="Left Popover!" nbPopoverMode="hint">
              show hint
            </button>
            <button class="btn btn-outline-secondary" nbPopover="Right Popover!" nbPopoverMode="hint">
              show hint
            </button>
            <button class="btn btn-outline-secondary" nbPopover="Bottom Popover!" nbPopoverMode="hint">
              show hint
            </button>
            <button class="btn btn-outline-secondary" nbPopover="Top Popover!" nbPopoverMode="hint">
              show hint
            </button>
            <button class="btn btn-outline-secondary" nbPopover="Left Popover!" nbPopoverMode="hint">
              show hint
            </button>
            <button class="btn btn-outline-secondary" nbPopover="Right Popover!" nbPopoverMode="hint">
              show hint
            </button>
            <button class="btn btn-outline-secondary" nbPopover="Bottom Popover!" nbPopoverMode="hint">
              show hint
            </button>
            <button class="btn btn-outline-secondary" nbPopover="Top Popover!" nbPopoverMode="hint">
              show hint
            </button>
            <button class="btn btn-outline-secondary" nbPopover="Left Popover!" nbPopoverMode="hint">
              show hint
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
            <button class="btn btn-outline-secondary" nbPopover="Hint Popover!" nbPopoverMode="hint">
              HInt
            </button>
          </nb-card-body>
        </nb-card>

        <nb-card>
          <nb-card-header>Popover</nb-card-header>
          <nb-card-body>
            <button class="btn btn-outline-success" nbPopover="Click Popover!">
              Show me popover
            </button>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbPopoverTestComponent {

  customPopoverComponent = NbDynamicToAddComponent;
}
