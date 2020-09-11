import { Injectable } from '@angular/core';
import { NbDateService } from './date.service';


@Injectable()
export class NbCalendarTimeModelService<D> {
  readonly MINUTES_AND_SECONDS = 60;

  constructor(protected dateService: NbDateService<D>) {
  }

  getHoursRange(step: number = this.MINUTES_AND_SECONDS): D[] {
    let date: D = this.getResetTime();

    const endDate = this.dateService.addDay(date, 1);

    const result: D[] = [];

    while (this.dateService.compareDates(date, endDate) < 0) {
      result.push(date);
      date = this.dateService.addMinutes(date, step);
    }

    return result;
  }

  getResetTime(): D {
    let today = this.dateService.today();
    today = this.dateService.setHours(today, 0);
    today = this.dateService.setMinutes(today, 0);
    today = this.dateService.setSeconds(today, 0);
    today = this.dateService.setMilliseconds(today, 0);

    return today;
  }

  paddToTwoSymbols(n: number): string {
    if (n < 10) {
      return '0' + n;
    }

    return n.toString();
  }

  buildDateFormat(twelveHoursFormat: boolean, withSeconds: boolean = false): string {
    if (twelveHoursFormat) {
      return `${this.dateService.getDateFormat()} ${this.dateService.getTwelveHoursFormat()}`
    }

    if (withSeconds) {
      return `${this.dateService.getDateFormat()} ${this.dateService.getTwentyFourHoursFormatWithSeconds()}`
    }

    return `${this.dateService.getDateFormat()} ${this.dateService.getTwentyFourHoursFormat()}`
  }
}
