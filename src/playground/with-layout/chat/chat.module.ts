/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbChatModule } from '@nebular/theme';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatColorsComponent } from './chat-colors.component';
import { ChatConversationShowcaseComponent } from './chat-conversation-showcase.component';
import { ChatDropComponent } from './chat-drop.component';
import { ChatMessageTypesShowcaseComponent } from './chat-message-types-showcase.component';
import { ChatShowcaseComponent } from './chat-showcase.component';
import { ChatSizesComponent } from './chat-sizes.component';
import { ChatTestComponent } from './chat-test.component';

@NgModule({
  declarations: [
    ChatColorsComponent,
    ChatConversationShowcaseComponent,
    ChatDropComponent,
    ChatMessageTypesShowcaseComponent,
    ChatShowcaseComponent,
    ChatSizesComponent,
    ChatTestComponent,
  ],
  imports: [
    CommonModule,
    NbChatModule.forRoot(),
    NbCardModule,
    ChatRoutingModule ],
})
export class ChatModule {}
