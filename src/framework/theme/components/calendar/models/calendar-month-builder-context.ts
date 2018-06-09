
export class NbCalendarMonthBuilderContext<D> {
  constructor(
    public activeMonth: D,
    public selectedValue: D,
    public currentValue: D,
    public includeBoundingMonths: boolean,
  ) {}
}
