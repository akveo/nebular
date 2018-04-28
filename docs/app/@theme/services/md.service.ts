import { Injectable } from '@angular/core';
import * as marked from 'marked';

import { NgdHighlightService } from './highlight.service';

@Injectable()
export class NgdTextService {

  private readonly SECTION_SPLIT = '<hr>';
  private readonly TITLE_MASK = '^#{1,6}[^#]s?(.+)\n';
  private readonly STRIP_HTML = '<\\/?[^>]+(>|$)';

  constructor(private highlight: NgdHighlightService) {
  }

  mdToHTML(markdown: string) {
    return marked
      .setOptions({
        langPrefix: 'hljs ',
        highlight: (code) => this.highlight.highlight(code),
      })
      .parse(markdown.trim());
  }

  splitIntoSections(markdown: string) {
    return markdown.split(new RegExp(this.SECTION_SPLIT, 'g'))
      .filter(section => section.trim());
  }

  extractTitle(section: string) {
    const titleMatch = section.trim().match(new RegExp(this.TITLE_MASK, 'i'));
    return titleMatch ? titleMatch[1] : '';
  }

  extractFirstTwoWords(section: string) {
    return section
      .replace(new RegExp(this.STRIP_HTML, 'g'), '')
      .trim()
      .split(/\s+/g)
      .slice(0, 2)
      .join(' ');
  }

  createSlag(name: string) {
    return name
      .replace(/[^a-zA-Z0-9\s]+/g, '')
      .replace(/\s/g, '-')
      .toLowerCase();
  }
}
