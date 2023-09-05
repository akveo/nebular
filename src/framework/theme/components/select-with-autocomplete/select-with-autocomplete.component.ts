/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  SimpleChanges,
  OnChanges,
  Renderer2,
  NgZone,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ListKeyManager } from '@angular/cdk/a11y';
import { merge, Subject, BehaviorSubject, from, combineLatest, animationFrameScheduler, EMPTY } from 'rxjs';
import { startWith, switchMap, takeUntil, filter, map, finalize, take, observeOn } from 'rxjs/operators';

import { NbStatusService } from '../../services/status.service';
import {
  NbAdjustableConnectedPositionStrategy,
  NbAdjustment,
  NbPosition,
  NbPositionBuilderService,
} from '../cdk/overlay/overlay-position';
import { NbOverlayRef, NbPortalDirective, NbScrollStrategy } from '../cdk/overlay/mapping';
import { NbOverlayService } from '../cdk/overlay/overlay-service';
import { NbTrigger, NbTriggerStrategy, NbTriggerStrategyBuilderService } from '../cdk/overlay/overlay-trigger';
import { NbFocusKeyManager, NbFocusKeyManagerFactoryService } from '../cdk/a11y/focus-key-manager';
import { ENTER, ESCAPE } from '../cdk/keycodes/keycodes';
import { NbComponentSize } from '../component-size';
import { NbComponentShape } from '../component-shape';
import { NbComponentOrCustomStatus } from '../component-status';
import { NB_DOCUMENT } from '../../theme.options';
import { NbOptionComponent } from '../option/option.component';
import { convertToBoolProperty, NbBooleanInput } from '../helpers';
import { NB_SELECT_INJECTION_TOKEN } from '../select/select-injection-tokens';
import { NbFormFieldControl, NbFormFieldControlConfig } from '../form-field/form-field-control';
import { NbFocusMonitor } from '../cdk/a11y/a11y.module';
import { NbScrollStrategies } from '../cdk/adapter/block-scroll-strategy-adapter';
import {
  NbActiveDescendantKeyManager,
  NbActiveDescendantKeyManagerFactoryService,
} from '../cdk/a11y/descendant-key-manager';
import {
  NbSelectAppearance,
  NbSelectCompareFunction,
  nbSelectFormFieldControlConfigFactory,
  NbSelectLabelComponent,
} from '../select/select.component';

/**
 * Experimental component with autocomplete possibility.
 * Could be changed without any prior notice.
 * Use at your own risk.
 *
 * Style variables is fully inherited.
 * Component's public API (`@Input()` and `@Output()`) works in a same way as NbSelectComponent.
 */
@Component({
  selector: 'nb-select-with-autocomplete',
  templateUrl: './select-with-autocomplete.component.html',
  styleUrls: ['./select-with-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NbSelectWithAutocompleteComponent),
      multi: true,
    },
    { provide: NB_SELECT_INJECTION_TOKEN, useExisting: NbSelectWithAutocompleteComponent },
    { provide: NbFormFieldControl, useExisting: NbSelectWithAutocompleteComponent },
    { provide: NbFormFieldControlConfig, useFactory: nbSelectFormFieldControlConfigFactory },
  ],
})
export class NbSelectWithAutocompleteComponent
  implements OnChanges, AfterViewInit, AfterContentInit, OnDestroy, ControlValueAccessor, NbFormFieldControl
{
  /**
   * Select size, available sizes:
   * `tiny`, `small`, `medium` (default), `large`, `giant`
   */
  @Input() size: NbComponentSize = 'medium';

  /**
   * Select status (adds specific styles):
   * `basic`, `primary`, `info`, `success`, `warning`, `danger`, `control`
   */
  @Input() status: NbComponentOrCustomStatus = 'basic';

  /**
   * Select shapes: `rectangle` (default), `round`, `semi-round`
   */
  @Input() shape: NbComponentShape = 'rectangle';

  /**
   * Select appearances: `outline` (default), `filled`, `hero`
   */
  @Input() appearance: NbSelectAppearance = 'outline';

  /**
   * Specifies class to be set on `nb-option`s container (`nb-option-list`)
   * */
  @Input() optionsListClass: NgClass['ngClass'];

  /**
   * Specifies class for the overlay panel with options
   * */
  @Input() optionsPanelClass: string | string[];

  /**
   * Specifies width (in pixels) to be set on `nb-option`s container (`nb-option-list`)
   * */
  @Input()
  get optionsWidth(): number {
    return this._optionsWidth ?? this.hostWidth;
  }
  set optionsWidth(value: number) {
    this._optionsWidth = value;
  }
  protected _optionsWidth: number | undefined;

  /**
   * Adds `outline` styles
   */
  @Input()
  @HostBinding('class.appearance-outline')
  get outline(): boolean {
    return this.appearance === 'outline';
  }
  set outline(value: boolean) {
    if (convertToBoolProperty(value)) {
      this.appearance = 'outline';
    }
  }
  static ngAcceptInputType_outline: NbBooleanInput;

  /**
   * Adds `filled` styles
   */
  @Input()
  @HostBinding('class.appearance-filled')
  get filled(): boolean {
    return this.appearance === 'filled';
  }
  set filled(value: boolean) {
    if (convertToBoolProperty(value)) {
      this.appearance = 'filled';
    }
  }
  static ngAcceptInputType_filled: NbBooleanInput;

  /**
   * Adds `hero` styles
   */
  @Input()
  @HostBinding('class.appearance-hero')
  get hero(): boolean {
    return this.appearance === 'hero';
  }
  set hero(value: boolean) {
    if (convertToBoolProperty(value)) {
      this.appearance = 'hero';
    }
  }
  static ngAcceptInputType_hero: NbBooleanInput;

  /**
   * Disables the select
   */
  @Input()
  get disabled(): boolean {
    return !!this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = convertToBoolProperty(value);
  }
  protected _disabled: boolean;
  static ngAcceptInputType_disabled: NbBooleanInput;

  /**
   * If set element will fill its container
   */
  @Input()
  @HostBinding('class.full-width')
  get fullWidth(): boolean {
    return this._fullWidth;
  }
  set fullWidth(value: boolean) {
    this._fullWidth = convertToBoolProperty(value);
  }
  protected _fullWidth: boolean = false;
  static ngAcceptInputType_fullWidth: NbBooleanInput;

  /**
   * Renders select placeholder if nothing selected.
   * */
  @Input() placeholder: string = '';

  /**
   * A function to compare option value with selected value.
   * By default, values are compared with strict equality (`===`).
   */
  @Input()
  get compareWith(): NbSelectCompareFunction {
    return this._compareWith;
  }
  set compareWith(fn: NbSelectCompareFunction) {
    if (typeof fn !== 'function') {
      return;
    }

    this._compareWith = fn;

    if (this.selectionModel.length && this.canSelectValue()) {
      this.setSelection(this.selected);
    }
  }
  protected _compareWith: NbSelectCompareFunction = (v1: any, v2: any) => v1 === v2;

  /**
   * Accepts selected item or array of selected items.
   * */
  @Input()
  set selected(value) {
    this.writeValue(value);
  }
  get selected() {
    return this.multiple ? this.selectionModel.map((o) => o.value) : this.selectionModel[0].value;
  }

  /**
   * Gives capability just write `multiple` over the element.
   * */
  @Input()
  get multiple(): boolean {
    return this._multiple;
  }
  set multiple(value: boolean) {
    this._multiple = convertToBoolProperty(value);

    this.updatePositionStrategy();
    this.updateCurrentKeyManager();
  }
  protected _multiple: boolean = false;
  static ngAcceptInputType_multiple: NbBooleanInput;

  /**
   * Determines options overlay offset (in pixels).
   **/
  @Input() optionsOverlayOffset = 8;

  /**
   * Determines options overlay scroll strategy.
   **/
  @Input() scrollStrategy: NbScrollStrategies = 'block';

  /**
   * Experimental input.
   * Could be changed without any prior notice.
   * Use at your own risk.
   *
   * It replaces the button with input when the select is opened.
   * That replacement provides a very basic API to implement options filtering functionality.
   * Filtering itself isn't implemented inside select.
   * So it should be implemented by the user.
   */
  @Input()
  set withOptionsAutocomplete(value: boolean) {
    this._withOptionsAutocomplete = convertToBoolProperty(value);
    this.updatePositionStrategy();
    this.updateCurrentKeyManager();

    if (!value) {
      this.resetAutocompleteInput();
    }
  }
  get withOptionsAutocomplete(): boolean {
    return this._withOptionsAutocomplete;
  }
  protected _withOptionsAutocomplete: boolean = false;

  @HostBinding('class')
  get additionalClasses(): string[] {
    if (this.statusService.isCustomStatus(this.status)) {
      return [this.statusService.getStatusClass(this.status)];
    }
    return [];
  }

  /**
   * Will be emitted when selected value changes.
   * */
  @Output() selectedChange: EventEmitter<any> = new EventEmitter();
  @Output() selectOpen: EventEmitter<void> = new EventEmitter();
  @Output() selectClose: EventEmitter<void> = new EventEmitter();
  @Output() optionsAutocompleteInputChange: EventEmitter<string> = new EventEmitter();

  /**
   * List of `NbOptionComponent`'s components passed as content.
   * TODO maybe it would be better provide wrapper
   * */
  @ContentChildren(NbOptionComponent, { descendants: true }) options: QueryList<NbOptionComponent>;

  /**
   * Custom select label, will be rendered instead of default enumeration with coma.
   * */
  @ContentChild(NbSelectLabelComponent) customLabel;

  /**
   * NbCard with options content.
   * */
  @ViewChild(NbPortalDirective) portal: NbPortalDirective;

  @ViewChild('selectButton', { read: ElementRef }) button: ElementRef<HTMLButtonElement> | undefined;
  @ViewChild('optionsAutocompleteInput', { read: ElementRef }) optionsAutocompleteInput:
    | ElementRef<HTMLInputElement>
    | undefined;

  /**
   * Determines is select opened.
   * */
  @HostBinding('class.open')
  get isOpen(): boolean {
    return this.ref && this.ref.hasAttached();
  }

  get isOptionsAutocompleteAllowed(): boolean {
    return this.withOptionsAutocomplete;
  }

  get isOptionsAutocompleteInputShown(): boolean {
    return this.isOptionsAutocompleteAllowed && this.isOpen;
  }

  /**
   * List of selected options.
   * */
  selectionModel: NbOptionComponent[] = [];

  positionStrategy$: BehaviorSubject<NbAdjustableConnectedPositionStrategy | undefined> = new BehaviorSubject(
    undefined,
  );

  /**
   * Current overlay position because of we have to toggle overlayPosition
   * in [ngClass] direction and this directive can use only string.
   */
  overlayPosition: NbPosition = '' as NbPosition;

  protected ref: NbOverlayRef;

  protected triggerStrategy: NbTriggerStrategy;

  protected alive: boolean = true;

  protected destroy$ = new Subject<void>();

  protected currentKeyManager: ListKeyManager<NbOptionComponent>;
  protected focusKeyManager: NbFocusKeyManager<NbOptionComponent>;
  protected activeDescendantKeyManager: NbActiveDescendantKeyManager<NbOptionComponent>;

  /**
   * If a user assigns value before content nb-options's rendered the value will be putted in this variable.
   * And then applied after content rendered.
   * Only the last value will be applied.
   * */
  protected queue;

  /**
   * Function passed through control value accessor to propagate changes.
   * */
  protected onChange: Function = () => {};
  protected onTouched: Function = () => {};

  /*
   * @docs-private
   **/
  status$ = new BehaviorSubject<NbComponentOrCustomStatus>(this.status);

  /*
   * @docs-private
   **/
  size$ = new BehaviorSubject<NbComponentSize>(this.size);

  /*
   * @docs-private
   **/
  focused$ = new BehaviorSubject<boolean>(false);

  /*
   * @docs-private
   **/
  disabled$ = new BehaviorSubject<boolean>(this.disabled);

  /*
   * @docs-private
   **/
  fullWidth$ = new BehaviorSubject<boolean>(this.fullWidth);

  constructor(
    @Inject(NB_DOCUMENT) protected document,
    protected overlay: NbOverlayService,
    protected hostRef: ElementRef<HTMLElement>,
    protected positionBuilder: NbPositionBuilderService,
    protected triggerStrategyBuilder: NbTriggerStrategyBuilderService,
    protected cd: ChangeDetectorRef,
    protected focusKeyManagerFactoryService: NbFocusKeyManagerFactoryService<NbOptionComponent>,
    protected focusMonitor: NbFocusMonitor,
    protected renderer: Renderer2,
    protected zone: NgZone,
    protected statusService: NbStatusService,
    protected activeDescendantKeyManagerFactoryService: NbActiveDescendantKeyManagerFactoryService<NbOptionComponent>,
  ) {}

  /**
   * Determines is select hidden.
   * */
  get isHidden(): boolean {
    return !this.isOpen;
  }

  /**
   * Returns width of the select button.
   * */
  get hostWidth(): number {
    if (this.isOptionsAutocompleteInputShown) {
      return this.optionsAutocompleteInput.nativeElement.getBoundingClientRect().width;
    }
    return this.button.nativeElement.getBoundingClientRect().width;
  }

  lastShownButtonWidth: number | undefined = undefined;

  get selectButtonClasses(): string[] {
    const classes = [];

    if (!this.selectionModel.length) {
      classes.push('placeholder');
    }
    if (!this.selectionModel.length && !this.placeholder) {
      classes.push('empty');
    }
    if (this.isOpen) {
      classes.push(this.overlayPosition);
    }

    return classes;
  }

  /**
   * Content rendered in the label.
   * */
  get selectionView() {
    if (this.isOptionsAutocompleteInputShown && this.multiple) {
      return '';
    }

    if (this.selectionModel.length > 1) {
      return this.selectionModel.map((option: NbOptionComponent) => option.content).join(', ');
    }

    return this.selectionModel[0]?.content?.trim() ?? '';
  }

  ngOnChanges({ disabled, status, size, fullWidth }: SimpleChanges) {
    if (disabled) {
      this.disabled$.next(disabled.currentValue);
    }
    if (status) {
      this.status$.next(status.currentValue);
    }
    if (size) {
      this.size$.next(size.currentValue);
    }
    if (fullWidth) {
      this.fullWidth$.next(this.fullWidth);
    }
  }

  ngAfterContentInit() {
    this.options.changes
      .pipe(
        startWith(this.options),
        filter(() => this.queue != null && this.canSelectValue()),
        // Call 'writeValue' when current change detection run is finished.
        // When writing is finished, change detection starts again, since
        // microtasks queue is empty.
        // Prevents ExpressionChangedAfterItHasBeenCheckedError.
        switchMap((options: QueryList<NbOptionComponent>) => from(Promise.resolve(options))),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.writeValue(this.queue));
  }

  ngAfterViewInit() {
    this.triggerStrategy = this.createTriggerStrategy();

    this.subscribeOnButtonFocus();
    this.subscribeOnTriggers();
    this.subscribeOnOptionClick();

    // TODO: #2254
    this.zone.runOutsideAngular(() =>
      setTimeout(() => {
        this.renderer.addClass(this.hostRef.nativeElement, 'nb-transition');
      }),
    );
  }

  ngOnDestroy() {
    this.alive = false;

    this.destroy$.next();
    this.destroy$.complete();

    if (this.ref) {
      this.ref.dispose();
    }
    if (this.triggerStrategy) {
      this.triggerStrategy.destroy();
    }
  }

  onAutocompleteInputChange(event: Event) {
    this.optionsAutocompleteInputChange.emit((event.target as HTMLInputElement).value);
  }

  show() {
    if (this.shouldShow()) {
      this.lastShownButtonWidth = this.hostWidth;

      this.attachToOverlay();

      this.positionStrategy$
        .pipe(
          switchMap((positionStrategy) => positionStrategy.positionChange ?? EMPTY),
          take(1),
          takeUntil(this.destroy$),
        )
        .subscribe(() => {
          if (this.isOptionsAutocompleteInputShown) {
            this.optionsAutocompleteInput.nativeElement.focus();
          }
          this.setActiveOption();
        });

      this.selectOpen.emit();

      this.cd.markForCheck();
    }
  }

  hide() {
    if (this.isOpen) {
      this.ref.detach();
      this.cd.markForCheck();
      this.selectClose.emit();

      this.resetAutocompleteInput();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.cd.markForCheck();
  }

  writeValue(value): void {
    if (!this.alive) {
      return;
    }

    if (this.canSelectValue()) {
      this.setSelection(value);
      if (this.selectionModel.length) {
        this.queue = null;
      }
    } else {
      this.queue = value;
    }
  }

  /**
   * Selects option or clear all selected options if value is null.
   * */
  protected handleOptionClick(option: NbOptionComponent) {
    this.queue = null;
    if (option.value == null) {
      this.reset();
    } else {
      this.selectOption(option);
    }

    this.cd.markForCheck();
  }

  /**
   * Deselect all selected options.
   * */
  protected reset() {
    this.selectionModel.forEach((option: NbOptionComponent) => option.deselect());
    this.selectionModel = [];
    this.hide();
    this.focusButton();
    this.emitSelected(this.multiple ? [] : null);
  }

  /**
   * Determines how to select option as multiple or single.
   * */
  protected selectOption(option: NbOptionComponent) {
    if (this.multiple) {
      this.handleMultipleSelect(option);
    } else {
      this.handleSingleSelect(option);
    }
  }

  /**
   * Select single option.
   * */
  protected handleSingleSelect(option: NbOptionComponent) {
    const selected = this.selectionModel.pop();

    if (selected && !this._compareWith(selected.value, option.value)) {
      selected.deselect();
    }

    this.selectionModel = [option];
    option.select();
    this.hide();
    this.focusButton();
    this.emitSelected(option.value);
  }

  /**
   * Select for multiple options.
   * */
  protected handleMultipleSelect(option: NbOptionComponent) {
    if (option.selected) {
      this.selectionModel = this.selectionModel.filter((s) => !this._compareWith(s.value, option.value));
      option.deselect();
    } else {
      this.selectionModel.push(option);
      option.select();
    }

    this.emitSelected(this.selectionModel.map((opt: NbOptionComponent) => opt.value));
  }

  protected attachToOverlay() {
    if (!this.ref) {
      this.createOverlay();
      this.subscribeOnPositionChange();
      this.createKeyManager();
      this.subscribeOnOverlayKeys();
      this.subscribeOnOptionsAutocompleteChange();
    }

    this.ref.attach(this.portal);
  }

  protected setActiveOption() {
    if (this.selectionModel.length && !this.selectionModel[0].hidden) {
      this.currentKeyManager?.setActiveItem(this.selectionModel[0]);
    } else {
      this.currentKeyManager?.setFirstItemActive();
    }
  }

  protected createOverlay() {
    const scrollStrategy = this.createScrollStrategy();
    this.positionStrategy$.next(this.createPositionStrategy());
    this.ref = this.overlay.create({
      positionStrategy: this.positionStrategy$.value,
      scrollStrategy,
      panelClass: this.optionsPanelClass,
    });
  }

  protected createKeyManager(): void {
    this.activeDescendantKeyManager = this.activeDescendantKeyManagerFactoryService
      .create(this.options)
      .skipPredicate((option) => {
        return this.isOptionHidden(option);
      });

    this.focusKeyManager = this.focusKeyManagerFactoryService
      .create(this.options)
      .withTypeAhead(200)
      .skipPredicate((option) => {
        return this.isOptionHidden(option);
      });

    this.updateCurrentKeyManager();
  }

  protected updateCurrentKeyManager() {
    this.currentKeyManager?.setActiveItem(-1);
    if (this.isOptionsAutocompleteAllowed) {
      this.currentKeyManager = this.activeDescendantKeyManager;
    } else {
      this.currentKeyManager = this.focusKeyManager;
    }
    this.setActiveOption();
  }

  protected resetAutocompleteInput() {
    if (this.optionsAutocompleteInput?.nativeElement) {
      this.optionsAutocompleteInput.nativeElement.value = this.selectionView;
      this.optionsAutocompleteInputChange.emit('');
    }
  }

  protected createPositionStrategy(): NbAdjustableConnectedPositionStrategy {
    const element: ElementRef<HTMLInputElement | HTMLButtonElement> = this.isOptionsAutocompleteAllowed
      ? this.optionsAutocompleteInput
      : this.button;
    return this.positionBuilder
      .connectedTo(element)
      .position(NbPosition.BOTTOM)
      .offset(this.optionsOverlayOffset)
      .adjustment(NbAdjustment.VERTICAL);
  }

  protected updatePositionStrategy(): void {
    if (this.ref) {
      this.positionStrategy$.next(this.createPositionStrategy());
      this.ref.updatePositionStrategy(this.positionStrategy$.value);
      if (this.isOpen) {
        this.ref.updatePosition();
      }
    }
  }

  protected createScrollStrategy(): NbScrollStrategy {
    return this.overlay.scrollStrategies[this.scrollStrategy]();
  }

  protected createTriggerStrategy(): NbTriggerStrategy {
    return this.triggerStrategyBuilder
      .trigger(NbTrigger.CLICK)
      .host(this.hostRef.nativeElement)
      .container(() => this.getContainer())
      .build();
  }

  protected subscribeOnTriggers() {
    this.triggerStrategy.show$.subscribe(() => this.show());
    this.triggerStrategy.hide$.pipe(filter(() => this.isOpen)).subscribe(($event: Event) => {
      this.hide();
      if (!this.isClickedWithinComponent($event)) {
        this.onTouched();
      }
    });
  }

  protected subscribeOnPositionChange() {
    this.positionStrategy$
      .pipe(
        switchMap((positionStrategy) => positionStrategy.positionChange ?? EMPTY),
        takeUntil(this.destroy$),
      )
      .subscribe((position: NbPosition) => {
        this.overlayPosition = position;
        this.cd.detectChanges();
      });
  }

  protected subscribeOnOptionClick() {
    /**
     * If the user changes provided options list in the runtime we have to handle this
     * and resubscribe on options selection changes event.
     * Otherwise, the user will not be able to select new options.
     * */
    this.options.changes
      .pipe(
        startWith(this.options),
        switchMap((options: QueryList<NbOptionComponent>) => {
          return merge(...options.map((option) => option.click));
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((clickedOption: NbOptionComponent) => this.handleOptionClick(clickedOption));
  }

  protected subscribeOnOverlayKeys(): void {
    this.ref
      .keydownEvents()
      .pipe(
        filter(() => this.isOpen),
        takeUntil(this.destroy$),
      )
      .subscribe((event: KeyboardEvent) => {
        if (event.keyCode === ESCAPE) {
          this.hide();
          this.focusButton();
        } else if (event.keyCode === ENTER && this.isOptionsAutocompleteInputShown) {
          event.preventDefault();
          const activeItem = this.currentKeyManager.activeItem;
          if (activeItem) {
            this.selectOption(activeItem);
          }
        } else {
          this.currentKeyManager.onKeydown(event);
        }
      });

    merge(
      this.focusKeyManager.tabOut.pipe(filter(() => !this.isOptionsAutocompleteInputShown)),
      this.activeDescendantKeyManager.tabOut.pipe(filter(() => this.isOptionsAutocompleteInputShown)),
    )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.hide();
        this.onTouched();
      });
  }

  protected subscribeOnOptionsAutocompleteChange() {
    this.optionsAutocompleteInputChange
      .pipe(
        observeOn(animationFrameScheduler),
        filter(() => this.isOptionsAutocompleteInputShown),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        if (this.isOptionHidden(this.currentKeyManager.activeItem)) {
          this.currentKeyManager.setFirstItemActive();
        }
      });
  }

  protected subscribeOnButtonFocus() {
    const buttonFocus$ = this.focusMonitor.monitor(this.button).pipe(
      map((origin) => !!origin),
      startWith(false),
      finalize(() => this.focusMonitor.stopMonitoring(this.button)),
    );

    const filterInputFocus$ = this.focusMonitor.monitor(this.optionsAutocompleteInput).pipe(
      map((origin) => !!origin),
      startWith(false),
      finalize(() => this.focusMonitor.stopMonitoring(this.button)),
    );

    combineLatest([buttonFocus$, filterInputFocus$])
      .pipe(
        map(([buttonFocus, filterInputFocus]) => buttonFocus || filterInputFocus),
        takeUntil(this.destroy$),
      )
      .subscribe(this.focused$);
  }

  protected getContainer() {
    return (
      this.ref &&
      this.ref.hasAttached() &&
      <ComponentRef<any>>{
        location: {
          nativeElement: this.ref.overlayElement,
        },
      }
    );
  }

  protected focusButton() {
    /**
     * Need to wrap with setTimeout
     * because otherwise focus could be called
     * when the component hasn't rerendered the button
     * which was hidden by `isOptionsAutocompleteInputShown` property.
     */
    setTimeout(() => {
      this.button?.nativeElement?.focus();
    });
  }

  /**
   * Propagate selected value.
   * */
  protected emitSelected(selected) {
    this.onChange(selected);
    this.selectedChange.emit(selected);
  }

  /**
   * Set selected value in model.
   * */
  protected setSelection(value) {
    const isResetValue = value == null;
    let safeValue = value;

    if (this.multiple) {
      safeValue = value ?? [];
    }

    const isArray: boolean = Array.isArray(safeValue);

    if (this.multiple && !isArray && !isResetValue) {
      throw new Error("Can't assign single value if select is marked as multiple");
    }
    if (!this.multiple && isArray) {
      throw new Error("Can't assign array if select is not marked as multiple");
    }

    const previouslySelectedOptions = this.selectionModel;
    this.selectionModel = [];

    if (this.multiple) {
      safeValue.forEach((option) => this.selectValue(option));
    } else {
      this.selectValue(safeValue);
    }

    // find options which were selected before and trigger deselect
    previouslySelectedOptions
      .filter((option: NbOptionComponent) => !this.selectionModel.includes(option))
      .forEach((option: NbOptionComponent) => option.deselect());

    this.cd.markForCheck();
  }

  /**
   * Selects value.
   * */
  protected selectValue(value) {
    if (value == null) {
      return;
    }

    const corresponding = this.options.find((option: NbOptionComponent) => this._compareWith(option.value, value));

    if (corresponding) {
      corresponding.select();
      this.selectionModel.push(corresponding);
    }
  }

  protected shouldShow(): boolean {
    return this.isHidden && this.options?.length > 0;
  }

  /**
   * Sets touched if focus moved outside of button and overlay,
   * ignoring the case when focus moved to options overlay.
   */
  trySetTouched() {
    if (this.isHidden) {
      this.onTouched();
    }
  }

  protected isClickedWithinComponent($event: Event) {
    return this.hostRef.nativeElement === $event.target || this.hostRef.nativeElement.contains($event.target as Node);
  }

  protected canSelectValue(): boolean {
    return !!(this.options && this.options.length);
  }

  protected isOptionHidden(option: NbOptionComponent): boolean {
    return option.hidden;
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
  @HostBinding('class.status-primary')
  get primary(): boolean {
    return this.status === 'primary';
  }
  @HostBinding('class.status-info')
  get info(): boolean {
    return this.status === 'info';
  }
  @HostBinding('class.status-success')
  get success(): boolean {
    return this.status === 'success';
  }
  @HostBinding('class.status-warning')
  get warning(): boolean {
    return this.status === 'warning';
  }
  @HostBinding('class.status-danger')
  get danger(): boolean {
    return this.status === 'danger';
  }
  @HostBinding('class.status-basic')
  get basic(): boolean {
    return this.status === 'basic';
  }
  @HostBinding('class.status-control')
  get control(): boolean {
    return this.status === 'control';
  }
  @HostBinding('class.shape-rectangle')
  get rectangle(): boolean {
    return this.shape === 'rectangle';
  }
  @HostBinding('class.shape-round')
  get round(): boolean {
    return this.shape === 'round';
  }
  @HostBinding('class.shape-semi-round')
  get semiRound(): boolean {
    return this.shape === 'semi-round';
  }
}
