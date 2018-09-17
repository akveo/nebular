/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { convertToBoolProperty } from '../helpers';


@Component({
  selector: 'nb-option-group',
  styleUrls: ['./option-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span>{{ title }}</span>
    <ng-content select="nb-option, ng-container"></ng-content>
  `,
})
export class NbOptionGroupComponent {
  @Input() title: string;

  @Input('disabled')
  set setDisabled(disabled: boolean) {
    this.disabled = convertToBoolProperty(disabled);
  }

  disabled: boolean = false;

  @HostBinding('class.disabled')
  get disabledClass(): boolean {
    return this.disabled;
  }
}


