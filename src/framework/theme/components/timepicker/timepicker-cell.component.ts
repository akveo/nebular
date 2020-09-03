import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { filter, take, takeUntil } from 'rxjs/operators';
import { merge, Subject } from 'rxjs';
import { NbSelectedTimeModel } from './model';
import { NbPlatform } from '../cdk/platform/platform-service';

@Component({
  selector: 'nb-timepicker-cell',
  template: `
    <div #valueContainer>{{ value }}</div>
  `,
  styleUrls: ['./timepicker-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbTimePickerCellComponent implements AfterViewInit, OnDestroy {
  protected selectedChange$ = new Subject<boolean>();
  protected unselected$ = this.selectedChange$.pipe(filter((selected) => !selected));
  protected destroy$ = new Subject<void>();
  _selected: boolean;

  @Input() set selected(selected: boolean) {
    if (selected) {
      this._selected = selected;
      this.scrollToElement();
    }
    this.selectedChange$.next(selected);
  };
  get selected(): boolean {
    return this._selected;
  }
  @Input() value: string;
  @Output() select: EventEmitter<NbSelectedTimeModel> = new EventEmitter();

  @ViewChild('valueContainer') valueContainerElement: ElementRef;

  constructor(protected ngZone: NgZone,
              protected platformService: NbPlatform) {
  }

  @HostListener('click')
  onClick() {
    this.select.emit({ value: this.value });
  }

  ngAfterViewInit(): void {
    if (this.selected) {
      this.ngZone.onStable
      .pipe(
        take(1),
        takeUntil(merge(this.unselected$, this.destroy$)))
      .subscribe(() =>
        this.ngZone.runOutsideAngular(() => this.scrollToElement()));
    }
  }

  scrollToElement() {
    if (this.valueContainerElement && this.platformService.isBrowser) {
      this.valueContainerElement.nativeElement.scrollIntoView({block: 'center'});
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
