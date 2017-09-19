import { Component, OnInit, Input } from '@angular/core';
// import * as Prism from 'prismjs';
import * as marked from 'marked';
declare var Prism;

@Component({
  selector: 'ngd-markdown-block',
  template: `<div ngdDescription [innerHtml]="markdown"></div>`,
})
export class NgdMarkdownComponent implements OnInit {

  @Input() block: any;
  markdown: string;

  ngOnInit() {
    let markdownFile = this.block.source;
    this.markdown = require('raw-loader!../../../../assets/articles/' + markdownFile);
    let md = marked.setOptions({
      highlight: (code, lang = 'jsx') => {
        return Prism.highlight(code.trim(), Prism.languages[lang]);
      }
    });

    this.markdown = md.parse(this.markdown.trim());
  }

}
