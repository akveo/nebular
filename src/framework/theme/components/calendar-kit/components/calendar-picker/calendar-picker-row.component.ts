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
  Renderer2,
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
  @Input() activeMonth: Date;
  @Input() component: Type<NbCalendarCell<T>>;
  @Input() min: Date;

  @Input() max: Date;

  @Input() filter: (Date) => boolean;

  @Output() select: EventEmitter<Date> = new EventEmitter();

  @ViewChild(TemplateRef, { read: ViewContainerRef }) containerRef: ViewContainerRef;

  constructor(private cfr: ComponentFactoryResolver, private renderer: Renderer2) {
  }

  ngOnChanges() {
    const factory = this.cfr.resolveComponentFactory(this.component);

    this.containerRef.clear();

    this.row.forEach(cell => {
      const component = this.containerRef.createComponent(factory);
      component.instance.activeMonth = this.activeMonth;
      component.instance.selectedValue = this.selectedValue;
      component.instance.date = cell;
      component.instance.select.subscribe(this.select.emit.bind(this.select));
      component.instance.min = this.min;
      component.instance.max = this.max;
      component.instance.filter = this.filter;
      component.changeDetectorRef.detectChanges();
      this.renderer.addClass(component.location.nativeElement, 'cell');
    });
  }
}
