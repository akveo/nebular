import { Directive, Input, OnInit, TemplateRef } from '@angular/core';

@Directive({
  selector: `[nbCustomMessage]`,
})
export class NbChatCustomMessageDirective implements OnInit {

  @Input() set nbCustomMessage(content: string) {
    if (!content) {
      throwCustomMessageContentIsMissed();
    }
    this._type = content;
  }

  get type(): string {
    return this._type
  }
  protected _type: string;

  constructor(public templateRef: TemplateRef<any>) {
    if (!this.templateRef) {
      throwCustomMessageContentIsMissed()
    }
  }

  ngOnInit(): void {
    if (!this._type) {
      throwCustomMessageTypeIsRequired();
    }
  }

}

function throwCustomMessageTypeIsRequired(): void {
  throw new Error('[nbCustomMessage]: custom message type is required.');
}

function throwCustomMessageContentIsMissed(): void {
  throw new Error(`nbCustomMessage: should be applied to the ng-tempate
  or use a structural directive syntax:
  <some-element *nbCustomMessage="customTypeName">
   <yourCustomTemplate></yourCustomTemplate>
  </some-element>
`);
}
