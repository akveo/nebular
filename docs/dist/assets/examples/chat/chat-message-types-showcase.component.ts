import { Component } from '@angular/core';

@Component({
  selector: 'nb-chat-message-type-showcase',
  template: `
    <nb-chat title="Message Types" size="large">
      <nb-chat-message
        message="Gif message"
        type="file"
        sender="John Doe"
        [reply]="true"
        [date]="date"
        [files]="[ { url: 'http://www.reactiongifs.com/r/wnd1.gif', type: 'image/gif' } ]"
        avatar="https://i.gifer.com/no.gif">
      </nb-chat-message>
      <nb-chat-message
        message="Image message"
        type="file"
        sender="John Doe"
        [reply]="true"
        [date]="date"
        [files]="[ { url: 'https://picsum.photos/320/240/?image=387', type: 'image/jpeg' } ]"
        avatar="https://i.gifer.com/no.gif">
      </nb-chat-message>
      <nb-chat-message
        message="Map message"
        type="map"
        sender="John Doe"
        [reply]="true"
        [date]="date"
        [latitude]="53.914321"
        [longitude]="27.5998355"
        avatar="https://i.gifer.com/no.gif">
      </nb-chat-message>
      <nb-chat-message
        message="File message"
        type="file"
        sender="John Doe"
        [reply]="true"
        [date]="date"
        [files]="[ { url: 'http://google.com', icon: 'file-text-outline' } ]"
        [avatar]="'https://i.gifer.com/no.gif'">
      </nb-chat-message>
      <nb-chat-message
        message="Quote message"
        type="quote"
        sender="John Doe"
        [reply]="true"
        quote="Quooted message here"
        [date]="date"
        avatar="https://i.gifer.com/no.gif">
      </nb-chat-message>
      <nb-chat-message
        message="Group of files message"
        type="file"
        sender="John Doe"
        [reply]="true"
        [date]="date"
        [files]="[
          { url: 'http://google.com', icon: 'file-text-outline' },
          { url: 'https://picsum.photos/320/240/?image=387', type: 'image/jpeg' },
          { url: 'http://www.reactiongifs.com/r/wnd1.gif', type: 'image/gif' }
         ]"
        avatar="https://i.gifer.com/no.gif">
      </nb-chat-message>
    </nb-chat>
  `,
  styles: [`
    nb-chat {
      margin: 0 auto;
      width: 500px;
    }
  `],
})
export class ChatMessageTypesShowcaseComponent {
  date = new Date();
}
