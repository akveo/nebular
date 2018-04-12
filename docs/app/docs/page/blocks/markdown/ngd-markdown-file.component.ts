import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-markdown-file',
  template: `
    <ngd-markdown-block [source]="markdown"></ngd-markdown-block>`,
})
export class NgdMarkdownFileComponent {

  markdown: string;

  @Input('source')
  set setMarkdown(source) {
    this.markdown = require(`raw-loader!../../../../../articles/${source}`);
  }
}
