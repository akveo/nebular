import { NbCalendarWeekModel } from './calendar-week.model';

export class NbCalendarMonthModel {
  constructor(
    public weeks: Array<NbCalendarWeekModel>,
    public monthStates: Array<string>,
  ) {}
}
