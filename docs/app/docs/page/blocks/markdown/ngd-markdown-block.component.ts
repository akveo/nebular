import { Component, Input, OnInit } from '@angular/core';
import * as marked from 'marked';
import { NgdHighlightService } from '../../../utils/highlight.service';

@Component({
  selector: 'ngd-markdown-block',
  template: `
    <div [innerHtml]="markdown"></div>`,
})
export class NgdMarkdownComponent implements OnInit {

  @Input() source: string;

  markdown: string;

  constructor(private highlightService: NgdHighlightService) {
  }

  ngOnInit() {
    const md = marked.setOptions({
      langPrefix: 'hljs ',
      highlight: (code) => this.highlightService.highlight(code),
    });

    this.markdown = md.parse(this.source.trim());
  }
}
