import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { NgdCodeLoaderService } from '../../../@theme/services';

@Component({
  selector: 'ngd-example-block',
  template: `
    <ngd-code-block *ngIf="code" [firstLine]="firstLine" [lastLine]="lastLine" [rawCode]="code"> </ngd-code-block>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdExampleBlockComponent {
  code: string;
  firstLine: number;
  lastLine: number;

  @Input()
  set content(content) {
    this.loadCode(content);
  }

  constructor(private codeLoader: NgdCodeLoaderService, private cd: ChangeDetectorRef) {}

  loadCode(content) {
    this.codeLoader.load(content.files[0]).subscribe((code: string) => {
      this.code = code;
      this.firstLine = content.firstLine || 1;
      this.lastLine = content.lastLine || code.split('\n').length;
      this.cd.detectChanges();
    });
  }
}
