import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NbWindowService } from '@nebular/theme';

@Component({
  template: `
    <button (click)="openWindow()" nbButton>Open window</button>

    <ng-template #contentTemplate let-data>
      <p>Here is the text provided via config: "{{ data.text }}"</p>
    </ng-template>
  `,
  styleUrls: [ './window.scss' ],
})
export class TemplateWindowComponent {

  // TODO static must be false as of Angular 9.0.0
  @ViewChild('contentTemplate', { static: false }) contentTemplate: TemplateRef<any>;

  constructor(private windowService: NbWindowService) {}

  openWindow() {
    this.windowService.open(
      this.contentTemplate,
      { title: 'Window content from template', context: { text: 'some text to pass into template' } },
    );
  }
}
