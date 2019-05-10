/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DynamicToAddComponent } from './components/dynamic.components';

@Component({
  selector: 'nb-popover-example',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nb-card>
      <nb-card-header>Content Type</nb-card-header>
      <nb-card-body>
        <button [nbPopover]="popoverTemplate"
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
        <button nbPopover="Right Popover!" nbPopoverPlacement="right">
          Right
        </button>
        <button nbPopover="Bottom Popover!" nbPopoverPlacement="bottom">
          Bottom
        </button>
        <button nbPopover="Top Popover!" nbPopoverPlacement="top">
          Top
        </button>
        <button nbPopover="Left Popover!" nbPopoverPlacement="left">
          Left
        </button>
        <button nbPopover="Start Popover!" nbPopoverPlacement="start">
          Start
        </button>
        <button nbPopover="End Popover!" nbPopoverPlacement="end">
          End
        </button>
      </nb-card-body>
    </nb-card>
    <nb-card>
      <nb-card-header>Multiple Hints</nb-card-header>
      <nb-card-body>
        <button nbPopover="Right Popover!" nbPopoverTrigger="hint">
          show hint
        </button>
        <button nbPopover="Bottom Popover!" nbPopoverTrigger="hint">
          show hint
        </button>
        <button nbPopover="Top Popover!" nbPopoverTrigger="hint">
          show hint
        </button>
        <button nbPopover="Left Popover!" nbPopoverTrigger="hint">
          show hint
        </button>
        <button nbPopover="Right Popover!" nbPopoverTrigger="hint">
          show hint
        </button>
        <button nbPopover="Bottom Popover!" nbPopoverTrigger="hint">
          show hint
        </button>
        <button nbPopover="Top Popover!" nbPopoverTrigger="hint">
          show hint
        </button>
        <button nbPopover="Left Popover!" nbPopoverTrigger="hint">
          show hint
        </button>
        <button nbPopover="Right Popover!" nbPopoverTrigger="hint">
          show hint
        </button>
        <button nbPopover="Bottom Popover!" nbPopoverTrigger="hint">
          show hint
        </button>
        <button nbPopover="Top Popover!" nbPopoverTrigger="hint">
          show hint
        </button>
        <button nbPopover="Left Popover!" nbPopoverTrigger="hint">
          show hint
        </button>
        <button nbPopover="Right Popover!" nbPopoverTrigger="hint">
          show hint
        </button>
        <button nbPopover="Bottom Popover!" nbPopoverTrigger="hint">
          show hint
        </button>
        <button nbPopover="Top Popover!" nbPopoverTrigger="hint">
          show hint
        </button>
        <button nbPopover="Left Popover!" nbPopoverTrigger="hint">
          show hint
        </button>
      </nb-card-body>
    </nb-card>
    <nb-card>
      <nb-card-header>Trigger mode</nb-card-header>
      <nb-card-body>
        <button nbPopover="Click Popover!">
          Click
        </button>
        <button nbPopover="Hover Popover!" nbPopoverTrigger="hover">
          Hover
        </button>
        <button nbPopover="Hint Popover!" nbPopoverTrigger="hint">
          HInt
        </button>
      </nb-card-body>
    </nb-card>
    <nb-card>
      <nb-card-header>Popover</nb-card-header>
      <nb-card-body>
        <button nbPopover="Click Popover!">
          Show me popover
        </button>
      </nb-card-body>
    </nb-card>
  `,
})
export class PopoverTestComponent {

  customPopoverComponent = DynamicToAddComponent;

  items = [{ title: 'Profile', link: '/card' }, { title: 'Log out', link: '/auth' }];
}
