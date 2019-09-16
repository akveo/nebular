/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectorRef,
  ComponentRef,
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
import { NbOverlayRef, NbScrollStrategy } from '../cdk/overlay/mapping';
import { NbTrigger, NbTriggerStrategy, NbTriggerStrategyBuilderService } from '../cdk/overlay/overlay-trigger';
import { NbOverlayService } from '../cdk/overlay/overlay-service';
import { filter, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { NbOptionComponent } from '../select/option.component';
import { merge } from 'rxjs';
import { DOWN_ARROW, ENTER, ESCAPE, UP_ARROW  } from '../cdk/keycodes/keycodes';
import {
  NbAdjustableConnectedPositionStrategy,
  NbAdjustment,
  NbPosition,
  NbPositionBuilderService,
} from '../cdk/overlay/overlay-position';
import { NbActiveDescendantKeyManager } from '../cdk/a11y/descendant-key-manager';

@Directive({
  selector: 'input[nbAutocomplete]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NbAutocompleteDirective),
    multi: true,
  }],

})
export class NbAutocompleteDirective<T> implements OnDestroy, ControlValueAccessor {

  protected autocomplete: NbAutocompleteComponent<T>;

  /**
   * Trigger strategy used by overlay.
   * */
  protected triggerStrategy: NbTriggerStrategy;

  protected positionStrategy: NbAdjustableConnectedPositionStrategy;

  protected overlayRef: NbOverlayRef;

  protected keyManager: NbActiveDescendantKeyManager<NbOptionComponent<T>>;

  /**
   * Determines is autocomplete opened.
   * */
  get isOpen(): boolean {
    return this.overlayRef && this.overlayRef.hasAttached();
  }

  /**
   * Determines is autocomplete overlay closed.
   * */
  get isClosed(): boolean {
    return !this.isOpen;
  }

  /**
   * Provides autocomplete component.
   * */
  @Input('nbAutocomplete')
  set setAutocomplete(autocomplete: NbAutocompleteComponent<T>) {
    this.autocomplete = autocomplete;
  }

  constructor(
    protected hostRef: ElementRef,
    protected overlay: NbOverlayService,
    protected cd: ChangeDetectorRef,
    protected triggerStrategyBuilder: NbTriggerStrategyBuilderService,
    protected positionBuilder: NbPositionBuilderService) {}

  @HostListener('input')
  protected handleInput() {
    const currentValue = this.hostRef.nativeElement.value;
    this._onChange(currentValue);
    this.setHostInputValue(this.getDisplayValue(currentValue));
    this.show();
  }

  @HostListener('keydown', ['$event'])
  protected handleKeydown($event: any) {
    const isVerticalArrow = $event.keyCode === DOWN_ARROW || $event.keyCode === UP_ARROW;
    if (isVerticalArrow && this.isClosed) {
      this.show();
    }
  }

  @HostListener('focus')
  protected handleFocus() {
    if (this.isClosed) {
      this.show();
    }
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
        takeUntil(this.autocomplete.destroy$),
      )
      .subscribe((clickedOption: NbOptionComponent<T>) => this.handleOptionClick(clickedOption));
  }

  protected subscribeOnPositionChange() {
    this.positionStrategy.positionChange
      .pipe(takeUntil(this.autocomplete.destroy$))
      .subscribe((position: NbPosition) => {
        this.autocomplete.overlayPosition = position;
      });
  }

  protected getActiveItem(): NbOptionComponent<T> {
    return this.keyManager.activeItem;
  }

  protected setupAutocomplete() {
    this.autocomplete.setHost(this.hostRef);
  }

  protected getDisplayValue(value: string) {
    const displayFn = this.autocomplete.handleDisplayFn;
    return displayFn ? displayFn(value) : value;
  }

  protected getContainer() {
    return this.overlayRef && this.isOpen && <ComponentRef<any>> {
      location: {
        nativeElement: this.overlayRef.overlayElement,
      },
    };
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
      .pipe(filter(() => this.isClosed))
      .subscribe(($event: Event) => {
        this.show();
      });

    this.triggerStrategy.hide$
      .pipe(filter(() => this.isOpen))
      .subscribe(($event: Event) => {
        this.hide();
      });
  }

  protected createTriggerStrategy(): NbTriggerStrategy {
    return this.triggerStrategyBuilder
      .trigger(NbTrigger.FOCUS)
      .host(this.hostRef.nativeElement)
      .container(() => this.getContainer())
      .build();
  }

  protected createKeyManager(): void {
    this.keyManager = new NbActiveDescendantKeyManager<NbOptionComponent<T>>(this.autocomplete.options).withWrap();
  }

  show() {
    if (this.isClosed) {
      this.attachToOverlay();
      this.setActiveItem();
    }
  }

  hide() {
    if (this.isOpen) {
      this.overlayRef.detach();
      this.setActiveItem();
    }
  }

  protected setHostInputValue(value) {
    this.hostRef.nativeElement.value = this.getDisplayValue(value);
  }

  protected createPositionStrategy(): NbAdjustableConnectedPositionStrategy {
    return this.positionBuilder
      .connectedTo(this.hostRef)
      .position(NbPosition.BOTTOM)
      .offset(0)
      .adjustment(NbAdjustment.VERTICAL);
  }

  protected subscribeOnOverlayKeys(): void {
    this.overlayRef.keydownEvents()
      .pipe(
        takeUntil(this.autocomplete.destroy$),
      )
      .subscribe((event: KeyboardEvent) => {
        if (event.keyCode === ESCAPE && this.isOpen) {
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
          this.keyManager.onKeydown(event);
        }
      });

    this.keyManager.tabOut
      .pipe(takeUntil(this.autocomplete.destroy$))
      .subscribe(() => {
        this.hide();
      });
  }

  protected setActiveItem() {
    this.keyManager.setActiveItem(this.autocomplete.activeFirst ? 0 : -1);
    this.cd.detectChanges();
  }

  protected attachToOverlay() {
    if (!this.overlayRef) {
      this.setupAutocomplete();
      this.initOverlay();
    }
    this.overlayRef.attach(this.autocomplete.portal);
  }

  protected createOverlay() {
    const scrollStrategy = this.createScrollStrategy();
    this.overlayRef = this.overlay.create(
      { positionStrategy: this.positionStrategy, scrollStrategy });
  }

  protected initOverlay() {
    this.triggerStrategy = this.createTriggerStrategy();
    this.positionStrategy = this.createPositionStrategy();

    this.createKeyManager();
    this.subscribeOnTriggers();
    this.subscribeOnPositionChange();
    this.subscribeOnOptionClick();

    this.createOverlay();
    this.subscribeOnOverlayKeys();
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

    if (this.positionStrategy) {
      this.positionStrategy.dispose();
    }

    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }

}
