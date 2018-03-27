import { Component, Input, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'ngd-full-example',
  template: `
    <nb-tabset *ngIf="code">
      <nb-tab tabTitle="ts">
        <ngd-one-file-example [content]="content.ts"></ngd-one-file-example>
      </nb-tab>

      <nb-tab tabTitle="html">
        <ngd-one-file-example [content]="content.html"></ngd-one-file-example>
      </nb-tab>

      <nb-tab tabTitle="scss">
        <ngd-one-file-example [content]="content.scss"></ngd-one-file-example>
      </nb-tab>
    </nb-tabset>
  `,
})
export class NgdFullExampleComponent implements OnInit {

  content;

  @Input('content')
  set contentValue(content) {
    this.content = {
      ts: { ...content, lang: 'ts' },
      html: { ...content, lang: 'html' },
      scss: { ...content, lang: 'scss' },
    };
  }

  constructor(private http: Http) {
  }

  ngOnInit() {
  }
}
