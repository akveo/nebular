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
  HostBinding,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { NbOverlayRef, NbPortalDirective } from '../cdk/overlay/mapping';
import { NbOptionComponent } from '../select/option.component';
import { NbActiveDescendantKeyManager } from '../cdk/a11y/descendant-key-manager';
import { NbComponentSize } from '../component-size';
import { takeWhile } from 'rxjs/operators';
import {
  NbAdjustableConnectedPositionStrategy,
  NbAdjustment,
  NbPosition,
  NbPositionBuilderService,
} from '../cdk/overlay/overlay-position';

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

  alive: boolean = true;

  /**
   * Determines is autocomplete overlay list hidden.
   * */
  get isClosed(): boolean {
    return !this.isOpen;
  }

  /**
   * Determines is select opened.
   * */
  get isOpen(): boolean {
    return this.ref && this.ref.hasAttached();
  }

  ref: NbOverlayRef;

  positionStrategy: NbAdjustableConnectedPositionStrategy;

  /**
   * Current overlay position because of we have to toggle overlayPosition
   * in [ngClass] direction and this directive can use only string.
   */
  protected overlayPosition: NbPosition = '' as NbPosition;

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

  constructor(
    protected positionBuilder: NbPositionBuilderService) {}

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
    this.positionStrategy = this.createPositionStrategy();
    this.subscribeOnPositionChange();
  }

  protected createPositionStrategy(): NbAdjustableConnectedPositionStrategy {
    return this.positionBuilder
      .connectedTo(this.hostRef)
      .position(NbPosition.BOTTOM)
      .offset(0)
      .adjustment(NbAdjustment.VERTICAL);
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

  protected subscribeOnPositionChange() {
    this.positionStrategy.positionChange
      .pipe(takeWhile(() => this.alive))
      .subscribe((position: NbPosition) => {
        this.overlayPosition = position;
      });
  }

  ngOnDestroy() {
    this.alive = false;

    if (this.ref) {
      this.ref.dispose();
    }
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
