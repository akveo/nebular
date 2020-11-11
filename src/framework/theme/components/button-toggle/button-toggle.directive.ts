import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  Renderer2,
} from '@angular/core';
import { convertToBoolProperty, NbBooleanInput } from '../helpers';
import { NbBaseButtonDirective } from '../button/base-button.directive';

/**
 * The `NbButtonToggleDirective` is wrapper for button provides a capability to work as part of `NbButtonGroupComponent`
 */
@Directive({
  selector: 'button[nbButtonToggle]',
  providers: [
    { provide: NbBaseButtonDirective, useExisting: NbButtonToggleDirective },
  ],
})
export class NbButtonToggleDirective extends NbBaseButtonDirective {

  @Input()
  @HostBinding('attr.aria-pressed')
  get pressed(): boolean {
    return this._pressed;
  }
  set pressed(value: boolean) {
    this._pressed = convertToBoolProperty(value);
  }
  protected _pressed: boolean = false;
  static ngAcceptInputType_pressed: NbBooleanInput;

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

  constructor(
    protected renderer: Renderer2,
    protected hostElement: ElementRef<HTMLElement>,
    protected cd: ChangeDetectorRef,
    protected zone: NgZone,
  ) {
    super(renderer, hostElement, cd, zone);
  }
}
