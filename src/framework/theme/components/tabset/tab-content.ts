import { Directive, InjectionToken, TemplateRef } from '@angular/core';

export const NB_TAB_CONTENT = new InjectionToken<NbTabContentDirective>('NbTabContent');

/** Decorates the `ng-template` tags and reads out the template from it. */
@Directive({
  selector: '[nbTabContent]',
  providers: [{ provide: NB_TAB_CONTENT, useExisting: NbTabContentDirective }],
})
export class NbTabContentDirective {
  constructor(
    /** Content for the tab. */ public template: TemplateRef<any>) {
  }
}
