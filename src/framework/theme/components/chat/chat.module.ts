/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ModuleWithProviders, NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';
import { NbButtonModule } from '../button/button.module';
import { NbInputModule } from '../input/input.module';
import { NbIconModule } from '../icon/icon.module';

import { NbChatComponent } from './chat.component';
import { NbChatMessageComponent } from './chat-message.component';
import { NbChatFormComponent } from './chat-form.component';
import { NbChatMessageTextComponent } from './chat-message-text.component';
import { NbChatMessageFileComponent } from './chat-message-file.component';
import { NbChatMessageQuoteComponent } from './chat-message-quote.component';
import { NbChatMessageMapComponent } from './chat-message-map.component';
import { NbChatOptions } from './chat.options';
import { NbChatAvatarComponent } from './chat-avatar.component';
import { NbChatCustomMessageDirective } from './chat-custom-message.directive';
import { NbChatTitleDirective } from './chat-title.directive';

const NB_CHAT_COMPONENTS = [
  NbChatComponent,
  NbChatMessageComponent,
  NbChatFormComponent,
  NbChatMessageTextComponent,
  NbChatMessageFileComponent,
  NbChatMessageQuoteComponent,
  NbChatMessageMapComponent,
  NbChatAvatarComponent,
];

const NB_CHAT_DIRECTIVES = [NbChatCustomMessageDirective, NbChatTitleDirective];

@NgModule({
  imports: [NbSharedModule, NbIconModule, NbInputModule, NbButtonModule],
  declarations: [...NB_CHAT_COMPONENTS, ...NB_CHAT_DIRECTIVES],
  exports: [...NB_CHAT_COMPONENTS, ...NB_CHAT_DIRECTIVES],
})
export class NbChatModule {
  static forRoot(options?: NbChatOptions): ModuleWithProviders<NbChatModule> {
    return {
      ngModule: NbChatModule,
      providers: [{ provide: NbChatOptions, useValue: options || {} }],
    };
  }

  static forChild(options?: NbChatOptions): ModuleWithProviders<NbChatModule> {
    return {
      ngModule: NbChatModule,
      providers: [{ provide: NbChatOptions, useValue: options || {} }],
    };
  }
}
