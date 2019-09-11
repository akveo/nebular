/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterViewInit,
  Directive,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy,
  QueryList,
} from '@angular/core';
import { NbAutocompleteComponent } from './autocomplete.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NbScrollStrategy } from '../cdk/overlay/mapping';
import {
  NbAdjustableConnectedPositionStrategy, NbAdjustment,
  NbPosition,
  NbPositionBuilderService,
} from '../cdk/overlay/overlay-position';
import { NbTrigger, NbTriggerStrategy, NbTriggerStrategyBuilderService } from '../cdk/overlay/overlay-trigger';
import { NbOverlayService } from '../cdk/overlay/overlay-service';
import { filter, startWith, switchMap, takeWhile, tap } from 'rxjs/operators';
import { NbOptionComponent } from '../select/option.component';
import { merge } from 'rxjs';
import { ENTER, ESCAPE } from '@angular/cdk/keycodes';

@Directive({
  selector: 'input[nbAutocomplete]',
  host: {
    '(input)': '_handleInput($event)',
  },
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NbAutocompleteDirective),
    multi: true,
  }],

})
export class NbAutocompleteDirective<T> implements AfterViewInit, OnDestroy, ControlValueAccessor {

  protected autocomplete: NbAutocompleteComponent<T>;

  protected positionStrategy: NbAdjustableConnectedPositionStrategy;

  /**
   * Current overlay position because of we have to toggle overlayPosition
   * in [ngClass] direction and this directive can use only string.
   */
  protected overlayPosition: NbPosition = '' as NbPosition;

  /**
   * Trigger strategy used by overlay.
   * */
  protected triggerStrategy: NbTriggerStrategy;

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
    protected overlay: NbOverlayService,
    protected triggerStrategyBuilder: NbTriggerStrategyBuilderService,
    protected positionBuilder: NbPositionBuilderService) {}

  ngAfterViewInit() {
    this.triggerStrategy = this.createTriggerStrategy();
    this.subscribeOnTriggers();
  }

  protected subscribeOnOptionClick() {
    /**
     * If the user changes provided options list in the runtime we have to handle this
     * and resubscribe on options selection changes event.
     * Otherwise, the user will not be able to select new options.
     * */
    this.autocomplete.options.changes
      .pipe(
        startWith(this.autocomplete.options),
        switchMap((options: QueryList<NbOptionComponent<T>>) => {
          return merge(...options.map(option => option.click));
        }),
        takeWhile(() => this.autocomplete.alive),
      )
      .subscribe((clickedOption: NbOptionComponent<T>) => this.handleOptionClick(clickedOption));
  }

  protected getActiveItem(): NbOptionComponent<T> {
    return this.autocomplete.keyManager.activeItem;
  }

  protected setupAutocomplete() {
    this.autocomplete.attach(this.hostRef);
  }

  protected _handleInput($event: any) {
    const currentValue = this.hostRef.nativeElement.value;
    this._onChange(currentValue);
    this.hostRef.nativeElement.value = this.getDisplayValue(currentValue);
    this.show();
  }

  protected getDisplayValue(value: string) {
    const displayFn = this.autocomplete.handleDisplayFn;
    return displayFn ? displayFn(value) : value;
  }

  protected handleOptionClick(option: NbOptionComponent<T>) {

    this.setActiveItem();
    this.setHostInputValue(option.value);

    this._onChange(option.value);
    this.hostRef.nativeElement.focus();
    this.autocomplete.emitSelected(option.value);
    this.hide();
  }

  protected subscribeOnTriggers() {

    this.triggerStrategy.show$
      .pipe(filter(() => this.autocomplete.isHidden))
      .subscribe(($event: Event) => {
        this.show();
      });

    this.triggerStrategy.hide$
      .pipe(filter(() => this.autocomplete.isOpen))
      .subscribe(($event: Event) => {
        this.hide();
      });
  }

  protected createTriggerStrategy(): NbTriggerStrategy {
    return this.triggerStrategyBuilder
      .trigger(NbTrigger.CLICK)
      .host(this.hostRef.nativeElement)
      .container(() => this.autocomplete.getContainer())
      .build();
  }

  show() {
    if (this.autocomplete.isHidden) {
      this.attachToOverlay();
    }
  }

  hide() {
    if (this.autocomplete.isOpen) {
      this.autocomplete.ref.detach();
      this.setActiveItem();
    }
  }

  protected setHostInputValue(value) {
    this.hostRef.nativeElement.value = this.getDisplayValue(value);
  }

  protected subscribeOnOverlayKeys(): void {
    this.autocomplete.ref.keydownEvents()
      .pipe(
        takeWhile(() => this.autocomplete.alive),
        filter(() => this.autocomplete.isOpen),
      )
      .subscribe((event: KeyboardEvent) => {
        if (event.keyCode === ESCAPE) {
          this.hostRef.nativeElement.focus();
          this.hide();

        } else if (event.keyCode === ENTER) {
          const activeItem = this.getActiveItem();
          if (!activeItem) {
            return;
          }
          this._onChange(activeItem.value);
          this.setHostInputValue(activeItem.value);
          this.autocomplete.emitSelected(activeItem.value);
          this.setActiveItem();
          this.hide();

        } else {
          this.autocomplete.keyManager.onKeydown(event);
        }
      });

    this.autocomplete.keyManager.tabOut
      .pipe(takeWhile(() => this.autocomplete.alive))
      .subscribe(() => {
        this.hide();
      });
  }

  protected setActiveItem() {
    this.autocomplete.keyManager.setActiveItem(-1);
  }

  protected attachToOverlay() {
    if (!this.autocomplete.ref) {
      this.autocomplete.createKeyManager();
      this.subscribeOnOptionClick();
      this.createOverlay();
      this.subscribeOnPositionChange();
      this.subscribeOnOverlayKeys();
    }

    this.autocomplete.ref.attach(this.autocomplete.portal);
  }

  protected subscribeOnPositionChange() {
    this.positionStrategy.positionChange
      .pipe(takeWhile(() => this.autocomplete.alive))
      .subscribe((position: NbPosition) => {
        this.overlayPosition = position;
      });
  }

  protected createOverlay() {
    const scrollStrategy = this.createScrollStrategy();
    this.positionStrategy = this.createPositionStrategy();
    this.autocomplete.ref = this.overlay.create({ positionStrategy: this.positionStrategy, scrollStrategy });
  }

  protected createScrollStrategy(): NbScrollStrategy {
    return this.overlay.scrollStrategies.block();
  }

  protected createPositionStrategy(): NbAdjustableConnectedPositionStrategy {
    return this.positionBuilder
      .connectedTo(this.hostRef)
      .position(NbPosition.BOTTOM)
      .offset(0)
      .adjustment(NbAdjustment.VERTICAL);
  }

  // Part of ControlValueAccessor.
  _onChange: (value: any) => void = () => {};

  // Part of ControlValueAccessor.
  _onTouched = () => {};

  // Part of ControlValueAccessor.
  writeValue(value: any): void {
    this._onChange(value);
  }

  // Part of ControlValueAccessor.
  registerOnChange(fn: (value: any) => {}): void {
    this._onChange = fn;
  }

  // Part of ControlValueAccessor.
  registerOnTouched(fn: () => {}) {
    this._onTouched = fn;
  }

  ngOnDestroy() {
    if (this.triggerStrategy) {
      this.triggerStrategy.destroy();
    }
  }

}
