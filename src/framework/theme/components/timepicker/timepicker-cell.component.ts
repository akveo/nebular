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
import { NbSelectedTimeModel, NbTimepickerTypes } from './model';
import { filter, take, takeUntil } from 'rxjs/operators';
import { merge, Subject } from 'rxjs';

@Component({
  selector: 'nb-timepicker-cell',
  template: `
    <div #timepickerOption>{{ value }}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./timepicker-cell.component.scss'],

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
  @Input() type: NbTimepickerTypes;
  @Output() select: EventEmitter<NbSelectedTimeModel> = new EventEmitter();

  @ViewChild('timepickerOption') element: ElementRef;

  constructor(protected ngZone: NgZone) {
  }

  @HostListener('click')
  onClick() {
    this.select.emit({ type: this.type, value: this.value });
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
    if (this.element) {
      this.element.nativeElement.scrollIntoView({block: 'center'});
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
