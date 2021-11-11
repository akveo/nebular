import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostBinding,
  Input,
  NgZone,
  QueryList,
  Renderer2,
} from '@angular/core';

import { NbStatusService } from '../../services/status.service';
import { convertToBoolProperty, NbBooleanInput } from '../helpers';
import { NbComponentSize } from '../component-size';
import { NbComponentOrCustomStatus } from '../component-status';
import { NbComponentShape } from '../component-shape';
import { NbIconComponent } from '../icon/icon.component';

export type NbButtonAppearance = 'filled' | 'outline' | 'ghost' | 'hero';

export type NbButtonProperties = Pick<NbButton, 'appearance' | 'size' | 'shape' | 'status' | 'disabled'> & Object;

@Directive()
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export abstract class NbButton implements AfterContentChecked, AfterViewInit {
  /**
   * Button size, available sizes:
   * `tiny`, `small`, `medium`, `large`, `giant`
   */
  @Input() size: NbComponentSize = 'medium';

  /**
   * Button status (adds specific styles):
   * `primary`, `info`, `success`, `warning`, `danger`
   */
  @Input() status: NbComponentOrCustomStatus = 'basic';

  /**
   * Button shapes: `rectangle`, `round`, `semi-round`
   */
  @Input() shape: NbComponentShape = 'rectangle';

  /**
   * Button appearance: `filled`, `outline`, `ghost`, `hero`
   */
  @Input() appearance: NbButtonAppearance = 'filled';

  /**
   * Sets `filled` appearance
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
   */
  @Input()
  @HostBinding('attr.aria-disabled')
  @HostBinding('class.btn-disabled')
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    if (this.disabled !== convertToBoolProperty(value)) {
      this._disabled = !this.disabled;
      this.renderer.setProperty(this.hostElement.nativeElement, 'disabled', this.disabled);
    }
  }
  private _disabled: boolean = false;
  static ngAcceptInputType_disabled: NbBooleanInput;

  /**
   * Tabindex of the button.
   */
  @Input() tabIndex: number;

  // issue #794
  @HostBinding('attr.tabindex')
  get tabbable(): string {
    if (this.disabled) {
      return '-1';
    }

    if (this.tabIndex == null) {
      return '0';
    }

    return this.tabIndex.toString();
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

  @HostBinding('class.icon-start') iconLeft = false;

  @HostBinding('class.icon-end') iconRight = false;

  @HostBinding('class')
  get additionalClasses(): string[] {
    if (this.statusService.isCustomStatus(this.status)) {
      return [this.statusService.getStatusClass(this.status)];
    }
    return [];
  }

  @ContentChildren(NbIconComponent, { read: ElementRef }) icons: QueryList<ElementRef>;

  protected constructor(
    protected renderer: Renderer2,
    protected hostElement: ElementRef<HTMLElement>,
    protected cd: ChangeDetectorRef,
    protected zone: NgZone,
    protected statusService: NbStatusService,
  ) {
  }

  ngAfterContentChecked() {
    const firstNode = this.nodes[0];
    const lastNode = this.nodes[this.nodes.length - 1];

    this.iconLeft = this.isIconExist(firstNode);
    this.iconRight = this.isIconExist(lastNode);
  }

  ngAfterViewInit() {
    // TODO: #2254
    this.zone.runOutsideAngular(() => setTimeout(() => {
      this.renderer.addClass(this.hostElement.nativeElement, 'nb-transition');
    }));
  }

  /**
   * @docs-private
   **/
  updateProperties(config: Partial<NbButtonProperties>) {
    let isPropertyChanged = false;

    for (const key in config) {
      if (config.hasOwnProperty(key) && this[key] !== config[key]) {
        this[key] = config[key];
        isPropertyChanged = true;
      }
    }

    if (isPropertyChanged) {
      this.cd.markForCheck();
    }
  }

  get iconElement() {
    const el = this.hostElement.nativeElement;
    return el.querySelector('nb-icon');
  }

  protected get nodes(): Node[] {
    return (this.cd as EmbeddedViewRef<any>).rootNodes.filter((child: Node) => child.nodeType !== Node.COMMENT_NODE);
  }

  protected isIconExist(node: Node): boolean {
    return this.icons.some((item) => item.nativeElement === node);
  }
}
