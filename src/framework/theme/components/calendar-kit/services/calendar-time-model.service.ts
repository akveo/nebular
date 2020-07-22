import { Injectable } from '@angular/core';
import { range } from '../helpers';
import { NbDateService } from './date.service';


@Injectable()
export class NbCalendarTimeModelService<D> {
  readonly HOURS_IN_DAY = 24;
  readonly HOURS_IN_DAY_ALT = 12;
  readonly MINUTES_AND_SECONDS = 60;
  readonly AM = 'AM';
  readonly PM = 'PM';
  readonly AMPM = [this.AM, this.PM];

  constructor(protected dateService: NbDateService<D>) {
  }

  getHoursInDay(isTwelveHoursFormat: boolean): string[] {
    if (isTwelveHoursFormat) {
      return range(this.HOURS_IN_DAY_ALT, i => {
        if (i === 0) {
          return this.HOURS_IN_DAY_ALT.toString();
        }

        return this.padd(i);
      });
    } else {
      return range(this.HOURS_IN_DAY, i => this.padd(i));
    }
  }

  getFullHours(step: number = this.MINUTES_AND_SECONDS): D[] {
    let date: D = this.dateService.today();

    date = this.dateService.setHours(date, 0);
    date = this.dateService.setMinutes(date, 0);
    date = this.dateService.setSeconds(date, 0);

    const endDate = this.dateService.addDay(date, 1);

    const result: D[] = [];

    while (this.dateService.compareDates(date, endDate) < 0) {
      result.push(date);
      date = this.dateService.addMinutes(date, step);
    }

    return result;
  }

  getAmPm(date: D): 'AM' | 'PM' {
    return this.dateService.getHours(date) < this.HOURS_IN_DAY_ALT ? this.AM : this.PM;
  }

  isAm(date: D): boolean {
    return this.dateService.getHours(date) < 12;
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
      return `${this.dateService.getDateFormat()} ${
        this.dateService.getTwelveHoursFormat()}`
    } else {
      if (withSeconds) {
        return `${this.dateService.getDateFormat()} ${
          this.dateService.getTwentyFourHoursFormatWithSeconds()}`
      } else {
        return `${this.dateService.getDateFormat()} ${
          this.dateService.getTwentyFourHoursFormat()}`
      }
    }
  }
}
