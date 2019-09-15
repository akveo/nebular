/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  OnDestroy,
  QueryList,
} from '@angular/core';
import { NbAutocompleteComponent } from './autocomplete.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NbScrollStrategy } from '../cdk/overlay/mapping';
import { NbTrigger, NbTriggerStrategy, NbTriggerStrategyBuilderService } from '../cdk/overlay/overlay-trigger';
import { NbOverlayService } from '../cdk/overlay/overlay-service';
import { filter, startWith, switchMap, takeWhile, tap } from 'rxjs/operators';
import { NbOptionComponent } from '../select/option.component';
import { merge } from 'rxjs';
import { DOWN_ARROW, ENTER, ESCAPE, UP_ARROW  } from '../cdk/keycodes/keycodes';

@Directive({
  selector: 'input[nbAutocomplete]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NbAutocompleteDirective),
    multi: true,
  }],

})
export class NbAutocompleteDirective<T> implements AfterViewInit, OnDestroy, ControlValueAccessor {

  protected autocomplete: NbAutocompleteComponent<T>;

  protected isOpenedAfterFocus: boolean = false;

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
    protected cd: ChangeDetectorRef,
    protected triggerStrategyBuilder: NbTriggerStrategyBuilderService) {}

  ngAfterViewInit() {
    this.triggerStrategy = this.createTriggerStrategy();
    this.subscribeOnTriggers();
  }

  @HostListener('input')
  protected handleInput() {
    const currentValue = this.hostRef.nativeElement.value;
    this._onChange(currentValue);
    this.hostRef.nativeElement.value = this.getDisplayValue(currentValue);
    this.show();
  }

  @HostListener('keydown', ['$event'])
  protected handleKeydown($event: any) {
    if ($event.keyCode === DOWN_ARROW || $event.keyCode === UP_ARROW) {
      this.autocomplete.isClosed && this.show();
    }
  }

  @HostListener('blur')
  protected handleBlur($event: Event) {
    this.isOpenedAfterFocus = false;
  }

  @HostListener('focus')
  protected handleFocus() {
    this.autocomplete.isClosed && this.show();
    this.isOpenedAfterFocus = true;
  }

  protected subscribeOnOptionClick() {
    /**
     * If the user changes provided options list in the runtime we have to handle this
     * and resubscribe on options selection changes event.
     * Otherwise, the user will not be able to select new options.
     * */
    this.autocomplete.options.changes
      .pipe(
        tap(() => this.setActiveItem()),
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

  protected getDisplayValue(value: string) {
    const displayFn = this.autocomplete.handleDisplayFn;
    return displayFn ? displayFn(value) : value;
  }

  protected handleOptionClick(option: NbOptionComponent<T>) {

    this.setHostInputValue(option.value);
    this._onChange(option.value);

    this.hostRef.nativeElement.focus();
    this.autocomplete.emitSelected(option.value);
    this.hide();
  }

  protected subscribeOnTriggers() {

    this.triggerStrategy.show$
      .pipe(filter(() => this.autocomplete.isClosed && !this.isOpenedAfterFocus))
      .subscribe(($event: Event) => {
        this.show();
        this.isOpenedAfterFocus = false;
      });

    this.triggerStrategy.hide$
      .pipe(filter(() => this.autocomplete.isOpen && !this.isOpenedAfterFocus))
      .subscribe(($event: Event) => {
        this.hide();
        this.isOpenedAfterFocus = false;
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
    if (this.autocomplete.isClosed) {
      this.attachToOverlay();
      this.setActiveItem();
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
      )
      .subscribe((event: KeyboardEvent) => {
        if (event.keyCode === ESCAPE && this.autocomplete.isOpen) {
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
    this.autocomplete.keyManager.setActiveItem(this.autocomplete.activeFirst ? 0 : -1);
    this.cd.detectChanges();
  }

  protected attachToOverlay() {
    if (!this.autocomplete.ref) {
      this.autocomplete.createKeyManager();
      this.subscribeOnOptionClick();
      this.createOverlay();
      this.subscribeOnOverlayKeys();
    }

    this.autocomplete.ref.attach(this.autocomplete.portal);
  }

  protected createOverlay() {
    const scrollStrategy = this.createScrollStrategy();
    this.autocomplete.ref = this.overlay.create(
      { positionStrategy: this.autocomplete.positionStrategy, scrollStrategy });
  }

  protected createScrollStrategy(): NbScrollStrategy {
    return this.overlay.scrollStrategies.block();
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
