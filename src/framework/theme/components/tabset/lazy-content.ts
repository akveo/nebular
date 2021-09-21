import { Directive, InjectionToken, TemplateRef } from '@angular/core';

export const NB_LAZY_CONTENT = new InjectionToken<NbLazyContentDirective>('NbLazyContent');

/** Decorates the `ng-template` tags and reads out the template from it. */
@Directive({
  selector: '[nbLazyContent]',
  providers: [{ provide: NB_LAZY_CONTENT, useExisting: NbLazyContentDirective }],
})
export class NbLazyContentDirective {
  constructor(
    /** Content for the tab. */ public template: TemplateRef<any>) {
  }
}
