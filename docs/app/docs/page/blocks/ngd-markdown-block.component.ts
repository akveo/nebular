import { Component, Input, OnInit } from '@angular/core';
import * as marked from 'marked';
import * as hljs from 'highlight.js';

@Component({
  selector: 'ngd-markdown-block',
  template: `
    <div [innerHtml]="markdown"></div>`,
})
export class NgdMarkdownComponent implements OnInit {

  @Input() source: any;

  markdown: string;

  ngOnInit() {
    const input = require(`raw-loader!../../../../articles/${this.source}`);
    const md = marked.setOptions({
      highlight(code, lang = 'jsx') {
        return hljs.highlightAuto(code, [lang]).value;
      },
    });

    this.markdown = md.parse(input.trim());
  }
}
