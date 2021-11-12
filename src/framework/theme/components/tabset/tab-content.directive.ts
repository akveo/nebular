import { Directive, TemplateRef } from '@angular/core';

/**
 * Directive to wrap tab lazy content.
 * */
@Directive({
  selector: '[nbTabContent]',
})
export class NbTabContentDirective {
  constructor(public template: TemplateRef<any>) {}
}
