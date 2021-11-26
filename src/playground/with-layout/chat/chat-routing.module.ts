/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { ChatColorsComponent } from './chat-colors.component';
import { ChatConversationShowcaseComponent } from './chat-conversation-showcase.component';
import { ChatDropComponent } from './chat-drop.component';
import { ChatMessageTypesShowcaseComponent } from './chat-message-types-showcase.component';
import { ChatShowcaseComponent } from './chat-showcase.component';
import { ChatSizesComponent } from './chat-sizes.component';
import { ChatTestComponent } from './chat-test.component';
import { ChatCustomMessageComponent } from './chat-custom-message.component';
import { ChatTemplateTitleComponent } from './chat-template-title.component';

const routes: Route[] = [
  {
    path: 'chat-colors.component',
    component: ChatColorsComponent,
  },
  {
    path: 'chat-conversation-showcase.component',
    component: ChatConversationShowcaseComponent,
  },
  {
    path: 'chat-drop.component',
    component: ChatDropComponent,
  },
  {
    path: 'chat-message-types-showcase.component',
    component: ChatMessageTypesShowcaseComponent,
  },
  {
    path: 'chat-showcase.component',
    component: ChatShowcaseComponent,
  },
  {
    path: 'chat-sizes.component',
    component: ChatSizesComponent,
  },
  {
    path: 'chat-test.component',
    component: ChatTestComponent,
  },
  {
    path: 'chat-custom-message.component',
    component: ChatCustomMessageComponent,
  },
  {
    path: 'chat-template-title.component',
    component: ChatTemplateTitleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
