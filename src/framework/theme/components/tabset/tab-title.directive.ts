import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[nbTabTitle]',
})
export class NbTabTitleDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
