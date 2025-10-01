import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[nbTabTitle]',
  standalone: false,
})
export class NbTabTitleDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
