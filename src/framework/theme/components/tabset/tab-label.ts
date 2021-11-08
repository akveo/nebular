import { Directive, TemplateRef } from '@angular/core';

/** Used to flag tab labels for use with the portal directive */
@Directive({
  selector: '[nbTabLabel]',
})
export class NbTabLabelDirective {
  constructor(private templateRef: TemplateRef<any>) {}

  get template(): TemplateRef<any> {
    return this.templateRef;
  }
}
