import { Injectable } from '@angular/core';
import { range } from '../helpers';
import { NbDateService } from './date.service';


@Injectable()
export class NbCalendarTimeModelService {
  readonly HOURS_IN_DAY: number = 24;
  readonly HOURS_IN_DAY_ALT: number = 12;
  readonly MINUTES_AND_SECONDS: number = 60;
  readonly AMPM = ['AM', 'PM'];

  constructor(protected dateService: NbDateService<Date>,
  ) {}

  getHoursInDay(isTwelveHoursFormat: boolean): string[] {
    return isTwelveHoursFormat ?
      range(this.HOURS_IN_DAY_ALT, i => i !== 0 ? this.formatToString(i) : this.HOURS_IN_DAY_ALT.toString())
      : range(this.HOURS_IN_DAY, i => this.formatToString(i));
  }

  getFullHours(use12HoursFormat, step): string[] {
    const hours: number = use12HoursFormat ? this.HOURS_IN_DAY_ALT + 1 : this.HOURS_IN_DAY;
    const am = [];
    const pm = [];

    range(hours, value => {
      for (let i = 0; i < this.MINUTES_AND_SECONDS; i += step) {
        if (use12HoursFormat) {
          if (value === 0) {
            continue;
          }
          pm.push(`${this.formatToString(value)}:${this.formatToString(i)} PM`);
          am.push(`${this.formatToString(value)}:${this.formatToString(i)} AM`);
        } else {
          am.push(`${this.formatToString(value)}:${this.formatToString(i)}`);
        }
      }
    });
    return use12HoursFormat ? [...am, ...pm] : am;
  }

  getMinutesAndSeconds(): string[] {
    return range(this.MINUTES_AND_SECONDS, i => this.formatToString(i));
  }

  getAmPm(date: Date, format: string): string {
    const ampm: RegExpMatchArray = this.getFormattedTime(date, format).match(/AM|PM/);
    if (ampm) {
      return ampm[0]
    } else {
      return '';
    }
  }

  getFormattedTime(date: Date, format: string): string {
    return this.dateService.format(date, format);
  }

  formatToString(n: number): string {
    return n < 10 ? `0${n.toString()}` : n.toString();
  }
}
