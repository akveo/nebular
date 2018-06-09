
export class NbCalendarCellModel {

  constructor(
    public year: number,
    public month: number,
    public date: number,

    public activeMonthDiff: number = 0,
    public cellStates: Array<string> = [],
    public extraData: any = null,
  ) {}

}
