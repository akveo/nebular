import { Component, Input, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of as observableOf } from 'rxjs/observable/of';
import { CodeLoaderService } from '../../../utils/code-loader.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators/catchError';

@Component({
  selector: 'ngd-tabbed-example',
  styleUrls: ['./ngd-tabbed-example.component.scss'],
  template: `
    <nb-tabset *ngIf="examples">
      <nb-tab tabTitle="ts" *ngIf="examples.ts">
        <ngd-code-block [code]="examples.ts"></ngd-code-block>
      </nb-tab>

      <nb-tab tabTitle="html" *ngIf="examples.html">
        <ngd-code-block [code]="examples.html"></ngd-code-block>
      </nb-tab>

      <nb-tab tabTitle="scss" *ngIf="examples.scss">
        <ngd-code-block [code]="examples.scss"></ngd-code-block>
      </nb-tab>
    </nb-tabset>
  `,
})
export class NgdTabbedExampleComponent implements OnInit {

  @Input() content;
  examples;

  constructor(private codeLoader: CodeLoaderService) {
  }

  ngOnInit() {
    forkJoin(Object.entries(this.content).map(file => this.load(file)))
      .subscribe(files => {
        this.examples = files.reduce((acc, file) => Object.assign(acc, file), {});
      });
  }

  private load([extension, path]): Observable<any> {
    return this.codeLoader.load(path)
      .pipe(
        map(file => ({ [extension]: file })),
        catchError(e => observableOf('')),
      );
  }
}
