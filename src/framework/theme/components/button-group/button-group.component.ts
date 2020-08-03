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
import { NbButtonToggleComponent } from './button-toggle.component';
import { element } from 'protractor';
import { chmod } from 'fs';

@Component({
  selector: 'nb-button-group',
  template: `
    <div #buttonContainer (click)="onButtonClick($event, buttonContainer)">
      <ng-content></ng-content>
    </div>`,
})
export class NbButtonGroupComponent implements AfterContentInit {
  @ContentChildren(NbButtonToggleComponent) toggleButtons: QueryList<NbButtonToggleComponent>;
  @ContentChildren(NbButtonComponent) nbButtons: QueryList<NbButtonComponent>;
  protected destroy$: Subject<void> = new Subject<void>();
  protected _multiple: boolean;

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
    this.toggleButtons.forEach((item: NbButtonToggleComponent) => {
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

  onButtonClick(event, buttonContainer: HTMLElement) {
    buttonContainer.childNodes.forEach((node) => {
      if (node === event.target || node.contains(event.target)) {
        const index = Array.from(buttonContainer.childNodes).indexOf(node);

        if (this.multiple) {
          const button = this.toggleButtons.find((_, i) => i === index);
          button.clicked = !button.clicked;
        } else {
          this.toggleButtons.forEach((item: NbButtonToggleComponent, i) => {
            item.clicked = i === index;
          });
        }
      }
    });
  }
}
