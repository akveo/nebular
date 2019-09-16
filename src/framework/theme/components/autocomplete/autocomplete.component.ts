/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { NbPortalDirective } from '../cdk/overlay/mapping';
import { NbOptionComponent } from '../select/option.component';
import { NbComponentSize } from '../component-size';
import { NbPosition } from '../cdk/overlay/overlay-position';
import { Subject } from 'rxjs';

@Component({
  selector: 'nb-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAutocompleteComponent<T> implements OnDestroy {

  @ViewChild(NbPortalDirective, { static: false }) portal: NbPortalDirective;

  /**
   * Function passed as input to process each string option value before render.
   * */
  @Input() handleDisplayFn: ((value: any) => string);

  /**
   * Autocomplete size, available sizes:
   * `tiny`, `small`, `medium` (default), `large`, `giant`
   */
  @Input() size: NbComponentSize = 'medium';

  /**
   * Flag passed as input to always make first option active.
   * */
  @Input() activeFirst: boolean = false;

  /**
   * Will be emitted when selected value changes.
   * */
  @Output() selectedChange: EventEmitter<T> = new EventEmitter();

  destroy$: Subject<boolean> = new Subject<boolean>();

  /**
   * HTML input reference to which autocomplete connected.
   * */
  hostRef: ElementRef;

  /**
   * Current overlay position because of we have to toggle overlayPosition
   * in [ngClass] direction and this directive can use only string.
   */
  overlayPosition: NbPosition = '' as NbPosition;

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

  /**
   * Autocomplete knows nothing about host html input element.
   * So, attach method set input hostRef for styling.
   * */
  setHost(hostRef: ElementRef) {
    this.hostRef = hostRef;
  }

  /**
   * Propagate selected value.
   * */
  emitSelected(selected: T) {
    this.selectedChange.emit(selected);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  get optionsListClasses(): string[] {
    const classes = [
      `size-${this.size}`,
      this.overlayPosition,
    ];

    return classes;
  }

  @HostBinding('class.size-tiny')
  get tiny(): boolean {
    return this.size === 'tiny';
  }
  @HostBinding('class.size-small')
  get small(): boolean {
    return this.size === 'small';
  }
  @HostBinding('class.size-medium')
  get medium(): boolean {
    return this.size === 'medium';
  }
  @HostBinding('class.size-large')
  get large(): boolean {
    return this.size === 'large';
  }
  @HostBinding('class.size-giant')
  get giant(): boolean {
    return this.size === 'giant';
  }

}
