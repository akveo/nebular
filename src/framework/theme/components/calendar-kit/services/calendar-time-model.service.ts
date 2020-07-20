import { Injectable } from '@angular/core';
import { range } from '../helpers';
import { NbDateService } from './date.service';


@Injectable()
export class NbCalendarTimeModelService<D> {
  readonly HOURS_IN_DAY: number = 24;
  readonly HOURS_IN_DAY_ALT: number = 12;
  readonly MINUTES_AND_SECONDS: number = 60;
  readonly AM: string = 'AM';
  readonly PM: string = 'PM';
  readonly AMPM = [this.AM, this.PM];
  readonly timeFormat: string = 'HH:mm';
  readonly timeFormatWithSeconds: string = 'HH:mm:ss';
  readonly twelveTimeFormatWithSeconds: string = 'hh:mm:ss a';
  readonly dateFormat: string = 'yyyy-MM-dd';
  readonly twelveHoursTimeFormat: string = 'hh:mm a';
  constructor(protected dateService: NbDateService<D>) {}

  getHoursInDay(isTwelveHoursFormat: boolean): string[] {
    if (isTwelveHoursFormat) {
      return range(this.HOURS_IN_DAY_ALT, i => i !== 0 ? this.formatToString(i) :
        this.HOURS_IN_DAY_ALT.toString());
    } else {
      return range(this.HOURS_IN_DAY, i => this.formatToString(i));
    }
  }

  getFullHours(use12HoursFormat, step = this.MINUTES_AND_SECONDS): D[] {
    let date: D = this.dateService.createDate(2020, 1, 1);

    date = this.dateService.setHour(date, 0);
    date = this.dateService.setMinute(date, 0);
    date = this.dateService.setSecond(date, 0);

    let endDate: D = this.dateService.createDate(2020, 1, 2);
    endDate = this.dateService.setHour(endDate, 0);

    const result: D[] = [];

    while (date < endDate) {
      result.push(date);
      date = this.dateService.addMinute(date, step);
    }

    return result;
  }

  getMinutesAndSeconds(): string[] {
    return range(this.MINUTES_AND_SECONDS, i => this.formatToString(i));
  }

  getAmPm(date: D): string {
    return this.dateService.getHour(date) < this.HOURS_IN_DAY_ALT ? this.AM : this.PM;
  }

  isAm(date: D): boolean {
    return this.dateService.getHour(date) < 12;
  }

  getFormattedTime(date: D, format: string): string {
    return this.dateService.format(date, format);
  }

  formatToString(n: number): string {
    const symbolToAdd = 2 - n.toString().length;

    if (symbolToAdd > 0) {
      return '0'.repeat(symbolToAdd) + n;
    }

    return n.toString();
  }
}
