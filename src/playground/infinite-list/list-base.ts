export class ListBase {
  protected timeout = 1000

  private page = 1;
  private pageSize = 10;
  private maxLength = 100000;
  items = [];

  constructor() {
    this.addPage();
  }

  createNewPage(page: number): any[] {
    const pageIndex = page - 1;
    const firstItemIndex = pageIndex * this.pageSize;
    const lastItemIndex = firstItemIndex + this.pageSize;
    const newItems = [];

    for (let i = firstItemIndex; i < lastItemIndex; i++) {
      newItems.push({ index: i, humanNumber: i + 1, isPlaceholder: true });
    }

    setTimeout(
      () => newItems.forEach(i => i.isPlaceholder = false),
      this.timeout,
    );

    return newItems;
  }

  addPage(): { page: number, items: any[] } {
    if (this.items.length >= this.maxLength) {
      return;
    }

    const page = this.page;
    const items = this.createNewPage(this.page++);
    this.items.push(...items);

    return { page, items };
  }
}
