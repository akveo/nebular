import { Directive, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { convertToBoolProperty, NbBooleanInput } from '../helpers';
import { NbCustomMessageService } from './custom-message.service';

function throwCustomMessageTypeIsRequired(): void {
  throw new Error('[nbCustomMessage]: custom message type is required.');
}

/**
 * `[nbCustomMessage]` directive should be applied to the ng-template or via structural directive syntax:
 *
 * ```html
 * <div *nbCustomMessage="my-custom-type; let data">
 *   <!-- custom message -->
 * </div>
 * ```
 */
@Directive({
  selector: `[nbCustomMessage]`,
})
export class NbChatCustomMessageDirective implements OnInit, OnDestroy {

  /**
   * Defines a message type which should rendered with the custom message template.
   * @type {string}
   */
  @Input()
  get nbCustomMessage(): string {
    return this._type;
  }
  set nbCustomMessage(value: string) {
    this._type = value;
  }
  protected _type: string;

  get type(): string {
    return this._type
  }

  /**
   * Disables generic to all message styles, such as round corners, text color, background, etc.,
   * so a custom message could be styled from the ground up.
   *
   * `<div *nbCustomMessage="'custom-name'; disableDefaultStyles: true" class="class-name">
   * </div>`
   * @type {boolean}
   */
  @Input()
  set nbCustomMessageDisableDefaultStyles(value: boolean) {
    this._useCustomStyling = convertToBoolProperty(value);
  }
  get nbCustomMessageDisableDefaultStyles(): boolean {
    return this._useCustomStyling;
  }
  protected _useCustomStyling: boolean = false;
  static ngAcceptInputType_nbCustomMessageDisableDefaultStyles: NbBooleanInput;

  constructor(public templateRef: TemplateRef<any>, protected customMessageService: NbCustomMessageService) { }

  ngOnInit() {
    if (!this._type) {
      throwCustomMessageTypeIsRequired();
    }
    this.customMessageService.register(this.type, this);
  }

  ngOnDestroy() {
    this.customMessageService.unregister(this.type);
  }
}
