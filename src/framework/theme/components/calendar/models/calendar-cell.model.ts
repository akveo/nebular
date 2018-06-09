
export class NbCalendarCellModel {

  constructor(
    public year: number,
    public month: number,
    public day: number,

    public activeMonthDiff: number = 0,
    public cellStates: Array<string> = [],
    public extraData: any = null,
  ) {}

}
