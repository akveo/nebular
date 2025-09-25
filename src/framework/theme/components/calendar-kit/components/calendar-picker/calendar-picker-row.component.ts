/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { NbCalendarCell, NbCalendarSize, NbCalendarSizeValues } from '../../model';

@Component({
    selector: 'nb-calendar-picker-row',
    styles: [
        `
      :host {
        display: flex;
        justify-content: space-between;
      }
    `,
    ],
    template: '<ng-template></ng-template>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class NbCalendarPickerRowComponent<D, T> implements OnChanges {
  @Input() row: D[];
  @Input() selectedValue: T;
  @Input() visibleDate: D;
  @Input() component: Type<NbCalendarCell<D, T>>;
  @Input() min: D;
  @Input() max: D;
  @Input() filter: (D) => boolean;
  @Input() size: NbCalendarSize = NbCalendarSize.MEDIUM;
  static ngAcceptInputType_size: NbCalendarSizeValues;
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() select: EventEmitter<D> = new EventEmitter();

  // TODO static must be false as of Angular 9.0.0, issues/1514
  @ViewChild(TemplateRef, { read: ViewContainerRef, static: true }) containerRef: ViewContainerRef;

  ngOnChanges() {
    this.containerRef.clear();

    this.row.forEach((date: D) => {
      const component = this.containerRef.createComponent(this.component, { index: this.containerRef.length });
      this.patchWithContext(component.instance, date);
      component.changeDetectorRef.detectChanges();
    });
  }

  private patchWithContext(component: NbCalendarCell<D, T>, date: D) {
    component.visibleDate = this.visibleDate;
    component.selectedValue = this.selectedValue;
    component.date = date;
    component.min = this.min;
    component.max = this.max;
    component.filter = this.filter;
    component.size = this.size;
    component.select.subscribe(this.select.emit.bind(this.select));
  }
}
