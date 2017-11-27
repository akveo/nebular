import { Component, Input, OnInit } from '@angular/core';
declare const Prism;


@Component({
  selector: 'ngd-code-highlighter',
  template: `
    <div *ngIf="isHideEnable" class="code-title" (click)="showCode()">
      Example Code
      <i [hidden]="isCodeShown" class="ion-chevron-down"></i>
      <i [hidden]="!isCodeShown" class="ion-chevron-up"></i>
      </div>
    <pre [hidden]="!isCodeShown"><code [innerHtml]="code"></code></pre>
`,
})
export class NgdHighlighterComponent implements OnInit {
  @Input() code: string;
  isCodeShown: boolean = true;
  isHideEnable: boolean = false;


  ngOnInit() {
    this.code = Prism.highlight(this.code, Prism.languages.jsx);
    if (this.code.split(/\r\n|\r|\n/).length > 3) {
      this.isHideEnable = true;
      this.isCodeShown = false;
    }
  }

  showCode() {
    this.isCodeShown = !this.isCodeShown;
  }
}
