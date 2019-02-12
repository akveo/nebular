import { Component, QueryList, Type, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  NbThemeModule,
  NbTreeGridComponent,
  NbTreeGridDataSource,
  NbTreeGridModule,
  NbTreeGridNode,
  NbTreeGridRowComponent,
  NB_ROW_DOUBLE_CLICK_DELAY,
} from '@nebular/theme';

class BaseTreeGridTestComponent {
  columns: string[];
  dataSource: NbTreeGridDataSource<any>;

  @ViewChild(NbTreeGridComponent) treeGridComponent: NbTreeGridComponent<any>;
  @ViewChildren(NbTreeGridRowComponent) rowComponents: QueryList<NbTreeGridRowComponent>;
}

@Component({
  template: `
    <table [nbTreeGrid]="dataSource">
      <tr nbTreeGridRow *nbTreeGridRowDef="let row; columns: columns"></tr>

      <ng-container *ngFor="let column of columns" [nbTreeGridColumnDef]="column">
        <th nbTreeGridHeaderCell *nbTreeGridHeaderCellDef>{{column}}</th>
        <td nbTreeGridCell *nbTreeGridCellDef="let row">{{row.data[column]}}</td>
      </ng-container>
    </table>
  `,
})
export class TreeGridBasicTestComponent extends BaseTreeGridTestComponent {}

@Component({
  template: `
    <table [nbTreeGrid]="dataSource">
      <tr nbTreeGridHeaderRow *nbTreeGridHeaderRowDef="columns"></tr>
      <tr nbTreeGridRow *nbTreeGridRowDef="let row; columns: columns"></tr>

      <ng-container *ngFor="let column of columns" [nbTreeGridColumnDef]="column">
        <th nbTreeGridHeaderCell *nbTreeGridHeaderCellDef>{{column}}</th>
        <td nbTreeGridCell *nbTreeGridCellDef="let row">{{row.data[column]}}</td>
      </ng-container>
    </table>
  `,
})
export class TreeGridWithHeaderTestComponent extends BaseTreeGridTestComponent {}

function setupFixture(
    componentType: Type<any>,
    columns: string[],
    data?: NbTreeGridNode<any>[],
  ): ComponentFixture<any> {

  TestBed.configureTestingModule({
    imports: [ NbThemeModule.forRoot(), NbTreeGridModule ],
    declarations: [ componentType ],
  });

  const fixture = TestBed.createComponent(componentType);
  fixture.componentInstance.columns = columns;
  if (data) {
    fixture.componentInstance.dataSource = data;
  }

  fixture.detectChanges();
  return fixture;
}

const abcColumns: string[] = [ 'a', 'b', 'c' ];
const twoRowsData: NbTreeGridNode<any>[] = [
  { data: { a: 'a1', b: 'b1', c: 'c1' } },
  { data: { a: 'a2', b: 'b2', c: 'c2' } },
];
const nestedRowData: NbTreeGridNode<any>[] = [
  {
    data: { a: 'a1', b: 'b1', c: 'c1' },
    children: [ { data: { a: 'a2', b: 'b2', c: 'c2' } } ],
  },
];
const nestedExpandedRowData: NbTreeGridNode<any>[] = [
  {
    data: { a: 'a1', b: 'b1', c: 'c1' },
    expanded: true,
    children: [ { data: { a: 'a2', b: 'b2', c: 'c2' } } ],
  },
];


describe('NbTreeGridComponent', () => {

  it('should convert plain data to NbTreeGridDataSource', () => {
    const fixture: ComponentFixture<TreeGridBasicTestComponent> =
      setupFixture(TreeGridBasicTestComponent, abcColumns, twoRowsData);
    expect(fixture.componentInstance.treeGridComponent.dataSource instanceof NbTreeGridDataSource).toEqual(true);
  });

  it('should render rows', () => {
    const fixture: ComponentFixture<TreeGridBasicTestComponent> =
      setupFixture(TreeGridBasicTestComponent, abcColumns, twoRowsData);
    const rows: HTMLElement[] = fixture.nativeElement.querySelectorAll('[nbTreeGrid] [nbTreeGridRow]');
    expect(rows.length).toEqual(twoRowsData.length);
  });

  it('should render data in row', () => {
    const fixture: ComponentFixture<TreeGridBasicTestComponent> =
      setupFixture(TreeGridBasicTestComponent, abcColumns, twoRowsData);
    const rows: HTMLElement[] = fixture.nativeElement.querySelectorAll('tr');

    rows.forEach((row: HTMLElement, rowIndex: number) => {
      const dataCell = row.querySelectorAll('td');

      dataCell.forEach((cell: HTMLElement, cellIndex: number) => {
        expect(cell.innerText).toEqual(twoRowsData[rowIndex].data[abcColumns[cellIndex]]);
      });
    });
  });

  it('should render header row if provided', () => {
    const fixture: ComponentFixture<TreeGridWithHeaderTestComponent> =
      setupFixture(TreeGridWithHeaderTestComponent, abcColumns, twoRowsData);
    const headerRow: HTMLElement = fixture.nativeElement.querySelector('tr');
    expect(headerRow).not.toBeNull();

    const headerCells = headerRow.querySelectorAll('th');
    expect(headerCells.length).toEqual(abcColumns.length);

    headerCells.forEach((cell: HTMLElement, cellIndex: number) => {
      expect(cell.innerText).toEqual(abcColumns[cellIndex]);
    });
  });

  it('should render column text in header cell', () => {
    const fixture: ComponentFixture<TreeGridWithHeaderTestComponent> =
      setupFixture(TreeGridWithHeaderTestComponent, abcColumns, twoRowsData);
    const headerRow: HTMLElement = fixture.nativeElement.querySelector('tr');
    const headerCells = headerRow.querySelectorAll('th');

    headerCells.forEach((cell: HTMLElement, cellIndex: number) => {
      expect(cell.innerText).toEqual(abcColumns[cellIndex]);
    });
  });

  it('should not render collapsed rows', () => {
    const fixture: ComponentFixture<TreeGridWithHeaderTestComponent> =
      setupFixture(TreeGridBasicTestComponent, abcColumns, nestedRowData);
    const rows = fixture.nativeElement.querySelectorAll('tr');
    expect(rows.length).toEqual(1);
  });

  it('should render initially expanded row', () => {
    const fixture: ComponentFixture<TreeGridWithHeaderTestComponent> =
      setupFixture(TreeGridBasicTestComponent, abcColumns, nestedExpandedRowData);
    const rows = fixture.nativeElement.querySelectorAll('tr');
    expect(rows.length).toEqual(2);
  });

  it('should remove collapsed rows', fakeAsync(() => {
    const fixture: ComponentFixture<TreeGridWithHeaderTestComponent> =
      setupFixture(TreeGridBasicTestComponent, abcColumns, nestedExpandedRowData);
    const row: HTMLElement = fixture.nativeElement.querySelector('tr');
    row.click();
    fixture.detectChanges();
    tick(NB_ROW_DOUBLE_CLICK_DELAY);
    const rows = fixture.nativeElement.querySelectorAll('tr');
    expect(rows.length).toEqual(1);
  }));

  it('should add expanded row children', fakeAsync(() => {
    const fixture: ComponentFixture<TreeGridWithHeaderTestComponent> =
      setupFixture(TreeGridBasicTestComponent, abcColumns, nestedRowData);
    const row: HTMLElement = fixture.nativeElement.querySelector('tr');
    row.click();
    fixture.detectChanges();
    tick(NB_ROW_DOUBLE_CLICK_DELAY);
    const rows = fixture.nativeElement.querySelectorAll('tr');
    expect(rows.length).toEqual(2);
  }));
});
