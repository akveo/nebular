/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ContentChildren,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { NbOverlayRef, NbPortalDirective } from '../cdk/overlay/mapping';
import { NbOptionComponent } from '../select/option.component';
import { NbActiveDescendantKeyManager } from '../cdk/a11y/descendant-key-manager';

@Component({
  selector: 'nb-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAutocompleteComponent<T> implements OnDestroy {

  @ViewChild(NbPortalDirective, { static: false }) portal: NbPortalDirective;

  alive: boolean = true;

  /**
   * Determines is autocomplete overlay list hidden.
   * */
  get isHidden(): boolean {
    return !this.isOpen;
  }

  /**
   * Determines is select opened.
   * */
  get isOpen(): boolean {
    return this.ref && this.ref.hasAttached();
  }

  ref: NbOverlayRef;

  keyManager: NbActiveDescendantKeyManager<NbOptionComponent<T>>;

  /**
   * Will be emitted when selected value changes.
   * */
  @Output() selectedChange: EventEmitter<T> = new EventEmitter();

  /**
   * HTML input reference to which autocomplete connected.
   * */
  hostRef: ElementRef;

  /**
    * List of `NbOptionComponent`'s components passed as content.
  * */
  @ContentChildren(NbOptionComponent, { descendants: true }) options: QueryList<NbOptionComponent<T>>;

  constructor() {}

  /**
   * Returns width of the input.
   * */
  get hostWidth(): number {
    return this.hostRef.nativeElement.getBoundingClientRect().width;
  }

  createKeyManager(): void {
    this.keyManager = new NbActiveDescendantKeyManager<NbOptionComponent<T>>(this.options).withWrap();
  }

  /**
   * Autocomplete knows nothing about host html input element.
   * So, attach method attaches autocomplete to the host input element.
   * */
  attach(hostRef: ElementRef) {
    this.hostRef = hostRef;
  }

  /**
   * Propagate selected value.
   * */
  emitSelected(selected: T) {
    this.selectedChange.emit(selected);
  }

  getContainer() {
    return this.ref && this.ref.hasAttached() && <ComponentRef<any>> {
      location: {
        nativeElement: this.ref.overlayElement,
      },
    };
  }

  ngOnDestroy() {
    this.alive = false;

    if (this.ref) {
      this.ref.dispose();
    }
  }
}
