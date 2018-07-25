export abstract class NbLocaleAdapter<D> {
  protected locale: string;

  /**
   * returns first day of the week, it can be 1 if week starts from monday
   * and 0 if from sunday and so on.
   * */
  abstract getStartOfWeek(): number;

  /* returns month name */
  abstract getMonthName(date: D): string;
  abstract getMonthNameByIndex(index: number): string;
  abstract getMonthNames(): string[];

  abstract getDayOfWeekNames(): string[];
}
