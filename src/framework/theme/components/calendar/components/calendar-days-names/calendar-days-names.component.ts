import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NbDateTimeUtil } from '../../service/date-time-util';
import { NbCalendarDay, NbCalendarNameStyle } from '../../model';

@Component({
  selector: 'nb-calendar-days-names',
  styleUrls: ['./calendar-days-names.component.scss'],
  template: `
    <div class="day" *ngFor="let day of days" [class.holiday]="day.isHoliday">{{ day.name }}</div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NbCalendarDaysNamesComponent<D> implements OnInit {

  days: NbCalendarDay[];

  constructor(private dateTimeUtil: NbDateTimeUtil<D>) {
  }

  ngOnInit() {
    const days: NbCalendarDay[] = this.createDaysNames();
    this.days = this.shiftStartOfWeek(days);
  }

  private createDaysNames(): NbCalendarDay[] {
    return this.dateTimeUtil.getDayOfWeekNames(NbCalendarNameStyle.NARROW)
    // TODO maybe we need one more util for cases like that?
      .map((name, i) => ({ name, isHoliday: i % 6 === 0 }));
  }

  private shiftStartOfWeek(days: NbCalendarDay[]): NbCalendarDay[] {
    // TODO maybe we need one more util for cases like that?
    for (let i = 0; i < this.dateTimeUtil.getStartOfWeekDay(); i++) {
      days.push(days.shift());
    }

    return days;
  }
}
