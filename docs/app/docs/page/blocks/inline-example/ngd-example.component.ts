import { Component, Input, OnInit } from '@angular/core';
import { CodeLoaderService } from '../../../utils/code-loader.service';

@Component({
  selector: 'ngd-example',
  template: `
    <ngd-code-block *ngIf="code" [code]="code"></ngd-code-block>
  `,
})
export class NgdExampleComponent implements OnInit {

  @Input() content;
  code: string;

  constructor(private codeLoader: CodeLoaderService) {
  }

  ngOnInit() {
    this.codeLoader.load(this.content.id, this.content.lang)
      .subscribe((code: string) => this.code = code);
  }
}
