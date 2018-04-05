import { Component, Input, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { ExampleHelperService } from '../../../utils/example-helper.service';
import { CodeLoaderService } from '../../../utils/code-loader.service';

@Component({
  selector: 'ngd-tabbed-example',
  styleUrls: ['./ngd-tabbed-example.component.scss'],
  template: `
    <nb-tabset>
      <nb-tab tabTitle="ts" *ngIf="examples?.ts">
        <ngd-code-block [code]="examples?.ts"></ngd-code-block>
      </nb-tab>

      <nb-tab tabTitle="html" *ngIf="examples?.html">
        <ngd-code-block [code]="examples?.html"></ngd-code-block>
      </nb-tab>

      <nb-tab tabTitle="scss" *ngIf="examples?.scss">
        <ngd-code-block [code]="examples?.scss"></ngd-code-block>
      </nb-tab>
    </nb-tabset>
  `,
})
export class NgdTabbedExampleComponent implements OnInit {

  @Input() content;
  examples;

  constructor(private exampleHelper: ExampleHelperService,
              private codeLoader: CodeLoaderService) {
  }

  ngOnInit() {
    const paths = this.exampleHelper.fullExampleFiles(this.content.path);

    forkJoin(paths.map(path => this.codeLoader.load(path)))
      .subscribe(([ts, html, scss]) => this.examples = { ts, html, scss });
  }
}
