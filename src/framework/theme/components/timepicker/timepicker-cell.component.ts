import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { NbSelectedTimeModel, NbTimepickerTypes } from './model';

@Component({
  selector: 'nb-timepicker-cell',
  template: `
    <div #timepickerOption class="value">{{ value }}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./timepicker-cell.component.scss'],

})
export class NbTimePickerCellComponent implements AfterViewInit {
  _selected: boolean;
  @Input() set selected(selected: boolean) {
    if (selected) {
      this._selected = selected;
      this.scrollToElement();
    }
  };
  get selected(): boolean {
    return this._selected;
  }
  @Input() value: string;
  @Input() type: NbTimepickerTypes;
  @Output() select: EventEmitter<NbSelectedTimeModel> = new EventEmitter();

  @ViewChild('timepickerOption') element: ElementRef;

  @HostListener('click')
  onClick() {
    this.select.emit({ type: this.type, value: this.value });
    this.scrollToElement();
  }

  ngAfterViewInit(): void {
    if (this.selected) {
      this.scrollToElement();
    }
  }

  scrollToElement() {
    if (this.element) {
      this.element.nativeElement.scrollIntoView({block: 'center'});
    }
  }
}
