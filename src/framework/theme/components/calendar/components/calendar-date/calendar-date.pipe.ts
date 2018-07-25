import { Pipe, PipeTransform } from '@angular/core';
import { NbLocaleAdapter } from '../../service';

@Pipe({ name: 'nbCalendarDate' })
export class NbCalendarDatePipe implements PipeTransform {

  constructor(private localeAdapter: NbLocaleAdapter) {
  }

  transform(date: Date): string {
    return date ? `${this.localeAdapter.getMonthName(date)} ${date.getFullYear()}` : '';
  }
}
