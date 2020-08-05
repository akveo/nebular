import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  QueryList,
} from '@angular/core';
import { NbComponentSize } from '../component-size';
import { NbComponentStatus } from '../component-status';
import { NbButtonAppearance, NbButtonComponent } from '../button/button.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbComponentShape } from '../component-shape';
import { convertToBoolProperty, NbBooleanInput } from '../helpers';
import { NbButtonToggleDirective } from './button-toggle.directive';

/**
 * NbButtonGroupComponent provides grouping and state management capabilities.
 *
 * @stacked-example(Button Showcase, button-group/button-group-showcase.component)
 *
 * ```html
 * <nb-button-group
 *  size="giant"
 *  status="primary"
 *  shape="semi-round"
 *  filled>
 *  <button nbButtonToggle>A</button>
 *  <button nbButtonToggle>B</button>
 *  <button nbButtonToggle>C</button>
 *  <button nbButtonToggle>D</button>
 *  <button nbButtonToggle>E</button>
 *  <button nbButtonToggle>F</button>
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
 * You can select multiple button by adding 'multiple' flag
 * @stacked-example(Button Group multiple, button-group/button-group-multiple.component.html)
 *
 */
@Component({
  selector: 'nb-button-group',
  template: `
    <div role="group" (click)="onButtonClick($event)">
      <ng-content></ng-content>
    </div>`,
})
export class NbButtonGroupComponent implements AfterContentInit {
  @ContentChildren(NbButtonToggleDirective) toggleButtons: QueryList<NbButtonToggleDirective>;
  @ContentChildren(NbButtonComponent) nbButtons: QueryList<NbButtonComponent>;
  protected destroy$: Subject<void> = new Subject<void>();
  protected _multiple: boolean = false;

  @Input() size: NbComponentSize = 'medium';
  @Input() status: NbComponentStatus = 'basic';
  @Input() shape: NbComponentShape = 'rectangle';

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
  static ngAcceptInputType_multiple: NbBooleanInput;

  /**
   * Button appearance: `filled`, `outline`, `ghost`
   */
  protected appearance: NbButtonAppearance = 'filled';

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

  constructor(protected cd: ChangeDetectorRef) {
  }

  ngAfterContentInit(): void {
    this.pathWithInputs();
    this.toggleButtons.changes
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => {
      this.cd.markForCheck();
    });
  }

  pathWithInputs(): void {
    this.toggleButtons.forEach((item: NbButtonToggleDirective) => {
      item.appearance = this.appearance;
      item.status = this.status;
      item.size = this.size;
      item.shape = this.shape;
    });

    this.nbButtons.forEach((item: NbButtonComponent) => {
      item.appearance = this.appearance;
      item.status = this.status;
      item.size = this.size;
      item.shape = this.shape;
    });
  }

  onButtonClick(event: any) {
    this.toggleButtons.forEach((item: any) => {
      if (item.hostElement.nativeElement.isSameNode(event.target) ||
        item.hostElement.nativeElement.contains(event.target)) {
        if (this.multiple) {
          item.clicked = !item.clicked;
        } else {
          item.clicked = true;
        }
      } else {
        if (!this.multiple) {
          item.clicked = false;
        }
      }
    });
  }
}
