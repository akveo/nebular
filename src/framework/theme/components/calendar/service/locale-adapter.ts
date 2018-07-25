export abstract class NbLocaleAdapter {
  protected locale: string;

  /**
   * returns first day of the week, it can be 1 if week starts from monday
   * and 0 if from sunday and so on.
   * */
  abstract getStartOfWeek(): number;

  /* returns month name */
  abstract getMonthName(date: Date): string;
  abstract getMonthNameByIndex(index: number): string;

  abstract getDayOfWeekNames(): string[];

  getWeekStartDiff(date: Date): number {
    return (7 - this.getStartOfWeek() + date.getDay()) % 7;
  }
}
