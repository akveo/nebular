import { NbCalendarWeekModel } from '@nebular/theme/components/calendar/models/calendar-week.model';

export class NbCalendarMonthModel {
  constructor(
    public weeks: Array<NbCalendarWeekModel>,
    public monthStates: Array<string>,
  ) {}
}
