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
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { merge, Observable, Subject } from 'rxjs';
import { startWith, switchMap, takeWhile } from 'rxjs/operators';

import {
  NbAdjustableConnectedPositionStrategy,
  NbAdjustment,
  NbOverlayRef,
  NbOverlayService,
  NbPortalDirective,
  NbPosition,
  NbPositionBuilderService,
  NbScrollStrategy,
  NbTrigger,
  NbTriggerStrategy,
  NbTriggerStrategyBuilderService,
} from '../cdk';
import { NbOptionComponent } from './option.component';
import { NbButtonComponent } from '../button/button.component';
import { NB_DOCUMENT } from '../../theme.options';
import { convertToBoolProperty } from '../helpers';


@Component({
  selector: 'nb-select-label',
  template: '<ng-content></ng-content>',
})
export class NbSelectLabelComponent {
}

/**
 * The `NbSelectComponent` provides a capability to select one of the passed items.
 *
 * @stacked-example(Showcase, select/select-showcase.component)
 *
 * ### Installation
 *
 * Import `NbSelectModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *   	// ...
 *     NbSelectModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * If you want to use it as the multi-select control you have to mark it as `multiple`.
 * In this case, `nb-select` will work only with arrays - accept arrays and propagate arrays.
 *
 * @stacked-example(Multiple, select/select-multiple.component)
 *
 * Items without values will clean the selection. Both `null` and `undefined` values will also clean the selection.
 *
 * @stacked-example(Clean selection, select/select-clean.component)
 *
 * Select may be bounded using `selected` input:
 *
 * ```html
 * <nb-select [(selected)]="selected"></nb-selected>
 * ```
 *
 * Or you can bind control with form controls or ngModel:
 *
 * @stacked-example(Select form binding, select/select-form.component)
 *
 * Options in the select may be grouped using `nb-option-group` component.
 *
 * @stacked-example(Grouping, select/select-groups.component)
 *
 * Select may have a placeholder that will be shown when nothing selected:
 *
 * @stacked-example(Placeholder, select/select-placeholder.component)
 *
 * You can disable select, options and whole groups.
 *
 * @stacked-example(Disabled select, select/select-disabled.component)
 *
 * Also, the custom label may be provided in select.
 * This custom label will be used for instead placeholder when something selected.
 *
 * @stacked-example(Custom label, select/select-label.component)
 *
 * Default `nb-select` size is `medium` and status color is `primary`.
 * Select is available in multiple colors using `status` property:
 *
 * @stacked-example(Select statuses, select/select-status.component)
 *
 * There are four select sizes:
 *
 * @stacked-example(Select sizes, select/select-sizes.component)
 *
 * And two additional style types - `outline`:
 *
 * @stacked-example(Outline select, select/select-outline.component)
 *
 * and `hero`:
 *
 * @stacked-example(Select colors, select/select-hero.component)
 *
 * Select is available in different shapes, that could be combined with the other properties:
 *
 * @stacked-example(Select shapes, select/select-shapes.component)
 *
 *
 * @styles
 *
 * select-border-width:
 * select-max-height:
 * select-bg:
 * select-checkbox-color:
 * select-checkmark-color:
 * select-option-disabled-bg:
 * select-option-disabled-opacity:
 * select-option-padding:
 * */
@Component({
  selector: 'nb-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NbSelectComponent),
      multi: true,
    },
  ],
})
export class NbSelectComponent<T> implements OnInit, AfterViewInit, AfterContentInit, OnDestroy, ControlValueAccessor {
  /**
   * Select size, available sizes:
   * `xxsmall`, `xsmall`, `small`, `medium`, `large`
   */
  @Input() size: string;

  /**
   * Select status (adds specific styles):
   * `primary`, `info`, `success`, `warning`, `danger`
   */
  @Input() status: string = 'primary';

  /**
   * Select shapes: `rectangle`, `round`, `semi-round`
   */
  @Input() shape: string;

  /**
   * Adds `hero` styles
   */
  @Input() hero: boolean;

  /**
   * Disables the select
   */
  @Input() disabled: boolean;

  /**
   * If set element will fill its container
   */
  @Input() fullWidth: boolean;

  /**
   * Adds `outline` styles
   */
  @Input() outline: boolean;

  /**
   * Renders select placeholder if nothing selected.
   * */
  @Input() placeholder: string = '';

  /**
   * Will be emitted when selected value changes.
   * */
  @Output() selectedChange: EventEmitter<T | T[]> = new EventEmitter();

  /**
   * Accepts selected item or array of selected items.
   * */
  @Input('selected')
  set setSelected(value: T | T[]) {
    this.writeValue(value);
  }

  /**
   * Gives capability just write `multiple` over the element.
   * */
  @Input('multiple')
  set setMultiple(multiple: boolean) {
    this.multiple = convertToBoolProperty(multiple);
  }

  /**
   * List of `NbOptionComponent`'s components passed as content.
   * TODO maybe it would be better provide wrapper
   * */
  @ContentChildren(NbOptionComponent, { descendants: true }) options: QueryList<NbOptionComponent<T>>;

  /**
   * Custom select label, will be rendered instead of default enumeration with coma.
   * */
  @ContentChild(NbSelectLabelComponent) customLabel;

  /**
   * NbCard with options content.
   * */
  @ViewChild(NbPortalDirective) portal: NbPortalDirective;

  @ViewChild(NbButtonComponent, { read: ElementRef }) button: ElementRef<HTMLButtonElement>;

  multiple: boolean = false;

  /**
   * List of selected options.
   * */
  selectionModel: NbOptionComponent<T>[] = [];

  positionStrategy: NbAdjustableConnectedPositionStrategy;

  /**
   * Current overlay position because of we have to toggle overlayPosition
   * in [ngClass] direction and this directive can use only string.
   */
  overlayPosition: NbPosition = '' as NbPosition;

  protected selectionChange$: Subject<NbOptionComponent<T>> = new Subject();
  /**
   * Stream of events that will fire when one of the options is clicked.
   * @deprecated
   * Use nb-select (selected) binding to track selection change and <nb-option (click)=""> to track option click.
   * @breaking-change 4.0.0
   **/
  readonly selectionChange: Observable<NbOptionComponent<T>> = this.selectionChange$.asObservable();

  protected ref: NbOverlayRef;

  protected triggerStrategy: NbTriggerStrategy;

  protected alive: boolean = true;

  /**
   * If a user assigns value before content nb-options's rendered the value will be putted in this variable.
   * And then applied after content rendered.
   * Only the last value will be applied.
   * */
  protected queue: T | T[];

  /**
   * Function passed through control value accessor to propagate changes.
   * */
  protected onChange: Function = () => {};
  protected onTouched: Function = () => {};

  constructor(@Inject(NB_DOCUMENT) protected document,
              protected overlay: NbOverlayService,
              protected hostRef: ElementRef<HTMLElement>,
              protected positionBuilder: NbPositionBuilderService,
              protected triggerStrategyBuilder: NbTriggerStrategyBuilderService,
              protected cd: ChangeDetectorRef) {
  }

  /**
   * Determines is select opened.
   * */
  get isOpened(): boolean {
    return this.ref && this.ref.hasAttached();
  }

  /**
   * Determines is select hidden.
   * */
  get isHidden(): boolean {
    return !this.isOpened;
  }

  /**
   * Returns width of the select button.
   * */
  get hostWidth(): number {
    return this.hostRef.nativeElement.getBoundingClientRect().width;
  }

  /**
   * Content rendered in the label.
   * */
  get selectionView() {
    if (this.selectionModel.length > 1) {
      return this.selectionModel.map((option: NbOptionComponent<T>) => option.content).join(', ');
    }

    return this.selectionModel[0].content;
  }

  ngOnInit() {
    this.createOverlay();
  }

  ngAfterContentInit() {
    if (this.queue) {
      // Call 'writeValue' when current change detection run is finished.
      // When writing is finished, change detection starts again, since
      // microtasks queue is empty.
      // Prevents ExpressionChangedAfterItHasBeenCheckedError.
      Promise.resolve().then(() => {
        this.writeValue(this.queue);
        this.queue = null;
      });
    }
  }

  ngAfterViewInit() {
    this.triggerStrategy = this.createTriggerStrategy();

    this.subscribeOnTriggers();
    this.subscribeOnPositionChange();
    this.subscribeOnOptionClick();
  }

  ngOnDestroy() {
    this.alive = false;

    if (this.ref) {
      this.ref.dispose();
    }
    if (this.triggerStrategy) {
      this.triggerStrategy.destroy();
    }
  }

  show() {
    if (this.isHidden) {
      this.ref.attach(this.portal);
      this.cd.markForCheck();
    }
  }

  hide() {
    if (this.isOpened) {
      this.ref.detach();
      this.cd.markForCheck();
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

  writeValue(value: T | T[]): void {
    if (!this.alive) {
      return;
    }

    if (this.options) {
      this.setSelection(value);
    } else {
      this.queue = value;
    }
  }

  /**
   * Selects option or clear all selected options if value is null.
   * */
  protected handleOptionClick(option: NbOptionComponent<T>) {
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
    this.selectionModel.forEach((option: NbOptionComponent<T>) => option.deselect());
    this.selectionModel = [];
    this.hide();
    this.button.nativeElement.focus();
    this.emitSelected(this.multiple ? [] : null);
  }

  /**
   * Determines how to select option as multiple or single.
   * */
  protected selectOption(option: NbOptionComponent<T>) {
    if (this.multiple) {
      this.handleMultipleSelect(option);
    } else {
      this.handleSingleSelect(option);
    }
  }

  /**
   * Select single option.
   * */
  protected handleSingleSelect(option: NbOptionComponent<T>) {
    const selected = this.selectionModel.pop();

    if (selected && selected !== option) {
      selected.deselect();
    }

    this.selectionModel = [option];
    option.select();
    this.hide();
    this.button.nativeElement.focus();

    this.emitSelected(option.value);
  }

  /**
   * Select for multiple options.
   * */
  protected handleMultipleSelect(option: NbOptionComponent<T>) {
    if (option.selected) {
      this.selectionModel = this.selectionModel.filter(s => s.value !== option.value);
      option.deselect();
    } else {
      this.selectionModel.push(option);
      option.select();
    }

    this.emitSelected(this.selectionModel.map((opt: NbOptionComponent<T>) => opt.value));
  }

  protected createOverlay() {
    const scrollStrategy = this.createScrollStrategy();
    this.positionStrategy = this.createPositionStrategy();
    this.ref = this.overlay.create({ positionStrategy: this.positionStrategy, scrollStrategy });
  }

  protected createPositionStrategy(): NbAdjustableConnectedPositionStrategy {
    return this.positionBuilder
      .connectedTo(this.hostRef)
      .position(NbPosition.BOTTOM)
      .offset(0)
      .adjustment(NbAdjustment.VERTICAL);
  }

  protected createScrollStrategy(): NbScrollStrategy {
    return this.overlay.scrollStrategies.block();
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
    this.triggerStrategy.hide$.subscribe(($event: Event) => {
      this.hide();
      if (!this.isClickedWithinComponent($event)) {
        this.onTouched();
      }
    });
  }

  protected subscribeOnPositionChange() {
    this.positionStrategy.positionChange
      .pipe(takeWhile(() => this.alive))
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
        switchMap((options: QueryList<NbOptionComponent<T>>) => {
          return merge(...options.map(option => option.click));
        }),
        takeWhile(() => this.alive),
      )
      .subscribe((clickedOption: NbOptionComponent<T>) => {
        this.handleOptionClick(clickedOption);
        this.selectionChange$.next(clickedOption);
      });
  }

  protected getContainer() {
    return this.ref && this.ref.hasAttached() && <ComponentRef<any>> {
      location: {
        nativeElement: this.ref.overlayElement,
      },
    };
  }

  /**
   * Propagate selected value.
   * */
  protected emitSelected(selected: T | T[]) {
    this.onChange(selected);
    this.selectedChange.emit(selected);
  }

  /**
   * Set selected value in model.
   * */
  protected setSelection(value: T | T[]) {
    const isArray: boolean = Array.isArray(value);

    if (this.multiple && !isArray) {
      throw new Error('Can\'t assign single value if select is marked as multiple');
    }

    if (!this.multiple && isArray) {
      throw new Error('Can\'t assign array if select is not marked as multiple');
    }

    const previouslySelectedOptions = this.selectionModel;
    this.selectionModel = [];

    if (isArray) {
      (<T[]> value).forEach((option: T) => this.selectValue(option));
    } else {
      this.selectValue(<T> value);
    }

    // find options which were selected before and trigger deselect
    previouslySelectedOptions
      .filter((option: NbOptionComponent<T>) => !this.selectionModel.includes(option))
      .forEach((option: NbOptionComponent<T>) => option.deselect());

    this.cd.markForCheck();
  }

  /**
   * Selects value.
   * */
  protected selectValue(value: T) {
    const corresponding = this.options.find((option: NbOptionComponent<T>) => option.value === value);

    if (corresponding) {
      corresponding.select();
      this.selectionModel.push(corresponding);
    }
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
}
