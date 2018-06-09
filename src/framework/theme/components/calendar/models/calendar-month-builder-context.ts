
export class NbCalendarMonthBuilderContext<D> {
  constructor(
    public activeMonth: D,
    public selectedValue: any,
    public currentValue: D,
    public includeBoundingMonths: boolean,
  ) {}
}
