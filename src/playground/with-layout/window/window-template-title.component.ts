import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NbWindowService } from '@nebular/theme';

@Component({
  template: `
    <button (click)="openWindow()" nbButton>Open window</button>

    <ng-template #titleTemplate let-data>
      <p>Here is the text provided via config: "{{ data.text }}"</p>
    </ng-template>

    <ng-template #contentTemplate let-data>
      <p>Content</p>
    </ng-template>
  `,
  standalone: false,
})
export class WindowTemplateTitleComponent {
  @ViewChild('titleTemplate') titleTemplate: TemplateRef<any>;
  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;

  constructor(private windowService: NbWindowService) {}

  openWindow() {
    this.windowService.open(this.contentTemplate, {
      titleTemplate: this.titleTemplate,
      titleTemplateContext: { text: 'some text to pass into template' },
    });
  }
}
