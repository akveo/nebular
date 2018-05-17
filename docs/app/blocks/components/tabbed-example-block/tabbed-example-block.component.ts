import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
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
  templateUrl: './tabbed-example-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdTabbedExampleBlockComponent implements OnInit {

  @Input() content;
  @Input() showLiveViewButton = false;
  @Output() changeView = new EventEmitter<NgdExampleView>();
  examples;

  constructor(private codeLoader: NgdCodeLoaderService,
              private changeDetection: ChangeDetectorRef) {
  }

  // TODO: refactor
  ngOnInit() {
    forkJoin(Object.entries(this.content).map(file => this.load(file)))
      .subscribe(files => {
        this.examples = files.reduce((acc, file) => Object.assign(acc, file), {});
        this.changeDetection.detectChanges();
      });
  }

  switchToLiveView() {
    this.changeView.emit(NgdExampleView.LIVE);
  }

  private load([extension, path]): Observable<any> {
    return this.codeLoader.load(path)
      .pipe(
        map(file => ({ [extension]: file })),
        catchError(e => observableOf('')),
      );
  }
}
