/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { NbCalendarCell } from '../../model';


@Component({
  selector: 'nb-calendar-picker-row',
  styles: [`
    :host {
      display: flex;
      justify-content: space-between;
    }
  `],
  template: '<ng-template></ng-template>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarPickerRowComponent<T> implements OnChanges {
  @Input() row: Date[];
  @Input() selectedValue: T;
  @Input() visibleDate: Date;
  @Input() component: Type<NbCalendarCell<T>>;
  @Input() min: Date;
  @Input() max: Date;
  @Input() filter: (Date) => boolean;
  @Output() select: EventEmitter<Date> = new EventEmitter();

  @ViewChild(TemplateRef, { read: ViewContainerRef }) containerRef: ViewContainerRef;

  constructor(private cfr: ComponentFactoryResolver) {
  }

  ngOnChanges() {
    const factory = this.cfr.resolveComponentFactory(this.component);

    this.containerRef.clear();

    this.row.forEach((date: Date) => {
      const component = this.containerRef.createComponent(factory);
      this.patchWithContext(component.instance, date);
      component.changeDetectorRef.detectChanges();
    });
  }

  private patchWithContext(component: NbCalendarCell<T>, date: Date) {
    component.visibleDate = this.visibleDate;
    component.selectedValue = this.selectedValue;
    component.date = date;
    component.min = this.min;
    component.max = this.max;
    component.filter = this.filter;
    component.select.subscribe(this.select.emit.bind(this.select));
  }
}
