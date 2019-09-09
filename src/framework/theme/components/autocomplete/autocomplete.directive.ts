/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Directive,
  ElementRef, Host,
  Input, Optional,
} from '@angular/core';
import { NbAutocompleteComponent } from './autocomplete.component';
import { FormControl, NgControl } from '@angular/forms';

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

  constructor(
      protected hostRef: ElementRef,
      @Host() @Optional() protected ngControl: NgControl) {}

  setupAutocomplete() {
    const formInputControl: FormControl = this.ngControl ? <FormControl>this.ngControl.control : null;
    this.autocomplete.attach(this.hostRef, formInputControl);
  }

}
