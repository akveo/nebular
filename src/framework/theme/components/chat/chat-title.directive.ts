import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: `[nbChatTitle]`,
})
export class NbChatTitleDirective {
  @Input() context: Object = {};

  constructor(public templateRef: TemplateRef<any>) {}
}
