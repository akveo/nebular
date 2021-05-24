import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: `[nbCustomMessage]`,
})

export class NbChatCustomMessageDirective {

    @Input() set nbCustomMessage(content: string) {
        if (!content) {
            throw new Error('Custom message type not provided');
        }
        this.customMessageType = content;
    }

    customMessageType: string;
    customMessageData: any;

    constructor(public templateRef: TemplateRef<any>) { }
}
