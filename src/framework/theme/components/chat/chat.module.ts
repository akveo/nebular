/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NbSharedModule } from '../shared/shared.module';

import { NbChatComponent } from './chat.component';
import { NbChatMessageComponent } from './chat-message.component';
import {NbChatFormComponent} from './chat-form.component';

const NB_CHAT_COMPONENTS = [
  NbChatComponent,
  NbChatMessageComponent,
  NbChatFormComponent,
];

@NgModule({
  imports: [
    NbSharedModule,
  ],
  declarations: [
    ...NB_CHAT_COMPONENTS,
  ],
  exports: [
    ...NB_CHAT_COMPONENTS,
  ],
})
export class NbChatModule {
}
