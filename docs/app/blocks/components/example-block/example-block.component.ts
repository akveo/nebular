import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { NgdCodeLoaderService } from '../../../@theme/services';

@Component({
  selector: 'ngd-example-block',
  template: `
    <ngd-code-block *ngIf="code"
      [path]="content.path"
      [firstLine]="content.firstLine"
      [lastLine]="content.lastLine"
      [code]="code">
    </ngd-code-block>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdExampleBlockComponent implements OnInit {

  @Input() content;
  code: string;

  constructor(private codeLoader: NgdCodeLoaderService, private cd: ChangeDetectorRef) {
  }

  // TODO: refactor
  ngOnInit() {
    this.codeLoader.load(this.content.path)
      .subscribe((code: string) => {
        this.code = code;
        this.cd.detectChanges();
      });
  }
}
