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
  templateUrl: './tabbed-example-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdTabbedExampleBlockComponent {


  @Input() showLiveViewButton = false;
  @Output() changeView = new EventEmitter<NgdExampleView>();
  examples = [];

  @Input()
  set content(value) {
    forkJoin(Object.entries(value).map(file => this.load(file)))
      .subscribe(files => {
        files[0].active = true;
        this.examples = files;
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
        map(code => ({ code, path, extension })),
        catchError(e => observableOf('')),
      );
  }
}
