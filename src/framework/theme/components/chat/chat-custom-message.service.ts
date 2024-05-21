/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';

import { NbChatCustomMessageDirective } from './chat-custom-message.directive';

/**
 * `NbCustomMessageService` is used to store instances of `NbChatCustomMessageDirective`s which
 * were provided in the chat component.
 */
@Injectable()
export class NbChatCustomMessageService {
  protected readonly customMessages = new Map<string, NbChatCustomMessageDirective>();

  register(type: string, instance: NbChatCustomMessageDirective): void {
    this.customMessages.set(type, instance);
  }

  unregister(type: string): boolean {
    return this.customMessages.delete(type);
  }

  getInstance(type: string): NbChatCustomMessageDirective | undefined {
    return this.customMessages.get(type);
  }
}
