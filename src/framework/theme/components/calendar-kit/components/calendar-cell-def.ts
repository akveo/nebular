import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[nbCalendarCell]' })
export class NbCalendarCellDirective {
  constructor(public template: TemplateRef<any>) {
  }
}
