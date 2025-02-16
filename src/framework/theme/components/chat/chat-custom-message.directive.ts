import { Directive, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';

import { convertToBoolProperty, NbBooleanInput } from '../helpers';
import { NbChatCustomMessageService } from './chat-custom-message.service';

function throwCustomMessageTypeIsRequired(): void {
  throw new Error('[nbCustomMessage]: custom message type is required.');
}

/**
 * `[nbCustomMessage]` directive should be used as a structural directive or should be applied to the `ng-template`:
 *
 * ```html
 * <div *nbCustomMessage="'my-custom-type'; let data">
 *   <!-- custom message -->
 * </div>
 * ```
 * or
 * ```html
 * <ng-template nbCustomMessage='my-custom-type' let-data>
 *   <!-- custom message -->
 * </ng-template>
 * ```
 */
@Directive({
    selector: `[nbCustomMessage]`,
    standalone: false
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
    return this._type;
  }

  /**
   * Disables generic message styles, such as round corners, text color, background, etc.,
   * so a custom message could be styled from the ground up.
   *
   * @type {boolean}
   */
  @Input()
  set nbCustomMessageNoStyles(value: boolean) {
    this._noStyles = convertToBoolProperty(value);
  }
  get nbCustomMessageNoStyles(): boolean {
    return this._noStyles;
  }
  protected _noStyles: boolean = false;
  static ngAcceptInputType_noStyles: NbBooleanInput;

  get noStyles(): boolean {
    return this.nbCustomMessageNoStyles;
  }

  constructor(public templateRef: TemplateRef<any>, protected customMessageService: NbChatCustomMessageService) {}

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
