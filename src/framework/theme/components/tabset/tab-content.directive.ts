import { Directive, TemplateRef } from '@angular/core';

/**
 * Directive to wrap tab lazy content.
 * */
@Directive({
    selector: '[nbTabContent]',
    standalone: false
})
export class NbTabContentDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
