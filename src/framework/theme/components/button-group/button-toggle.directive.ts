import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  Renderer2,
} from '@angular/core';
import { NbButtonAppearance } from '../button/button.component';
import { NbComponentSize } from '../component-size';
import { NbComponentStatus } from '../component-status';
import { NbComponentShape } from '../component-shape';
import { convertToBoolProperty, firstChildNotComment, lastChildNotComment, NbBooleanInput } from '../helpers';

/**
 * The `NbButtonToggleDirective` is wrapper for button provides a capability to work as part of `NbButtonGroupComponent`
 */
@Directive({
  selector: 'button[nbButtonToggle]',
})
export class NbButtonToggleDirective {
  clicked: boolean;
  /**
   * Button size, available sizes:
   * `tiny`, `small`, `medium`, `large`, `giant`
   * @docs-private
   */
  @Input() size: NbComponentSize = 'medium';

  /**
   * Button status (adds specific styles):
   * `primary`, `info`, `success`, `warning`, `danger`
   * @docs-private
   */
  @Input() status: NbComponentStatus = 'basic';

  /**
   * Button shapes: `rectangle`, `round`, `semi-round`
   * @docs-private
   */
  @Input() shape: NbComponentShape = 'rectangle';

  /**
   * Button appearance: `filled`, `outline`, `ghost`, `hero`
   * @docs-private
   */
  @Input() appearance: NbButtonAppearance = 'filled';

  /**
   * Sets `filled` appearance
   * @docs-private
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
   * Sets `outline` appearance
   * @docs-private
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
   * Sets `ghost` appearance
   * @docs-private
   */
  @Input()
  @HostBinding('class.appearance-ghost')
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
   * If set element will fill its container
   * @docs-private
   */
  @Input()
  @HostBinding('class.full-width')
  get fullWidth(): boolean {
    return this._fullWidth;
  }

  set fullWidth(value: boolean) {
    this._fullWidth = convertToBoolProperty(value);
  }

  private _fullWidth = false;
  static ngAcceptInputType_fullWidth: NbBooleanInput;

  /**
   * Disables the button
   * @docs-private
   */
  @Input()
  @HostBinding('attr.aria-disabled')
  @HostBinding('class.btn-disabled')
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = convertToBoolProperty(value);
    this.renderer.setProperty(this.hostElement.nativeElement, 'disabled', this.disabled);
  }

  private _disabled: boolean = false;
  static ngAcceptInputType_disabled: NbBooleanInput;


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

  @HostBinding('class.status-primary')
  get primary() {
    return this.status === 'primary' && this.clicked || this.status === 'basic' && this.clicked;
  }

  @HostBinding('class.status-info')
  get info() {
    return this.status === 'info' && this.clicked;
  }

  @HostBinding('class.status-success')
  get success() {
    return this.status === 'success' && this.clicked;
  }

  @HostBinding('class.status-warning')
  get warning() {
    return this.status === 'warning' && this.clicked;
  }

  @HostBinding('class.status-danger')
  get danger() {
    return this.status === 'danger' && this.clicked;
  }

  @HostBinding('class.status-basic')
  get basic() {
    return this.status === 'basic' || !this.clicked;
  }

  @HostBinding('class.status-control')
  get control() {
    return this.status === 'control' && this.clicked;
  }

  @HostBinding('class.shape-rectangle')
  get rectangle() {
    return this.shape === 'rectangle';
  }

  @HostBinding('class.shape-round')
  get round() {
    return this.shape === 'round';
  }

  @HostBinding('class.shape-semi-round')
  get semiRound() {
    return this.shape === 'semi-round';
  }

  @HostBinding('class.icon-start')
  get iconLeft(): boolean {
    const el = this.hostElement.nativeElement;
    const icon = this.iconElement;
    return !!(icon && firstChildNotComment(el) === icon);
  }

  @HostBinding('class.icon-end')
  get iconRight(): boolean {
    const el = this.hostElement.nativeElement;
    const icon = this.iconElement;
    return !!(icon && lastChildNotComment(el) === icon);
  }

  constructor(
    protected renderer: Renderer2,
    protected hostElement: ElementRef<HTMLElement>,
    protected cd: ChangeDetectorRef,
    protected zone: NgZone) {
  }

  protected get iconElement() {
    const el = this.hostElement.nativeElement;
    return el.querySelector('nb-icon');
  }
}
