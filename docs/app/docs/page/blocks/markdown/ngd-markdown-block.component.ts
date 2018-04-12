import { Component, Input, OnInit } from '@angular/core';
import * as marked from 'marked';
import * as hljs from 'highlight.js';

@Component({
  selector: 'ngd-markdown-block',
  template: `
    <div [innerHtml]="markdown"></div>`,
})
export class NgdMarkdownComponent implements OnInit {

  @Input() source: string;

  markdown: string;

  ngOnInit() {
    const md = marked.setOptions({
      langPrefix: 'hljs ',
      highlight(code) {
        return hljs.highlightAuto(code, ['ts', 'html', 'scss', 'nginx']).value;
      },
    });

    this.markdown = md.parse(this.source.trim());
  }
}
