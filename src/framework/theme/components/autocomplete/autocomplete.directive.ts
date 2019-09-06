/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Directive,
  ElementRef,
  Input,
} from '@angular/core';
import { NbAutocompleteComponent } from './autocomplete.component';

@Directive({
  selector: 'input[nbAutocomplete]',
})
export class NbAutocompleteDirective<T> {

  protected autocomplete: NbAutocompleteComponent<T>;

  /**
   * Provides autocomplete component.
   * */
  @Input('nbAutocomplete')
  set setAutocomplete(autocomplete: NbAutocompleteComponent<T>) {
    this.autocomplete = autocomplete;
    this.setupAutocomplete();
  }

  constructor(protected hostRef: ElementRef) {}

  setupAutocomplete() {
    this.autocomplete.attach(this.hostRef);
  }

}
