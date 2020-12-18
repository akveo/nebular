/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  QueryList,
  ViewChild,
  AfterContentInit,
  OnDestroy,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NbComponentSize } from '../component-size';
import { NbPosition } from '../cdk/overlay/overlay-position';
import { NbOptionComponent } from '../option/option.component';
import { NbPortalDirective } from '../cdk/overlay/mapping';

// Component class scoped counter for aria attributes.
let lastAutocompleteId: number = 0;

/**
 * The `NbAutocompleteComponent` overlay component.
 * Provides an `NbOptionList` overlay component.
 * */
@Component({
  selector: 'nb-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbAutocompleteComponent<T> implements AfterContentInit, OnDestroy {

  protected destroy$: Subject<void> = new Subject<void>();

  /**
   * HTML input reference to which autocomplete connected.
   * */
  hostRef: ElementRef;

  /**
   * Component scoped id for aria attributes.
   * */
  id: string = `nb-autocomplete-${lastAutocompleteId++}`;


  /**
   * @docs-private
   * Current overlay position because of we have to toggle overlayPosition
   * in [ngClass] direction.
   */
  _overlayPosition: NbPosition = '' as NbPosition;

  get overlayPosition(): NbPosition {
    return this._overlayPosition;
  }

  set overlayPosition(value: NbPosition) {
    this._overlayPosition = value;
    // Need run change detection after first set from NbAutocompleteDirective
    this.cd.detectChanges();
  }

  /**
   * Returns width of the input.
   * */
  get hostWidth(): number {
    return this.hostRef.nativeElement.getBoundingClientRect().width;
  }

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
   * Specifies class to be set on `nb-option`s container (`nb-option-list`)
   * */
  @Input() optionsListClass: NgClass['ngClass'];

  /**
   * Specifies class for the overlay panel with options
   * */
  @Input() optionsPanelClass: string | string[];

  /**
   * Will be emitted when selected value changes.
   * */
  @Output() selectedChange: EventEmitter<T> = new EventEmitter();

  /**
    * List of `NbOptionComponent`'s components passed as content.
  * */
  @ContentChildren(NbOptionComponent, { descendants: true }) options: QueryList<NbOptionComponent<T>>;

  /**
   * NbOptionList with options content.
   * */
  @ViewChild(NbPortalDirective) portal: NbPortalDirective;

  constructor(protected cd: ChangeDetectorRef) {}

  ngAfterContentInit() {
    this.options.changes
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.cd.detectChanges());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
