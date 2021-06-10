import { Directive, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { convertToBoolProperty } from '../helpers';
import { NbCustomMessageService } from './custom-message.service';

function throwCustomMessageTypeIsRequired(): void {
  throw new Error('[nbCustomMessage]: custom message type is required.');
}

/**
 * Usage details:
 * [nbCustomMessage]: should be applied to the ng-template
 * or use a structural directive syntax:
 *
 * ```html
 * <div *nbCustomMessage="my-custom-type">
 *   <!-- custom message -->
 * </div>
 * ```
 */
@Directive({
  selector: `[nbCustomMessage]`,
})
export class NbChatCustomMessageDirective implements OnInit, OnDestroy {

  protected _type: string;
  protected _useCustomStyling: boolean = false;

  /**
   * Custom user defined type
   * @type {string}
   */
  @Input()
  get nbCustomMessage(): string {
    return this._type;
  }
  set nbCustomMessage(value: string) {
    this._type = value;
  }

  /**
   * Flag that allow to disable default styling for custom message container and use user provided styles
   *
   * ```html
   * <div *nbCustomMessage="'custom-name'; disableDefaultStyles: true" class="class-name">
   * </div>
   * ```html
   * @type {boolean}
   */
  @Input()
  set nbCustomMessageDisableDefaultStyles(val: boolean) {
    this._useCustomStyling = convertToBoolProperty(val);
  }
  get nbCustomMessageDisableDefaultStyles(): boolean {
    return this._useCustomStyling;
  }

  get type(): string {
    return this._type
  }

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
