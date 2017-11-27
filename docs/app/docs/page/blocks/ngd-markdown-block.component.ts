import { Component, Input, OnInit } from '@angular/core';
import * as marked from 'marked';

declare const Prism;

@Component({
  selector: 'ngd-markdown-block',
  template: `
    <div [innerHtml]="markdown"></div>`,
})
export class NgdMarkdownComponent implements OnInit {

  @Input() block: any;

  markdown: string;

  ngOnInit() {
    const input = require(`raw-loader!../../../../articles/${this.block.source}`);
    const md = marked.setOptions({
      highlight: (code, lang = 'jsx') => {
        return Prism.highlight(code.trim(), Prism.languages[lang]);
      },
    });

    this.markdown = md.parse(input.trim());
  }

}
