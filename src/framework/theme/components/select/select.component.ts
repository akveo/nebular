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
import { take, takeWhile } from 'rxjs/operators';
import { defer, merge, Observable } from 'rxjs';

import {
  NbAdjustableConnectedPositionStrategy,
  NbAdjustment,
  NbOverlayRef,
  NbOverlayService,
  NbPortalDirective,
  NbPosition,
  NbPositionBuilderService, NbScrollStrategy,
  NbTrigger,
  NbTriggerStrategy,
  NbTriggerStrategyBuilder,
} from '../cdk';
import { NbOptionComponent } from './option.component';
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
 * If you want to use it as the multi-select control you have to mark it as `multiple`.
 * In this case, `nb-select` will work only with arrays - accept arrays and propagate arrays.
 *
 * @stacked-example(Multiple, select/select-multiple.component)
 *
 * Items without values will clean selection.
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
 * There are three select sizes:
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

  /**
   * Stream of events that will fire when one of the options fire selectionChange event.
   * */
  selectionChange: Observable<NbOptionComponent<T>> = defer(() => {
    return merge(...this.options.map(it => it.selectionChange));
  });

  protected ref: NbOverlayRef;

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

  constructor(@Inject(NB_DOCUMENT) protected document,
              protected overlay: NbOverlayService,
              protected hostRef: ElementRef,
              protected positionBuilder: NbPositionBuilderService,
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

  ngAfterViewInit() {
    this.subscribeOnTriggers();
    this.subscribeOnPositionChange();
    this.subscribeOnSelectionChange();
  }

  ngAfterContentInit() {
    if (this.queue) {
      this.writeValue(this.queue);
    }
  }

  ngOnDestroy() {
    this.ref.dispose();
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
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(value: T | T[]): void {
    if (!value) {
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
  protected handleSelect(option: NbOptionComponent<T>) {
    if (option.value) {
      this.selectOption(option);
    } else {
      this.reset();
    }

    this.cd.detectChanges();
  }

  /**
   * Deselect all selected options.
   * */
  protected reset() {
    this.selectionModel.forEach((option: NbOptionComponent<T>) => option.deselect());
    this.selectionModel = [];
    this.hide();
    this.emitSelected(null);
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

  protected subscribeOnTriggers() {
    const triggerStrategy: NbTriggerStrategy = new NbTriggerStrategyBuilder()
      .document(this.document)
      .trigger(NbTrigger.CLICK)
      .host(this.hostRef.nativeElement)
      .container(() => this.getContainer())
      .build();

    triggerStrategy.show$
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.show());

    triggerStrategy.hide$
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.hide());
  }

  protected subscribeOnPositionChange() {
    this.positionStrategy.positionChange
      .pipe(takeWhile(() => this.alive))
      .subscribe((position: NbPosition) => this.overlayPosition = position);

    this.positionStrategy.positionChange
      .pipe(take(1))
      .subscribe(() => this.cd.detectChanges());
  }

  protected subscribeOnSelectionChange() {
    this.selectionChange
      .pipe(takeWhile(() => this.alive))
      .subscribe((option: NbOptionComponent<T>) => this.handleSelect(option));
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

    this.cleanSelection();

    if (isArray) {
      (<T[]> value).forEach((option: T) => this.selectValue(option));
    } else {
      this.selectValue(<T> value);
    }

    this.cd.markForCheck();
    this.cd.detectChanges();
  }

  protected cleanSelection() {
    this.selectionModel.forEach((option: NbOptionComponent<T>) => option.deselect());
    this.selectionModel = [];
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
}
