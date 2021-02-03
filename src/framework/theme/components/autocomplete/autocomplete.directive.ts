/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterViewInit,
  ChangeDetectorRef,
  ComponentRef,
  Directive,
  ElementRef,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  QueryList,
  Renderer2,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { merge, Subject } from 'rxjs';
import { filter, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';

import { NbOverlayRef, NbScrollStrategy } from '../cdk/overlay/mapping';
import { NbTrigger, NbTriggerStrategy, NbTriggerStrategyBuilderService } from '../cdk/overlay/overlay-trigger';
import { NbOverlayService } from '../cdk/overlay/overlay-service';
import { ENTER, ESCAPE } from '../cdk/keycodes/keycodes';
import {
  NbAdjustableConnectedPositionStrategy,
  NbAdjustment,
  NbPosition,
  NbPositionBuilderService,
} from '../cdk/overlay/overlay-position';
import {
  NbActiveDescendantKeyManager,
  NbActiveDescendantKeyManagerFactoryService,
  NbKeyManagerActiveItemMode,
} from '../cdk/a11y/descendant-key-manager';
import { NbScrollStrategies } from '../cdk/adapter/block-scroll-strategy-adapter';
import { NbOptionComponent } from '../option/option.component';
import { convertToBoolProperty } from '../helpers';
import { NbAutocompleteComponent } from './autocomplete.component';

/**
 * The `NbAutocompleteDirective` provides a capability to expand input with
 * `NbAutocompleteComponent` overlay containing options to select and fill input with.
 *
 * @stacked-example(Showcase, autocomplete/autocomplete-showcase.component)
 *
 * ### Installation
 *
 * Import `NbAutocompleteModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbAutocompleteModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * You can bind control with form controls or ngModel.
 *
 * @stacked-example(Autocomplete form binding, autocomplete/autocomplete-form.component)
 *
 * Options in the autocomplete may be grouped using `nb-option-group` component.
 *
 * @stacked-example(Grouping, autocomplete/autocomplete-group.component)
 *
 * Autocomplete may change selected option value via provided function.
 *
 * @stacked-example(Custom display, autocomplete/autocomplete-custom-display.component)
 *
 * Also, autocomplete may make first option in option list active automatically.
 *
 * @stacked-example(Active first, autocomplete/autocomplete-active-first.component)
 *
 * */
@Directive({
  selector: 'input[nbAutocomplete]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NbAutocompleteDirective),
    multi: true,
  }],
})
export class NbAutocompleteDirective<T> implements OnDestroy, AfterViewInit, ControlValueAccessor {

  /**
   * NbAutocompleteComponent instance passed via input.
   * */
  protected _autocomplete: NbAutocompleteComponent<T>;

  /**
   * Trigger strategy used by overlay.
   * @docs-private
   * */
  protected triggerStrategy: NbTriggerStrategy;

  protected positionStrategy: NbAdjustableConnectedPositionStrategy;

  protected overlayRef: NbOverlayRef;

  protected keyManager: NbActiveDescendantKeyManager<NbOptionComponent<T>>;

  protected destroy$: Subject<void> = new Subject<void>();

  protected _onChange: (value: T) => void = () => {};

  protected _onTouched = () => {};

  /**
   * Determines is autocomplete overlay opened.
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
  get autocomplete(): NbAutocompleteComponent<T> {
    return this._autocomplete;
  }
  set autocomplete(autocomplete: NbAutocompleteComponent<T>) {
    this._autocomplete = autocomplete;
  }

  /**
   * Determines options overlay offset (in pixels).
   **/
  @Input() overlayOffset: number = 8;

  /**
   * Determines if the input will be focused when the control value is changed
   * */
  @Input()
  get focusInputOnValueChange(): boolean {
    return this._focusInputOnValueChange;
  }
  set focusInputOnValueChange(value: boolean) {
    this._focusInputOnValueChange = convertToBoolProperty(value);
  }
  protected _focusInputOnValueChange: boolean = true;

  /**
   * Determines options overlay scroll strategy.
   **/
  @Input() scrollStrategy: NbScrollStrategies = 'block';

  @Input() customOverlayHost: ElementRef;

  @HostBinding('class.nb-autocomplete-position-top')
  get top(): boolean {
    return this.isOpen && this.autocomplete.options.length && this.autocomplete.overlayPosition === NbPosition.TOP;
  }

  @HostBinding('class.nb-autocomplete-position-bottom')
  get bottom(): boolean {
    return this.isOpen && this.autocomplete.options.length && this.autocomplete.overlayPosition === NbPosition.BOTTOM;
  }

  @HostBinding('attr.role')
  role: string = 'combobox';

  @HostBinding('attr.aria-autocomplete')
  ariaAutocomplete: string = 'list';

  @HostBinding('attr.haspopup')
  hasPopup: string = 'true';

  @HostBinding('attr.aria-expanded')
  get ariaExpanded(): string {
    return this.isOpen && this.isOpen.toString();
  }

  @HostBinding('attr.aria-owns')
  get ariaOwns() {
    return this.isOpen ? this.autocomplete.id : null;
  }

  @HostBinding('attr.aria-activedescendant')
  get ariaActiveDescendant() {
    return (this.isOpen && this.keyManager.activeItem) ? this.keyManager.activeItem.id : null;
  }

  constructor(
    protected hostRef: ElementRef,
    protected overlay: NbOverlayService,
    protected cd: ChangeDetectorRef,
    protected triggerStrategyBuilder: NbTriggerStrategyBuilderService,
    protected positionBuilder: NbPositionBuilderService,
    protected activeDescendantKeyManagerFactory: NbActiveDescendantKeyManagerFactoryService<NbOptionComponent<T>>,
    protected renderer: Renderer2,
  ) {}

  ngAfterViewInit() {
    this.triggerStrategy = this.createTriggerStrategy();
    this.subscribeOnTriggers();
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

    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('input')
  handleInput() {
    const currentValue = this.hostRef.nativeElement.value;
    this._onChange(currentValue);
    this.setHostInputValue(this.getDisplayValue(currentValue));
    this.show();
  }

  @HostListener('keydown.arrowDown')
  @HostListener('keydown.arrowUp')
  handleKeydown() {
    this.show();
  }

  @HostListener('blur')
  handleBlur() {
    this._onTouched();
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
      // Need to update class via @HostBinding
      this.cd.markForCheck();
    }
  }

  writeValue(value: T): void {
    this.handleInputValueUpdate(value);
  }

  registerOnChange(fn: (value: any) => {}): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.renderer.setProperty(this.hostRef.nativeElement, 'disabled', disabled);
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
        takeUntil(this.destroy$),
      )
      .subscribe((clickedOption: NbOptionComponent<T>) => this.handleInputValueUpdate(clickedOption.value));
  }

  protected subscribeOnPositionChange() {
    this.positionStrategy.positionChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((position: NbPosition) => {
        this.autocomplete.overlayPosition = position;
        this.cd.detectChanges();
      });
  }

  protected getActiveItem(): NbOptionComponent<T> {
    return this.keyManager.activeItem;
  }

  protected setupAutocomplete() {
    this.autocomplete.setHost(this.customOverlayHost || this.hostRef);
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

  protected handleInputValueUpdate(value: T) {
    if (value === undefined || value === null) {
      return;
    }
    this.setHostInputValue(value);
    this._onChange(value);
    if (this.focusInputOnValueChange) {
      this.hostRef.nativeElement.focus();
    }
    this.autocomplete.emitSelected(value);
    this.hide();
  }

  protected subscribeOnTriggers() {

    this.triggerStrategy.show$
      .pipe(filter(() => this.isClosed))
      .subscribe(() => this.show());

    this.triggerStrategy.hide$
      .pipe(filter(() => this.isOpen))
      .subscribe(() => this.hide());
  }

  protected createTriggerStrategy(): NbTriggerStrategy {
    return this.triggerStrategyBuilder
      .trigger(NbTrigger.FOCUS)
      .host(this.hostRef.nativeElement)
      .container(() => this.getContainer())
      .build();
  }

  protected createKeyManager(): void {
    this.keyManager = this.activeDescendantKeyManagerFactory
                        .create(this.autocomplete.options);
  }

  protected setHostInputValue(value) {
    this.hostRef.nativeElement.value = this.getDisplayValue(value);
  }

  protected createPositionStrategy(): NbAdjustableConnectedPositionStrategy {
    return this.positionBuilder
      .connectedTo(this.customOverlayHost || this.hostRef)
      .position(NbPosition.BOTTOM)
      .offset(this.overlayOffset)
      .adjustment(NbAdjustment.VERTICAL);
  }

  protected subscribeOnOverlayKeys(): void {
    this.overlayRef.keydownEvents()
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((event: KeyboardEvent) => {
        if (event.keyCode === ESCAPE && this.isOpen) {
          event.preventDefault();
          this.hostRef.nativeElement.focus();
          this.hide();

        } else if (event.keyCode === ENTER) {
          event.preventDefault();
          const activeItem = this.getActiveItem();
          if (!activeItem) {
            return;
          }
          this.handleInputValueUpdate(activeItem.value);

        } else {
          this.keyManager.onKeydown(event);
        }
      });

  }

  protected setActiveItem() {
    // If autocomplete has activeFirst input set to true,
    // keyManager set first option active, otherwise - reset active option.
    const mode = this.autocomplete.activeFirst
      ? NbKeyManagerActiveItemMode.FIRST_ACTIVE
      : NbKeyManagerActiveItemMode.RESET_ACTIVE;
    this.keyManager.setActiveItem(mode);
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
      { positionStrategy: this.positionStrategy, scrollStrategy, panelClass: this.autocomplete.optionsPanelClass });
  }

  protected initOverlay() {
    this.positionStrategy = this.createPositionStrategy();

    this.createKeyManager();
    this.subscribeOnPositionChange();
    this.subscribeOnOptionClick();
    this.checkOverlayVisibility();
    this.createOverlay();
    this.subscribeOnOverlayKeys();
  }

  protected checkOverlayVisibility() {
    this.autocomplete.options.changes
      .pipe(
        takeUntil(this.destroy$),
      ).subscribe(() => {
        if (!this.autocomplete.options.length) {
          this.hide();
        }
    });
  }

  protected createScrollStrategy(): NbScrollStrategy {
    return this.overlay.scrollStrategies[this.scrollStrategy]();
  }
}
