import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[nbCalendarDay]' })
export class NbCalendarDayCellDirective {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({ selector: '[nbCalendarMonth]' })
export class NbCalendarMonthCellDirective {
  constructor(public template: TemplateRef<any>) {
  }
}

@Directive({ selector: '[nbCalendarYear]' })
export class NbCalendarYearCellDirective {
  constructor(public template: TemplateRef<any>) {
  }
}
