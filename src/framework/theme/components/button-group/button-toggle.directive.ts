/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  NgZone,
  Output,
  Renderer2,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { NbStatusService } from '../../services/status.service';
import { convertToBoolProperty, NbBooleanInput } from '../helpers';
import { NbButton, NbButtonAppearance } from '../button/base-button';

export type NbButtonToggleAppearance = Exclude<NbButtonAppearance, 'hero'>;

export interface NbButtonToggleChange {
  source: NbButtonToggleDirective;
  pressed: boolean;
}

/**
 * `[nbButtonToggle]` is a directive to add a `pressed` state to a button.
 */
@Directive({
  selector: 'button[nbButtonToggle]',
  providers: [
    { provide: NbButton, useExisting: NbButtonToggleDirective },
  ],
  exportAs: 'nbButtonToggle',
})
export class NbButtonToggleDirective extends NbButton {

  protected readonly _pressedChange$ = new Subject<NbButtonToggleChange>();

  get pressedChange$(): Observable<NbButtonToggleChange> {
    return this._pressedChange$.asObservable();
  }

  @Input() appearance: NbButtonToggleAppearance = 'filled';

  /**
   * Controls button pressed state
   **/
  @Input()
  @HostBinding('attr.aria-pressed')
  get pressed(): boolean {
    return this._pressed;
  }
  set pressed(value: boolean) {
    if (this.pressed !== convertToBoolProperty(value)) {
      this._pressed = !this.pressed;
      this.pressedChange.emit(this.pressed);
      this._pressedChange$.next({ source: this, pressed: this.pressed })
    }
  }
  protected _pressed: boolean = false;
  static ngAcceptInputType_pressed: NbBooleanInput;

  /**
   * Emits whenever button pressed state change
   **/
  @Output() readonly pressedChange = new EventEmitter<boolean>();

  @HostBinding('class.status-basic')
  get basic(): boolean {
    // By design, all toggle buttons should have a `basic` status when not pressed.
    return !this.pressed;
  }

  @HostBinding('class.status-primary')
  get primary(): boolean {
    return this.pressed && (this.status === 'basic' || this.status === 'primary');
  }

  @HostBinding('class.status-success')
  get success(): boolean {
    return this.pressed && this.status === 'success';
  }

  @HostBinding('class.status-info')
  get info(): boolean {
    return this.pressed && this.status === 'info';
  }

  @HostBinding('class.status-warning')
  get warning(): boolean {
    return this.pressed && this.status === 'warning';
  }

  @HostBinding('class.status-danger')
  get danger(): boolean {
    return this.pressed && this.status === 'danger';
  }

  @HostBinding('class.status-control')
  get control(): boolean {
    return this.pressed && this.status === 'control';
  }

  @HostBinding('class')
  get additionalClasses(): string[] {
    if (this.statusService.isCustomStatus(this.status)) {
      return [this.statusService.getStatusClass(this.status)];
    }
    return [];
  }

  @HostListener('click')
  onClick(): void {
    this.pressed = !this.pressed;
  }

  constructor(
    protected renderer: Renderer2,
    protected hostElement: ElementRef<HTMLElement>,
    protected cd: ChangeDetectorRef,
    protected zone: NgZone,
    protected statusService: NbStatusService,
  ) {
    super(renderer, hostElement, cd, zone, statusService);
  }

  /**
   * @docs-private
   */
  _updatePressed(value: boolean) {
    this.pressed = value;
    this.cd.markForCheck();
  }
}
