import { Directive, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { NbCustomMessageService } from './custom-message.service';

function throwCustomMessageTypeIsRequired(): void {
  throw new Error('[nbCustomMessage]: custom message type is required.');
}

/**
 * Usage details:
 * [nbCustomMessage]: should be applied to the ng-template
 * or use a structural directive syntax:
 *
 * <div *nbCustomMessage="my-custom-type">
 *   <!-- custom message -->
 * </div>
 */
@Directive({
  selector: `[nbCustomMessage]`,
})
export class NbChatCustomMessageDirective implements OnInit, OnDestroy {

  protected _type: string;

  @Input() set nbCustomMessage(content: string) {
    this._type = content;
  }

  get type(): string {
    return this._type
  }

  constructor(protected templateRef: TemplateRef<any>, protected customMessageService: NbCustomMessageService) { }

  ngOnInit(): void {
    if (!this._type) {
      throwCustomMessageTypeIsRequired();
    }
    this.customMessageService.setMessageTemplate(this.type, this.templateRef);
  }

  ngOnDestroy(): void {
    this.customMessageService.delete(this.type);
  }
}
