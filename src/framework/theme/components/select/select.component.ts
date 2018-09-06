/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterViewInit,
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

import {
  NbAdjustableConnectedPositionStrategy,
  NbAdjustment,
  NbOverlayRef,
  NbOverlayService,
  NbPortalDirective,
  NbPosition,
  NbPositionBuilderService,
  NbTrigger,
  NbTriggerStrategy,
  NbTriggerStrategyBuilder,
} from '../cdk';
import { defer, merge, Observable } from 'rxjs';
import { NB_SELECT, NbOptionComponent } from './option.component';
import { NB_DOCUMENT } from '../../theme.options';
import { convertToBoolProperty } from '../helpers';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'nb-select-label',
  template: '<ng-content></ng-content>',
})
export class NbSelectLabelComponent {
}

@Component({
  selector: 'nb-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    { provide: NB_SELECT, useExisting: NbSelectComponent },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NbSelectComponent),
      multi: true,
    },
  ],
})
export class NbSelectComponent<T> implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  /**
   * Button size, available sizes:
   * `xxsmall`, `xsmall`, `small`, `medium`, `large`
   * @param {string} val
   */
  @Input() size: string;

  /**
   * Button status (adds specific styles):
   * `primary`, `info`, `success`, `warning`, `danger`
   * @param {string} val
   */
  @Input() status: string = 'primary';

  /**
   * Button shapes: `rectangle`, `round`, `semi-round`
   * @param {string} val
   */
  @Input() shape: string;

  /**
   * Adds `hero` styles
   * @param {boolean} val
   */
  @Input() hero: boolean;

  /**
   * Disables the button
   * @param {boolean} val
   */
  @Input() disabled: boolean;

  /**
   * If set element will fill its container
   * @param {boolean}
   */
  @Input() fullWidth: boolean;

  /**
   * Adds `outline` styles
   * @param {boolean} val
   */
  @Input() outline: boolean;
  @Output() selectedChange: EventEmitter<T | T[]> = new EventEmitter();
  multi: boolean = false;
  @Input() placeholder: string = '';
  @ContentChildren(NbOptionComponent, { descendants: true }) options: QueryList<NbOptionComponent<T>>;
  @ContentChild(NbSelectLabelComponent) customLabel;
  @ViewChild(NbPortalDirective) portal: NbPortalDirective;
  selectionModel: NbOptionComponent<T>[] = [];
  positionStrategy: NbAdjustableConnectedPositionStrategy;
  // because of we have to toggle overlayPosition in [ngClass] direction and this directive can use only string.
  overlayPosition: NbPosition = '' as NbPosition;
  selectionChange: Observable<NbOptionComponent<T>> = defer(() => {
    return merge(...this.options.map(it => it.selectionChange));
  });
  ref: NbOverlayRef;
  onChange: any = () => {
  };

  constructor(@Inject(NB_DOCUMENT) protected document,
              protected overlay: NbOverlayService,
              protected hostRef: ElementRef,
              protected positionBuilder: NbPositionBuilderService) {
  }

  @Input('selected')
  set _selected(value: T | T[]) {
    this.writeValue(value);
  }

  @Input('multi')
  set _multi(multi: boolean) {
    this.multi = convertToBoolProperty(multi);
  }

  get isOpened(): boolean {
    return this.ref && this.ref.hasAttached();
  }

  get hostWidth(): number {
    return this.hostRef.nativeElement.getBoundingClientRect().width;
  }

  get selectionView() {
    if (!this.selectionModel.length) {
      return this.placeholder;
    }

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
    this.selectionChange.subscribe((option: NbOptionComponent<T>) => this.handleSelect(option));
  }

  ngOnDestroy() {
    this.ref.dispose();
  }

  show() {
    if (this.ref.hasAttached()) {
      return;
    }

    this.ref.attach(this.portal);
  }

  hide() {
    this.ref.detach();
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
    }
  }

  protected handleSelect(option: NbOptionComponent<T>) {
    if (option.value) {
      this.selectOption(option);
    } else {
      this.reset();
    }
  }

  protected reset() {
    this.selectionModel.forEach((option: NbOptionComponent<T>) => option.deselect());
    this.selectionModel = [];
    this.hide();
    this.emitSelected(null);
  }

  protected selectOption(option: NbOptionComponent<T>) {
    if (this.multi) {
      this.handleMultipleSelect(option);
    } else {
      this.handleSingleSelect(option);
    }
  }

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

  protected createScrollStrategy() {
    return this.overlay.scrollStrategies.block();
  }

  protected subscribeOnTriggers() {
    const triggerStrategy: NbTriggerStrategy = new NbTriggerStrategyBuilder()
      .document(this.document)
      .trigger(NbTrigger.CLICK)
      .host(this.hostRef.nativeElement)
      .container(() => this.getContainer())
      .build();

    triggerStrategy.show$.subscribe(() => this.show());
    triggerStrategy.hide$.subscribe(() => this.hide());
  }

  protected subscribeOnPositionChange() {
    this.positionStrategy.positionChange
      .subscribe((position: NbPosition) => this.overlayPosition = position);
  }

  protected getContainer() {
    return this.ref && this.ref.hasAttached() && <ComponentRef<any>> {
      location: {
        nativeElement: this.ref.overlayElement,
      },
    };
  }

  protected emitSelected(selected: T | T[]) {
    this.onChange(selected);
    this.selectedChange.emit(selected);
  }

  protected setSelection(value: T | T[]) {
    const isArray: boolean = Array.isArray(value);

    if (this.multi && !isArray) {
      throw new Error('Can\'t assign single value if select is multi');
    }

    if (!this.multi && isArray) {
      throw new Error('Can\'t assign array if select is single');
    }

    if (isArray) {
      (<T[]> value).forEach((option: T) => this.selectValue(option));
    } else {
      this.selectValue(<T> value);
    }
  }

  protected selectValue(value: T) {
    const corresponding = this.options.find((option: NbOptionComponent<T>) => option.value === value);
    corresponding.select();
  }
}
