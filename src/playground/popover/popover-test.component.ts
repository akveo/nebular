/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbDynamicToAddComponent } from '../shared/dynamic.component';

@Component({
  selector: 'nb-popover-example',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nb-card>
      <nb-card-header>Content Type</nb-card-header>
      <nb-card-body>
        <button class="btn btn-info" [nbPopover]="popoverTemplate"
                [nbPopoverContext]="{text: 'Example context'}"
                nbPopoverPlacement="right">
          Template Ref Test
        </button>
        <ng-template #popoverTemplate let-text="text">
          <nb-card [style.margin.px]="0" [style.boxShadow]="'none'">
            <nb-card-body>
              <label class="form-control-label" for="success-form-control">{{text}}</label>
              <input class="form-control form-control-success" id="success-form-control"
                     placeholder="Success Form Control">
              <span class="form-control-feedback">Help text</span>
            </nb-card-body>
          </nb-card>
        </ng-template>
        <button class="btn btn-warning" [nbPopover]="customPopoverComponent"
                [nbPopoverContext]="{text: 'Example context'}">
          Component with context test
        </button>
        <button class="btn btn-warning" [nbPopover]="popoverTemplateWithContext"
                [nbPopoverContext]="{text: 'Example context'}">
          Template with context test
        </button>
        <ng-template #popoverTemplateWithContext let-text="text">
          <nb-dynamic-to-add [text]="text"></nb-dynamic-to-add>
        </ng-template>
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
        <button class="btn btn-outline-secondary" nbPopover="Start Popover!" nbPopoverPlacement="start">
          Start
        </button>
        <button class="btn btn-outline-secondary" nbPopover="End Popover!" nbPopoverPlacement="end">
          End
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
  `,
})
export class NbPopoverTestComponent {

  customPopoverComponent = NbDynamicToAddComponent;

  items = [{ title: 'Profile', link: '/card' }, { title: 'Log out', link: '/auth' }];
}
