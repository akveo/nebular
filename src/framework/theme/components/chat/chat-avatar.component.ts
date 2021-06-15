import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'nb-chat-avatar',
  template: `
    <ng-container *ngIf="!avatarStyle">
      {{ initials }}
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbChatAvatarComponent {

  @Input() initials: string;

  @Input()
  @HostBinding('style.background-image')
  avatarStyle: SafeStyle;

  @HostBinding('class.avatar')
  readonly avatarClass = true;
}
