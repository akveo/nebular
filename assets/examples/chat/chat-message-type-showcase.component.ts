import { Component } from '@angular/core';

@Component({
  selector: 'nb-chat-message-type-showcase',
  styles: [`
    nb-card-body {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
    nb-chat {
      width: 500px;
    }
  `],
  template: `
    <nb-card>
      <nb-card-body>
        <nb-chat title="Convertional UI Messages Showcase" [size]="'large'">
          <nb-chat-message
            message="Dat gif"
            [type]="'file'"
            [reply]="true"
            [sender]="'John Doe'"
            [date]="date"
            [files]="gif"
            [avatar]="'https://i.gifer.com/no.gif'"></nb-chat-message>
          <nb-chat-message
            message="Dat pic"
            [type]="'file'"
            [reply]="true"
            [sender]="'John Doe'"
            [date]="date"
            [files]="image"
            [avatar]="'https://i.gifer.com/no.gif'"></nb-chat-message>
          <nb-chat-message
            message="Dat map"
            [type]="'map'"
            [reply]="true"
            [sender]="'John Doe'"
            [date]="date"
            [avatar]="'https://i.gifer.com/no.gif'"
            [latitude]="53.914321"
            [longitude]="27.5998355"
          ></nb-chat-message>
          <nb-chat-message
            message="Dat file"
            [type]="'file'"
            [reply]="true"
            [files]="file"
            [sender]="'John Doe'"
            [date]="date"
            [avatar]="'https://i.gifer.com/no.gif'"
          ></nb-chat-message>
          <nb-chat-message
            message="Dat quote"
            [type]="'quote'"
            [reply]="true"
            [quote]="'Dat quote'"
            [date]="date"
            [sender]="'John Doe'"
            [avatar]="'https://i.gifer.com/no.gif'"
          ></nb-chat-message>
        </nb-chat>
      </nb-card-body>
    </nb-card>
  `,
})

export class NbChatMessageTypeShowcaseComponent {
  date = new Date();
  gif = [ { url: 'http://www.reactiongifs.com/r/wnd1.gif', type: 'image/gif' } ];
  image =  [ { url: 'https://picsum.photos/320/240/?image=387', type: 'image/jpeg' } ];
  file = [ { url: 'http://google.com', icon: 'nb-compose' } ];
}
