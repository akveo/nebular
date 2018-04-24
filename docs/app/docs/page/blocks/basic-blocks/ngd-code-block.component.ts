import { Component, Input, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { NgdHighlightService } from '../../../utils/highlight.service';

@Component({
  selector: 'ngd-code-block',
  styleUrls: ['./ngd-code-block.component.scss'],
  template: `
    <p>{{ path }}</p>
    <div class="container">
      <div class="lines">
        <span *ngFor="let line of lines">{{ line }}</span>
      </div>
      <pre><code class="hljs" [innerHTML]="code"></code></pre>
    </div>
  `,
})
export class NgdCodeBlockComponent implements OnInit {
  @Input('code') rawCode: string = '';
  @Input() path = '';
  @Input() firstLine: number;
  @Input() lastLine: number;

  code: SafeHtml;
  lines: number[] = [];

  constructor(private highlightService: NgdHighlightService) {
  }

  ngOnInit() {
    const highlighted = this.highlightService.highlight(this.rawCode);
    this.code = this.getVisible(highlighted)
    this.lines = this.createLines(this.code);
  }

  getVisible(code): string {
    return code
      .split('\n')
      .slice(this.firstLine - 1, this.lastLine)
      .join('\n');
  }

  createLines(code): number[] {
    const length = code.split('\n').length;
    return Array(length).fill(0).map((_, i) => i + (this.firstLine || 1));
  }
}
