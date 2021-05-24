import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SafeStyle } from '@angular/platform-browser';

@Component({
    selector: 'nb-chat-avatar',
    template: `
        <div class="avatar" [style.background-image]="avatarStyle">
            <ng-container *ngIf="!avatarStyle">
                {{ initials }}
            </ng-container>
        </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class NbChatAvatarComponent {
    @Input() avatarStyle: SafeStyle;
    @Input() initials: string;
}
