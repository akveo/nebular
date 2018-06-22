import { NbCalendarCellModel } from './calendar-cell.model';

export class NbCalendarWeekModel {
  constructor(
    public cells: Array<NbCalendarCellModel>,
    public padLeft: number = 0,
    public padRight: number = 0,
  ) {}
}
