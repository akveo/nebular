import { NbCalendarCellModel } from '@nebular/theme/components/calendar/models/calendar-cell.model';

export class NbCalendarWeekModel {
  constructor(
    public cells: Array<NbCalendarCellModel>,
    public padLeft: number = 0,
    public padRight: number = 0,
  ) {}
}
