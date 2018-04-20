import { Component, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { NgdHighlightService } from '../../../utils/highlight.service';

@Component({
  selector: 'ngd-code-block',
  template: `
    <p>{{ path }}</p>
    <pre><code class="hljs" [innerHTML]="code"></code></pre>
  `,
})
export class NgdCodeBlockComponent {
  @Input('code')
  set codeValues(code: string) {
    this.code = this.highlightService.highlight(code);
  }

  @Input() path = '';

  code: SafeHtml;

  constructor(private highlightService: NgdHighlightService) {
  }
}
