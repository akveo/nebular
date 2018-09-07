/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'nb-select-showcase',
  template: `
    <nb-select placeholder="Multiple" multiple shape="round">
      <nb-option>None</nb-option>
      <nb-option-group title="Group 1">
        <nb-option value="Option 1">Option 1</nb-option>
        <nb-option value="Option 2" disabled>Option 2</nb-option>
        <nb-option value="Option 3">Option 3</nb-option>
      </nb-option-group>
      <nb-option-group title="Group 2" disabled>
        <nb-option value="Option 21">Option 21</nb-option>
        <nb-option value="Option 22">Option 22</nb-option>
        <nb-option value="Option 23">Option 23</nb-option>
      </nb-option-group>
      <nb-option-group title="Group 3">
        <nb-option value="Option 31">Option 31</nb-option>
        <nb-option value="Option 32">Option 32</nb-option>
        <nb-option value="Option 33">Option 33</nb-option>
      </nb-option-group>
    </nb-select>

    <nb-select placeholder="Single" status="primary" [(selected)]="selectedValues">
      <nb-option>None</nb-option>
      <nb-option-group title="Group 1">
        <nb-option value="Option 1">Option 1</nb-option>
        <nb-option value="Option 2" disabled>Option 2</nb-option>
        <nb-option value="Option 3">Option 3</nb-option>
      </nb-option-group>
      <nb-option-group title="Group 2" disabled>
        <nb-option value="Option 21">Option 21</nb-option>
        <nb-option value="Option 22">Option 22</nb-option>
        <nb-option value="Option 23">Option 23</nb-option>
      </nb-option-group>
      <nb-option-group title="Group 3">
        <nb-option value="Option 31">Option 31</nb-option>
        <nb-option value="Option 32">Option 32</nb-option>
        <nb-option value="Option 33">Option 33</nb-option>
      </nb-option-group>
    </nb-select>
    <nb-select placeholder="Single" status="info">
      <nb-option>None</nb-option>
      <nb-option-group title="Group 1">
        <nb-option value="Option 1">Option 1</nb-option>
        <nb-option value="Option 2">Option 2</nb-option>
        <nb-option value="Option 3">Option 3</nb-option>
      </nb-option-group>
      <nb-option-group title="Group 2">
        <nb-option value="Option 21">Option 21</nb-option>
        <nb-option value="Option 22">Option 22</nb-option>
        <nb-option value="Option 23">Option 23</nb-option>
      </nb-option-group>
      <nb-option-group title="Group 3">
        <nb-option value="Option 31">Option 31</nb-option>
        <nb-option value="Option 32">Option 32</nb-option>
        <nb-option value="Option 33">Option 33</nb-option>
      </nb-option-group>
    </nb-select>
    <nb-select placeholder="Single" shape="round" status="danger">
      <nb-option>None</nb-option>
      <nb-option-group title="Group 1">
        <nb-option value="Option 1">Option 1</nb-option>
        <nb-option value="Option 2">Option 2</nb-option>
        <nb-option value="Option 3">Option 3</nb-option>
      </nb-option-group>
      <nb-option-group title="Group 2">
        <nb-option value="Option 21">Option 21</nb-option>
        <nb-option value="Option 22">Option 22</nb-option>
        <nb-option value="Option 23">Option 23</nb-option>
      </nb-option-group>
      <nb-option-group title="Group 3">
        <nb-option value="Option 31">Option 31</nb-option>
        <nb-option value="Option 32">Option 32</nb-option>
        <nb-option value="Option 33">Option 33</nb-option>
      </nb-option-group>
    </nb-select>
    <nb-select placeholder="Single" status="success">
      <nb-option>None</nb-option>
      <nb-option-group title="Group 1">
        <nb-option value="Option 1">Option 1</nb-option>
        <nb-option value="Option 2">Option 2</nb-option>
        <nb-option value="Option 3">Option 3</nb-option>
      </nb-option-group>
      <nb-option-group title="Group 2">
        <nb-option value="Option 21">Option 21</nb-option>
        <nb-option value="Option 22">Option 22</nb-option>
        <nb-option value="Option 23">Option 23</nb-option>
      </nb-option-group>
      <nb-option-group title="Group 3">
        <nb-option value="Option 31">Option 31</nb-option>
        <nb-option value="Option 32">Option 32</nb-option>
        <nb-option value="Option 33">Option 33</nb-option>
      </nb-option-group>
    </nb-select>


    <nb-select placeholder="Single" status="warning">
      <nb-option>None</nb-option>
      <nb-option-group title="Group 1">
        <nb-option value="Option 1">Option 1</nb-option>
        <nb-option value="Option 2">Option 2</nb-option>
        <nb-option value="Option 3">Option 3</nb-option>
      </nb-option-group>
      <nb-option-group title="Group 2">
        <nb-option value="Option 21">Option 21</nb-option>
        <nb-option value="Option 22">Option 22</nb-option>
        <nb-option value="Option 23">Option 23</nb-option>
      </nb-option-group>
      <nb-option-group title="Group 3">
        <nb-option value="Option 31">Option 31</nb-option>
        <nb-option value="Option 32">Option 32</nb-option>
        <nb-option value="Option 33">Option 33</nb-option>
      </nb-option-group>
    </nb-select>
  `,
  styles: [`
    :host {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 15rem;
    }
  `],
})

export class NbSelectShowcaseComponent {
  selectedValues = 'Option 2';
}
