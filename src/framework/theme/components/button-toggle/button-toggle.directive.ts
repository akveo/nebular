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

  @HostBinding('class.status-primary')
  get primary() {
    // If user sets status basic, pressed button should be primary
    return this.status === 'primary' && this.pressed || this.status === 'basic' && this.pressed;
  }

  @HostBinding('class.status-info')
  get info() {
    return this.status === 'info' && this.pressed;
  }

  @HostBinding('class.status-success')
  get success() {
    return this.status === 'success' && this.pressed;
  }

  @HostBinding('class.status-warning')
  get warning() {
    return this.status === 'warning' && this.pressed;
  }

  @HostBinding('class.status-danger')
  get danger() {
    return this.status === 'danger' && this.pressed;
  }

  @HostBinding('class.status-basic')
  get basic() {
    return this.status === 'basic' || !this.pressed;
  }

  @HostBinding('class.status-control')
  get control() {
    return this.status === 'control' && this.pressed;
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
