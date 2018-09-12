import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NbWindowService } from '@nebular/theme';

@Component({
  template: `
    <button (click)="openWindow()" nbButton>Open window</button>

    <ng-template #contentTemplate let-data>
      {{ data.text }}
    </ng-template>
  `,
  styleUrls: [ './window.scss' ],
})
export class NbTemplateWindowComponent {

  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;

  constructor(private windowService: NbWindowService) {}

  openWindow() {
    this.windowService.open(
      this.contentTemplate,
      { title: 'Window content from template', context: { text: 'Window content' } },
    );
  }
}
