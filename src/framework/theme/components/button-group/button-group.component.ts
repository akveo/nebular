import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { convertToBoolProperty, NbBooleanInput } from '../helpers';
import { NbComponentSize } from '../component-size';
import { NbComponentShape } from '../component-shape';
import { NbComponentStatus } from '../component-status';
import { NbButtonAppearance, NbButtonComponent } from '../button/button.component';
import { NbBaseButtonDirective } from '../button/base-button.directive';

/**
 * NbButtonGroupComponent provides grouping and state management capabilities.
 * In order to check one or multiple options add nbButtonToggle attribute to the button inside of
 * the nb-button-group component
 * @stacked-example(Button Showcase, button-group/button-group-showcase.component)
 *
 * ```html
 * <nb-button-group
 *  size="giant"
 *  status="primary"
 *  shape="semi-round"
 *  filled>
 *    <button nbButtonToggle>A</button>
 *    <button nbButtonToggle>B</button>
 *    <button nbButtonToggle>C</button>
 *    <button nbButtonToggle>D</button>
 *    <button nbButtonToggle>E</button>
 *    <button nbButtonToggle>F</button>
 *  </nb-button-group>
 *
 * ```
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
 * ### Usage
 *
 * You can select multiple options by adding `multiple` flag
 * @stacked-example(Button Group multiple, button-group/button-group-multiple.component.html)
 *
 * There are three button group sizes:
 *
 * @stacked-example(Button Group Sizes, button-group/button-group-sizes.component.html)
 *
 * And two additional style types - `filled`, `outline` and `ghost`:
 * @stacked-example(Button Group Appearances, button-group/button-group-appearances.component.html)
 *
 * Buttons groups available in different shapes:
 * @stacked-example(Button Group Shapes, button-group/button-group-shapes.component.html)
 *
 * You can add `nbButton` to the button group
 * @stacked-example(Button Group with nbButton, button-group/button-group-nb-button.component.html)
 *
 * */
@Component({
  selector: 'nb-button-group',
  template: `
    <ng-content></ng-content>
  `,
})
export class NbButtonGroupComponent implements OnChanges, AfterContentInit {

  protected destroy$: Subject<void> = new Subject<void>();

  @ContentChildren(NbBaseButtonDirective) buttons: QueryList<NbBaseButtonDirective>;

  /**
   * Button group size, available sizes:
   * `tiny`, `small`, `medium`, `large`, `giant`
   */
  @Input() size: NbComponentSize = 'medium';

  /**
   * Button group status (adds specific styles):
   * `primary`, `info`, `success`, `warning`, `danger`
   */
  @Input() status: NbComponentStatus = 'primary';

  /**
   * Button group shapes: `rectangle`, `round`, `semi-round`
   */
  @Input() shape: NbComponentShape = 'rectangle';

  /**
   * Button group appearance: `filled`, `outline`, `ghost`, `hero`
   */
  @Input() appearance: NbButtonAppearance = 'filled';

  /**
   * Sets `outline` appearance
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

  @HostBinding('attr.role') role = 'group';

  @HostListener('click', ['$event'])
  onButtonClick(event: any) {
    this.buttons.forEach((item: any) => {
      if (item.hostElement.nativeElement.isSameNode(event.target) ||
        item.hostElement.nativeElement.contains(event.target)) {
        if (this.multiple) {
          item.pressed = !item.pressed;
        } else {
          item.pressed = true;
        }
      } else {
        if (!this.multiple) {
          item.pressed = false;
        }
      }
    });
  }

  constructor(protected cd: ChangeDetectorRef) {
  }

  ngAfterContentInit(): void {
    this.updateButtonInputs();
    this.buttons.changes
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateButtonInputs();
      });
  }

  ngOnChanges({ size, status, shape, multiple, filled, outline, ghost }: SimpleChanges) {
    if (size || status || shape || multiple || filled || outline || ghost) {
      this.updateButtonInputs();
    }
  }

  updateButtonInputs(): void {
    if (this.buttons) {
      this.buttons.forEach((item: NbButtonComponent) => {
        item.updateAttributes({
          appearance: this.appearance,
          size: this.size,
          status: this.status,
          shape: this.shape,
        });
      });
    }
  }
}
