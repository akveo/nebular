/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  Output,
  Renderer2,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { NbStatusService } from '../../services/status.service';
import { NbHighlightableOption } from '../cdk/a11y/descendant-key-manager';
import { convertToBoolProperty, NbBooleanInput } from '../helpers';
import { NbComponentOrCustomStatus } from '../component-status';
import { NbComponentSize } from '../component-size';

export type NbTagAppearance = 'filled' | 'outline';

export interface NbTagSelectionChange {
  tag: NbTagComponent;
  selected: boolean;
}

let tagUniqueId = 0;

/**
 *
 * To show a cross on a tag and enable `remove` event add the `removable` attribute.
 * @stacked-example(Removable tags, tag/tag-removable.component)
 *
 * You can change appearance via `appearance` input:
 * @stacked-example(Tag Appearance, tag/tag-appearance.component)
 *
 * You can change status via `status` input:
 * @stacked-example(Tag Status, tag/tag-status.component)
 *
 * @styles
 *
 * tag-text-font-family:
 * tag-text-transform:
 * tag-border-width:
 * tag-border-style:
 * tag-border-radius:
 * tag-tiny-text-font-size:
 * tag-tiny-text-font-weight:
 * tag-tiny-text-line-height:
 * tag-tiny-padding:
 * tag-tiny-close-offset:
 * tag-small-text-font-size:
 * tag-small-text-font-weight:
 * tag-small-text-line-height:
 * tag-small-padding:
 * tag-small-close-offset:
 * tag-medium-text-font-size:
 * tag-medium-text-font-weight:
 * tag-medium-text-line-height:
 * tag-medium-padding:
 * tag-medium-close-offset:
 * tag-large-text-font-size:
 * tag-large-text-font-weight:
 * tag-large-text-line-height:
 * tag-large-padding:
 * tag-large-close-offset:
 * tag-giant-text-font-size:
 * tag-giant-text-font-weight:
 * tag-giant-text-line-height:
 * tag-giant-padding:
 * tag-giant-close-offset:
 * tag-filled-basic-background-color:
 * tag-filled-basic-border-color:
 * tag-filled-basic-text-color:
 * tag-filled-basic-active-background-color:
 * tag-filled-basic-active-border-color:
 * tag-filled-basic-hover-background-color:
 * tag-filled-basic-hover-border-color:
 * tag-filled-basic-selected-background-color:
 * tag-filled-basic-selected-border-color:
 * tag-filled-primary-background-color:
 * tag-filled-primary-border-color:
 * tag-filled-primary-text-color:
 * tag-filled-primary-active-background-color:
 * tag-filled-primary-active-border-color:
 * tag-filled-primary-hover-background-color:
 * tag-filled-primary-hover-border-color:
 * tag-filled-primary-selected-background-color:
 * tag-filled-primary-selected-border-color:
 * tag-filled-success-background-color:
 * tag-filled-success-border-color:
 * tag-filled-success-text-color:
 * tag-filled-success-active-background-color:
 * tag-filled-success-active-border-color:
 * tag-filled-success-hover-background-color:
 * tag-filled-success-hover-border-color:
 * tag-filled-success-selected-background-color:
 * tag-filled-success-selected-border-color:
 * tag-filled-info-background-color:
 * tag-filled-info-border-color:
 * tag-filled-info-text-color:
 * tag-filled-info-active-background-color:
 * tag-filled-info-active-border-color:
 * tag-filled-info-hover-background-color:
 * tag-filled-info-hover-border-color:
 * tag-filled-info-selected-background-color:
 * tag-filled-info-selected-border-color:
 * tag-filled-warning-background-color:
 * tag-filled-warning-border-color:
 * tag-filled-warning-text-color:
 * tag-filled-warning-active-background-color:
 * tag-filled-warning-active-border-color:
 * tag-filled-warning-hover-background-color:
 * tag-filled-warning-hover-border-color:
 * tag-filled-warning-selected-background-color:
 * tag-filled-warning-selected-border-color:
 * tag-filled-danger-background-color:
 * tag-filled-danger-border-color:
 * tag-filled-danger-text-color:
 * tag-filled-danger-active-background-color:
 * tag-filled-danger-active-border-color:
 * tag-filled-danger-hover-background-color:
 * tag-filled-danger-hover-border-color:
 * tag-filled-danger-selected-background-color:
 * tag-filled-danger-selected-border-color:
 * tag-filled-control-background-color:
 * tag-filled-control-border-color:
 * tag-filled-control-text-color:
 * tag-filled-control-active-background-color:
 * tag-filled-control-active-border-color:
 * tag-filled-control-hover-background-color:
 * tag-filled-control-hover-border-color:
 * tag-filled-control-selected-background-color:
 * tag-filled-control-selected-border-color:
 * tag-outline-basic-background-color:
 * tag-outline-basic-border-color:
 * tag-outline-basic-text-color:
 * tag-outline-basic-active-background-color:
 * tag-outline-basic-active-border-color:
 * tag-outline-basic-active-text-color:
 * tag-outline-basic-hover-background-color:
 * tag-outline-basic-hover-border-color:
 * tag-outline-basic-hover-text-color:
 * tag-outline-basic-selected-background-color:
 * tag-outline-basic-selected-border-color:
 * tag-outline-basic-selected-text-color:
 * tag-outline-primary-background-color:
 * tag-outline-primary-border-color:
 * tag-outline-primary-text-color:
 * tag-outline-primary-active-background-color:
 * tag-outline-primary-active-border-color:
 * tag-outline-primary-active-text-color:
 * tag-outline-primary-hover-background-color:
 * tag-outline-primary-hover-border-color:
 * tag-outline-primary-hover-text-color:
 * tag-outline-primary-selected-background-color:
 * tag-outline-primary-selected-border-color:
 * tag-outline-primary-selected-text-color:
 * tag-outline-success-background-color:
 * tag-outline-success-border-color:
 * tag-outline-success-text-color:
 * tag-outline-success-active-background-color:
 * tag-outline-success-active-border-color:
 * tag-outline-success-active-text-color:
 * tag-outline-success-hover-background-color:
 * tag-outline-success-hover-border-color:
 * tag-outline-success-hover-text-color:
 * tag-outline-success-selected-background-color:
 * tag-outline-success-selected-border-color:
 * tag-outline-success-selected-text-color:
 * tag-outline-info-background-color:
 * tag-outline-info-border-color:
 * tag-outline-info-text-color:
 * tag-outline-info-active-background-color:
 * tag-outline-info-active-border-color:
 * tag-outline-info-active-text-color:
 * tag-outline-info-hover-background-color:
 * tag-outline-info-hover-border-color:
 * tag-outline-info-hover-text-color:
 * tag-outline-info-selected-background-color:
 * tag-outline-info-selected-border-color:
 * tag-outline-info-selected-text-color:
 * tag-outline-warning-background-color:
 * tag-outline-warning-border-color:
 * tag-outline-warning-text-color:
 * tag-outline-warning-active-background-color:
 * tag-outline-warning-active-border-color:
 * tag-outline-warning-active-text-color:
 * tag-outline-warning-hover-background-color:
 * tag-outline-warning-hover-border-color:
 * tag-outline-warning-hover-text-color:
 * tag-outline-warning-selected-background-color:
 * tag-outline-warning-selected-border-color:
 * tag-outline-warning-selected-text-color:
 * tag-outline-danger-background-color:
 * tag-outline-danger-border-color:
 * tag-outline-danger-text-color:
 * tag-outline-danger-active-background-color:
 * tag-outline-danger-active-border-color:
 * tag-outline-danger-active-text-color:
 * tag-outline-danger-hover-background-color:
 * tag-outline-danger-hover-border-color:
 * tag-outline-danger-hover-text-color:
 * tag-outline-danger-selected-background-color:
 * tag-outline-danger-selected-border-color:
 * tag-outline-danger-selected-text-color:
 * tag-outline-control-background-color:
 * tag-outline-control-border-color:
 * tag-outline-control-text-color:
 * tag-outline-control-active-background-color:
 * tag-outline-control-active-border-color:
 * tag-outline-control-active-text-color:
 * tag-outline-control-hover-background-color:
 * tag-outline-control-hover-border-color:
 * tag-outline-control-hover-text-color:
 * tag-outline-control-selected-background-color:
 * tag-outline-control-selected-border-color:
 * tag-outline-control-selected-text-color:
 */
@Component({
  selector: 'nb-tag',
  templateUrl: './tag.component.html',
  exportAs: 'nbTag',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbTagComponent implements AfterViewInit, OnDestroy, NbHighlightableOption {

  private _destroy$: Subject<NbTagComponent> = new Subject<NbTagComponent>();

  get destroy$(): Observable<NbTagComponent> {
    return this._destroy$.asObservable();
  }

  /**
   * Tag text.
   */
  @Input() text: string;

  @Input()
  @HostBinding('class.selected')
  @HostBinding('attr.aria-selected')
  get selected(): boolean {
    return this._selected;
  }
  set selected(value: boolean) {
    if (this.selected !== convertToBoolProperty(value)) {
      this._selected = !this.selected;
      this.selectedChange.emit({ tag: this, selected: this.selected });
    }
  }
  protected _selected: boolean = false;
  static ngAcceptInputType_selected: NbBooleanInput;

  /**
   * Controls whether the user can remove a tag or not.
   */
  @Input()
  get removable(): boolean {
    return this._removable;
  }
  set removable(value: boolean) {
    this._removable = convertToBoolProperty(value);
  }
  protected _removable: boolean = false;
  static ngAcceptInputType_removable: NbBooleanInput;

  /**
   * Tag appearance: `filled`, `outline`.
   */
  @Input() appearance: NbTagAppearance = 'filled';

  /**
   * Tag status: `basic`, `primary`, `info`, `success`, `warning`, `danger`, `control`.
   */
  @Input() status: NbComponentOrCustomStatus = 'basic';

  /**
   * Tag size: `tiny`, `small`, `medium`, `large`, `giant`.
   */
  @Input() size: NbComponentSize = 'medium';

  @Input()
  @HostBinding('attr.role')
  role: string = 'option';

  /**
   * Emits when the user removes the tag
   * (whether by clicking on the remove button or by pressing `delete` or `backspace` key).
   */
  @Output() readonly remove: EventEmitter<NbTagComponent> = new EventEmitter<NbTagComponent>();

  @Output() readonly selectedChange: EventEmitter<NbTagSelectionChange> = new EventEmitter<NbTagSelectionChange>();

  @HostBinding('class.active')
  _isActive: boolean = false;

  @HostBinding('attr.id')
  _id: string = `nb-tag-${tagUniqueId++}`;

  @HostBinding('class.appearance-filled')
  get filled(): boolean {
    return this.appearance === 'filled';
  }
  set filled(value: boolean) {
    if (convertToBoolProperty(value)) {
      this.appearance = 'filled';
    }
  }

  @HostBinding('class.appearance-outline')
  get outline(): boolean {
    return this.appearance === 'outline';
  }
  set outline(value: boolean) {
    if (convertToBoolProperty(value)) {
      this.appearance = 'outline';
    }
  }

  @HostBinding('class.status-basic')
  get basic() {
    return this.status === 'basic';
  }

  @HostBinding('class.status-primary')
  get primary() {
    return this.status === 'primary';
  }

  @HostBinding('class.status-success')
  get success() {
    return this.status === 'success';
  }

  @HostBinding('class.status-info')
  get info() {
    return this.status === 'info';
  }

  @HostBinding('class.status-warning')
  get warning() {
    return this.status === 'warning';
  }

  @HostBinding('class.status-danger')
  get danger() {
    return this.status === 'danger';
  }

  @HostBinding('class.status-control')
  get control() {
    return this.status === 'control';
  }

  @HostBinding('class.size-tiny')
  get tiny() {
    return this.size === 'tiny';
  }

  @HostBinding('class.size-small')
  get small() {
    return this.size === 'small';
  }

  @HostBinding('class.size-medium')
  get medium() {
    return this.size === 'medium';
  }

  @HostBinding('class.size-large')
  get large() {
    return this.size === 'large';
  }

  @HostBinding('class.size-giant')
  get giant() {
    return this.size === 'giant';
  }

  @HostBinding('class')
  get additionalClasses(): string[] {
    if (this.statusService.isCustomStatus(this.status)) {
      return [this.statusService.getStatusClass(this.status)];
    }
    return [];
  }

  @HostListener('keydown.delete')
  @HostListener('keydown.backspace')
  _remove(): void {
    if (this.removable) {
      this.remove.emit(this);
    }
  }

  constructor(
    public _hostElement: ElementRef,
    protected cd: ChangeDetectorRef,
    protected renderer: Renderer2,
    protected zone: NgZone,
    protected statusService: NbStatusService,
  ) {}

  ngAfterViewInit() {
    // TODO: #2254
    this.zone.runOutsideAngular(() => setTimeout(() => {
      this.renderer.addClass(this._hostElement.nativeElement, 'nb-transition');
    }));
  }

  ngOnDestroy() {
    this._destroy$.next(this);
  }

  _toggleSelection(): void {
    this.selected = !this.selected;
    this.cd.markForCheck();
  }

  setActiveStyles(): void {
    if (!this._isActive) {
      this._isActive = true;
      this.cd.markForCheck();
    }
  }

  setInactiveStyles(): void {
    if (this._isActive) {
      this._isActive = false;
      this.cd.markForCheck();
    }
  }
}
