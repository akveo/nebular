import { Component, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { NgdHighlightService } from '../../../utils/highlight.service';

@Component({
  selector: 'ngd-code-block',
  template: `
    <pre><code class="hljs" [innerHTML]="code"></code></pre>`,
})
export class NgdCodeBlockComponent {
  code: SafeHtml;

  constructor(private highlightService: NgdHighlightService) {
  }

  @Input('code')
  set codeValues(code: string) {
    this.code = this.highlightService.highlight(code);
  }
}
