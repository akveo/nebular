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
import { NbSelectedTimeModel } from './model';

@Component({
  selector: 'nb-timepicker-cell',
  template: `
    <div #target class="value">{{ value }}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./timepicker-cell.component.scss'],

})
export class NbTimePickerCellComponent implements AfterViewInit {
  @Input() set selected(selected: boolean) {
    if (selected) {
      this._selected = selected;
      this.scrollToElement();
    }
  };
  @Input() value: string;
  @Input() type: string;
  @ViewChild('target') element: ElementRef;

  @Output() select: EventEmitter<NbSelectedTimeModel> = new EventEmitter();

  @HostListener('click')
  onClick() {
    this.select.emit({ [this.type]: this.value });
    this.scrollToElement();
  }
  _selected: boolean;

  ngAfterViewInit(): void {
    if (this._selected) {
      this.scrollToElement();
    }
  }

  scrollToElement() {
    if (this.element) {
      this.element.nativeElement.scrollIntoView({block: 'center'});
    }
  }
}
