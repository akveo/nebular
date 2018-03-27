import { Component, Input, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'ngd-one-file-example',
  template: `
    <ngd-code-block [code]="code"></ngd-code-block>
  `,
})
export class NgdOneFileExampleComponent implements OnInit {

  @Input() content;
  code: string;

  constructor(private http: Http) {
  }

  ngOnInit() {
    this.http.get(`assets/examples/examples/${this.content.id}.component.${this.content.lang}`)
      .map((res: any) => res.text())
      .subscribe((code: string) => this.code = code);
  }
}
