import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[nbTabTitle]',
})
export class NbTabTitleDirective {
  constructor(private _templateRef: TemplateRef<any>) {}

  get templateRef(): TemplateRef<any> {
    return this._templateRef;
  }
}
