import { Component, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import * as hljs from 'highlight.js';

@Component({
  selector: 'ngd-code-block',
  template: `
    <pre><code class="hljs" [innerHTML]="code"></code></pre>`,
})
export class NgdCodeBlockComponent {
  code: SafeHtml;

  @Input('code')
  set codeValues(code: string) {
    this.code = hljs.highlightAuto(code, ['ts', 'html', 'scss']).value;
  }
}
