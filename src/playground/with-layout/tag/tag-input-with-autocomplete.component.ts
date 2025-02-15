/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { NbTagComponent, NbTagInputDirective } from '@nebular/theme';

import { trees } from './trees-list';

@Component({
    templateUrl: './tag-input-with-autocomplete.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TagInputWithAutocompleteComponent {

  tags: Set<string> = new Set<string>();
  options: string[] = trees;

  @ViewChild(NbTagInputDirective, { read: ElementRef }) tagInput: ElementRef<HTMLInputElement>;

  onTagRemove(tagToRemove: NbTagComponent): void {
    this.tags.delete(tagToRemove.text);
    this.options.push(tagToRemove.text);
  }

  onTagAdd(value: string): void {
    if (value) {
      this.tags.add(value);
      this.options = this.options.filter(o => o !== value);
    }
    this.tagInput.nativeElement.value = '';
  }
}
