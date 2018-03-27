import { Component, Input } from '@angular/core';

declare const Prism;

@Component({
  selector: 'ngd-code-block',
  template: `
    <pre><code [innerHTML]="code"></code></pre>
  `,
})
export class NgdCodeBlockComponent {

  code: string;

  @Input('code')
  set codeValue(code: string) {
    this.code = Prism.highlight(code.trim(), Prism.languages.jsx);
  }
}
