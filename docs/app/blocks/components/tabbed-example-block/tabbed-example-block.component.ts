import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { of as observableOf } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators/catchError';
import { NgdCodeLoaderService } from '../../../@theme/services';
import { NgdExampleView } from '../../enum.example-view';

@Component({
  selector: 'ngd-tabbed-example-block',
  styleUrls: ['./tabbed-example-block.component.scss'],
  template: `
    <nb-tabset *ngIf="examples">
      <nb-tab tabTitle="ts" *ngIf="examples.ts">
        <ngd-code-block [path]="examples.ts.path" [code]="examples.ts.code"></ngd-code-block>
      </nb-tab>

      <nb-tab tabTitle="html" *ngIf="examples.html">
        <ngd-code-block [path]="examples.html.path" [code]="examples.html.code"></ngd-code-block>
      </nb-tab>

      <nb-tab tabTitle="scss" *ngIf="examples.scss">
        <ngd-code-block [path]="examples.scss.path" [code]="examples.scss.code"></ngd-code-block>
      </nb-tab>
    </nb-tabset>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdTabbedExampleBlockComponent {


  @Input() showLiveViewButton = false;
  @Output() changeView = new EventEmitter<NgdExampleView>();
  examples;

  @Input()
  set content(value) {
    forkJoin(Object.entries(value).map(file => this.load(file)))
      .subscribe(files => {
        this.examples = files.reduce((acc, file) => Object.assign(acc, file), {});
        this.cd.detectChanges();
      });
  }

  constructor(private codeLoader: NgdCodeLoaderService, private cd: ChangeDetectorRef) {
  }

  switchToLiveView() {
    this.changeView.emit(NgdExampleView.LIVE);
  }

  private load([extension, path]): Observable<any> {
    return this.codeLoader.load(path)
      .pipe(
        map(code => ({ [extension]: { code, path } })),
        catchError(e => observableOf('')),
      );
  }
}
