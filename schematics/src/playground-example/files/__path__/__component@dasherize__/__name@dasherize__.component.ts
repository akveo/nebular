/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: '<%= selector %>',
  templateUrl: './<%= dasherize(name) %>.component.html',
  styles: [`
    :host {
      color: red;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class <%= classify(className) %>Component {
}
