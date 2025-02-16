/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { from, merge, Observable, Subject } from 'rxjs';
import { debounceTime, filter, startWith, switchMap, takeUntil } from 'rxjs/operators';

import { NbStatusService } from '../../services/status.service';
import { convertToBoolProperty, NbBooleanInput } from '../helpers';
import { NbComponentSize } from '../component-size';
import { NbComponentShape } from '../component-shape';
import { NbComponentOrCustomStatus } from '../component-status';
import { NbButton } from '../button/base-button';
import { NbButtonToggleAppearance, NbButtonToggleChange, NbButtonToggleDirective } from './button-toggle.directive';
import { NB_BUTTON_GROUP } from './button-group-injection-tokens';

/**
 * `<nb-button-group>` visually groups buttons together and allow to control buttons properties and the state as a
 * group.
 * @stacked-example(Button Group Showcase, button-group/button-group-showcase.component)
 *
 * ### Installation
 *
 * Import `NbButtonGroupModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbButtonGroupModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 *
 * ### Usage
 *
 * You can use `<nb-button-group>` to group a series of `[nbButton]` or `[nbButtonToggle]` components.
 * @stacked-example(Button and Button Toggle Groups, button-group/button-and-button-toggle-groups.component)
 *
 * For a group of multiple `[nbButtonToggle]` you also can control multi-selection behavior. By default, the group
 * component allows only one pressed button toggle at a time (similar to the radio group). To be able to keep multiple
 * toggles pressed, you need to add `multiple` attributes to the `<nb-button-toggle>`.
 * @stacked-example(Button Group Multiple, button-group/button-group-multiple.component)
 *
 * To know which buttons are currently pressed listen to `(valueChange)` on the `nb-button-group`. Event
 * contains an array of values of currently pressed button toggles. You can assign a value to the
 * `[nbButtonToggle]` via the `value` input.
 * @stacked-example(Button Group Value Change, button-group/button-group-value-change.component)
 *
 * To disable a group of buttons, add a `disabled` attribute to the `<nb-button-group>`.
 * @stacked-example(Button Group Disabled, button-group/button-group-disabled.component)
 *
 * The group component controls all visual attributes of buttons such as `appearance`, `status`, `size`, `shape`.
 * You can change it via the appropriate attributes.
 *
 * Button group appearances:
 * @stacked-example(Button Group Appearances, button-group/button-group-appearances.component)
 *
 * Button group statuses:
 * @stacked-example(Button Group Statuses, button-group/button-group-statuses.component)
 *
 * Button group sizes:
 * @stacked-example(Button Group Sizes, button-group/button-group-sizes.component)
 *
 * Buttons group shapes:
 * @additional-example(Button Group Shapes, button-group/button-group-shapes.component)
 *
 * @styles
 *
 * button-group-filled-button-basic-text-color:
 * button-group-filled-button-primary-text-color:
 * button-group-filled-button-success-text-color:
 * button-group-filled-button-info-text-color:
 * button-group-filled-button-warning-text-color:
 * button-group-filled-button-danger-text-color:
 * button-group-filled-button-control-text-color:
 * button-group-filled-basic-divider-color:
 * button-group-filled-primary-divider-color:
 * button-group-filled-success-divider-color:
 * button-group-filled-info-divider-color:
 * button-group-filled-warning-divider-color:
 * button-group-filled-danger-divider-color:
 * button-group-filled-control-divider-color:
 * button-group-ghost-divider-color:
 **/
@Component({
    selector: 'nb-button-group',
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: NB_BUTTON_GROUP, useExisting: NbButtonGroupComponent }],
    standalone: false
})
export class NbButtonGroupComponent implements OnChanges, AfterContentInit {
  protected lastEmittedValue: any[] = [];

  protected readonly destroy$: Subject<void> = new Subject<void>();
  protected readonly buttonsChange$ = new Subject<NbButton[]>();

  @ContentChildren(NbButton) readonly buttons: QueryList<NbButton>;

  /**
   * Button group size, available sizes:
   * `tiny`, `small`, `medium`, `large`, `giant`
   */
  @Input() size: NbComponentSize = 'medium';

  /**
   * Button group status (adds specific styles):
   * `basic`, `primary`, `info`, `success`, `warning`, `danger`, `control`
   */
  @Input() status: NbComponentOrCustomStatus = 'basic';

  /**
   * Button group shapes: `rectangle`, `round`, `semi-round`
   */
  @Input() shape: NbComponentShape = 'rectangle';

  /**
   * Button group appearance: `filled`, `outline`, `ghost`
   */
  @Input() appearance: NbButtonToggleAppearance = 'filled';

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    if (this.disabled !== convertToBoolProperty(value)) {
      this._disabled = !this.disabled;
    }
  }
  protected _disabled = false;
  static ngAcceptInputType_disabled: NbBooleanInput;

  /**
   * Allows to keep multiple button toggles pressed. Off by default.
   */
  @Input()
  get multiple(): boolean {
    return this._multiple;
  }
  set multiple(value: boolean) {
    this._multiple = convertToBoolProperty(value);
  }
  protected _multiple: boolean = false;
  static ngAcceptInputType_multiple: NbBooleanInput;

  /**
   * Sets `filled` appearance
   */
  @Input()
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
   * Sets `outline` appearance
   */
  @Input()
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
   * Sets `ghost` appearance
   */
  @Input()
  get ghost(): boolean {
    return this.appearance === 'ghost';
  }
  set ghost(value: boolean) {
    if (convertToBoolProperty(value)) {
      this.appearance = 'ghost';
    }
  }
  static ngAcceptInputType_ghost: NbBooleanInput;

  /**
   * Emits when `nbButtonToggle` pressed state change. `$event` contains an array of the currently pressed button
   * toggles.
   */
  @Output() valueChange = new EventEmitter<any[]>();

  @HostBinding('attr.role') role = 'group';

  @HostBinding('class')
  get additionalClasses(): string[] {
    if (this.statusService.isCustomStatus(this.status)) {
      return [this.statusService.getStatusClass(this.status)];
    }
    return [];
  }

  constructor(protected cd: ChangeDetectorRef, protected statusService: NbStatusService) {}

  ngOnChanges({ size, status, shape, multiple, filled, outline, ghost, disabled }: SimpleChanges) {
    if (size || status || shape || multiple || filled || outline || ghost || disabled) {
      this.syncButtonsProperties(this.buttons?.toArray() || []);
    }
  }

  ngAfterContentInit(): void {
    this.buttonsChange$.pipe(takeUntil(this.destroy$)).subscribe((buttons: NbButton[]) => {
      this.listenButtonPressedState(buttons);
      this.syncButtonsProperties(buttons);
    });

    this.buttons.changes
      .pipe(
        // `buttons.changes` emit during change detection run after projected content already was initialized.
        // So at this time, it's too late to update projected buttons properties as updating bindings after
        // initialization doesn't make sense. Changes won't be picked up and should cause an "expression changed" error.
        // Instead, we wrap the new buttons list into a promise to defer update to the following microtask and also to
        // trigger change detection one more time.
        switchMap((buttons: QueryList<NbButton>) => from(Promise.resolve(buttons.toArray()))),
        takeUntil(this.destroy$),
      )
      .subscribe(this.buttonsChange$);

    this.buttonsChange$.next(this.buttons.toArray());
  }

  protected listenButtonPressedState(buttons: NbButton[]): void {
    const toggleButtons: NbButtonToggleDirective[] = buttons.filter((button: NbButton) => {
      return button instanceof NbButtonToggleDirective;
    }) as NbButtonToggleDirective[];

    if (!toggleButtons.length) {
      return;
    }

    const buttonsPressedChange$: Observable<NbButtonToggleChange>[] = toggleButtons.map(
      (button: NbButtonToggleDirective) => button.pressedChange$,
    );

    merge(...buttonsPressedChange$)
      .pipe(
        filter(({ pressed }: NbButtonToggleChange) => !this.multiple && pressed),
        takeUntil(merge(this.buttonsChange$, this.destroy$)),
      )
      .subscribe(({ source }: NbButtonToggleChange) => {
        toggleButtons
          .filter((button: NbButtonToggleDirective) => button !== source)
          .forEach((button: NbButtonToggleDirective) => button._updatePressed(false));
      });

    merge(...buttonsPressedChange$)
      .pipe(
        // Use startWith to emit if some buttons are initially pressed.
        startWith(''),
        // Use debounce to emit change once when pressed state change in multiple button toggles.
        debounceTime(0),
        takeUntil(merge(this.buttonsChange$, this.destroy$)),
      )
      .subscribe(() => this.emitCurrentValue(toggleButtons));
  }

  protected syncButtonsProperties(buttons: NbButton[]): void {
    buttons.forEach((button: NbButton) => {
      button.updateProperties({
        appearance: this.appearance,
        size: this.size,
        status: this.status,
        shape: this.shape,
        disabled: this.disabled,
      });
    });
  }

  protected emitCurrentValue(toggleButtons: NbButtonToggleDirective[]): void {
    const pressedToggleValues = toggleButtons
      .filter((b: NbButtonToggleDirective) => b.pressed && typeof b.value !== 'undefined')
      .map((b: NbButtonToggleDirective) => b.value);

    // Prevent multiple emissions of empty value.
    if (pressedToggleValues.length === 0 && this.lastEmittedValue.length === 0) {
      return;
    }

    this.valueChange.emit(pressedToggleValues);
    this.lastEmittedValue = pressedToggleValues;
  }
}
