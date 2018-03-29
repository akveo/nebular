import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-tabbed-example',
  styleUrls: ['./ngd-tabbed-example.component.scss'],
  template: `
    <nb-tabset *ngIf="content">
      <nb-tab tabTitle="ts">
        <ngd-example [content]="content.ts"></ngd-example>
      </nb-tab>

      <nb-tab tabTitle="html">
        <ngd-example [content]="content.html"></ngd-example>
      </nb-tab>

      <nb-tab tabTitle="scss">
        <ngd-example [content]="content.scss"></ngd-example>
      </nb-tab>
    </nb-tabset>
  `,
})
export class NgdTabbedExampleComponent {

  content;

  @Input('content')
  set contentValue(content) {
    this.content = {
      ts: { ...content, lang: 'ts' },
      html: { ...content, lang: 'html' },
      scss: { ...content, lang: 'scss' },
    };
  }
}
