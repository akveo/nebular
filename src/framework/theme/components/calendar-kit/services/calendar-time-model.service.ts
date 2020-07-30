import { Injectable } from '@angular/core';
import { range } from '../helpers';
import { NbDateService } from './date.service';


@Injectable()
export class NbCalendarTimeModelService<D> {
  readonly HOURS_IN_DAY = 24;
  readonly MINUTES_AND_SECONDS = 60;

  constructor(protected dateService: NbDateService<D>) {
  }

  getHoursInDay(isTwelveHoursFormat: boolean): string[] {
    if (isTwelveHoursFormat) {
      return range(this.dateService.HOURS_IN_DAY_PERIOD, i => {
        if (i === 0) {
          return this.dateService.HOURS_IN_DAY_PERIOD.toString();
        }

        return this.padd(i);
      });
    } else {
      return range(this.HOURS_IN_DAY, i => this.padd(i));
    }
  }

  getFullHours(step: number = this.MINUTES_AND_SECONDS): D[] {
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

  padd(n: number): string {
    const symbolToAdd = 2 - n.toString().length;

    if (symbolToAdd > 0) {
      return '0'.repeat(symbolToAdd) + n;
    }

    return n.toString();
  }

  buildDateFormat(isTwelveHoursFormat: boolean, withSeconds: boolean = false): string {
    if (isTwelveHoursFormat) {
      return `${this.dateService.getDateFormat()} ${this.dateService.getTwelveHoursFormat()}`
    } else {
      if (withSeconds) {
        return `${this.dateService.getDateFormat()} ${this.dateService.getTwentyFourHoursFormatWithSeconds()}`
      } else {
        return `${this.dateService.getDateFormat()} ${this.dateService.getTwentyFourHoursFormat()}`
      }
    }
  }
}
