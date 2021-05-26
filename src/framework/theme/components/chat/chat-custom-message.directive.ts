import { Directive, Input, OnInit, TemplateRef } from '@angular/core';

@Directive({
  selector: `[nbCustomMessage]`,
})
export class NbChatCustomMessageDirective implements OnInit {

  @Input() set nbCustomMessage(content: string) {
    if (!content || !this.templateRef) {
      this.throwCustomMessageContentIsMissed();
    }
    this._type = content;
  }

  get type(): string {
    return this._type
  }
  protected _type: string;

  constructor(public templateRef: TemplateRef<any>) { }

  ngOnInit(): void {
    if (!this._type) {
      this.throwCustomMessageTypeIsRequired();
    }
  }

  protected throwCustomMessageTypeIsRequired(): void {
    throw new Error('[nbCustomMessage]: custom message type is required provided');
  }

  protected throwCustomMessageContentIsMissed(): void {
    throw new Error(`nbCustomMessage: should be applied to the ng-tempate
    or use a structural directive syntax:
    <some-element *nbCustomMessage="customTypeName">
     <yourCustomTemplate></yourCustomTemplate>
    </some-element>
  `);
  }
}
