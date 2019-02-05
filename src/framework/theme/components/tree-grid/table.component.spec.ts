import { DOCUMENT } from '@angular/common';
import { Component, QueryList, Type, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  NB_DOCUMENT, NbTreeGridComponent, NbTreeGridDataSource, NbTreeGridModule, NbTreeGridNode, NbTreeGridRowComponent,
} from '@nebular/theme';

class BaseTreeGridTestComponent {
  columns: string[];
  dataSource: NbTreeGridDataSource<any>;

  @ViewChild(NbTreeGridComponent) treeGridComponent: NbTreeGridComponent<any>;
  @ViewChildren(NbTreeGridRowComponent) rowComponents: QueryList<NbTreeGridRowComponent>;
}

@Component({
  template: `
    <table nbTreeGrid [source]="dataSource">
      <tr nbTreeGridRow *nbRowDef="let row; columns: columns"></tr>

      <ng-container *ngFor="let column of columns" [nbColumnDef]="column">
        <th nbHeaderCell *nbHeaderCellDef>{{ column }}</th>
        <td nbTreeGridCell *nbCellDef="let row">{{ row.data[column] }}</td>
      </ng-container>
    </table>
  `,
})
export class TreeGridBasicTestComponent extends BaseTreeGridTestComponent {}

@Component({
  template: `
    <table nbTreeGrid [source]="dataSource">
      <tr nbHeaderRow *nbHeaderRowDef="columns"></tr>
        <tr nbTreeGridRow *nbRowDef="let row; columns: columns"></tr>

      <ng-container *ngFor="let column of columns" [nbColumnDef]="column">
        <th nbHeaderCell *nbHeaderCellDef>{{ column }}</th>
        <td nbTreeGridCell *nbCellDef="let row">{{ row.data[column] }}</td>
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
    imports: [ NbTreeGridModule ],
    declarations: [ componentType ],
    providers: [ { provide: NB_DOCUMENT, useExisting: DOCUMENT } ],
  });

  const fixture = TestBed.createComponent(componentType);
  fixture.componentInstance.columns = columns;
  if (data) {
    fixture.componentInstance.dataSource = data;
  }

  fixture.detectChanges();
  return fixture;
}


fdescribe('NbTreeGridComponent', () => {
  const columns: string[] = [ 'a', 'b', 'c' ];
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

  it('should convert plain data to NbTreeGridDataSource', () => {
    const fixture: ComponentFixture<TreeGridBasicTestComponent> =
      setupFixture(TreeGridBasicTestComponent, columns, twoRowsData);
    expect(fixture.componentInstance.treeGridComponent.dataSource instanceof NbTreeGridDataSource).toEqual(true);
  });

  it('should render rows', () => {
    const fixture: ComponentFixture<TreeGridBasicTestComponent> =
      setupFixture(TreeGridBasicTestComponent, columns, twoRowsData);
    const rows: HTMLElement[] = fixture.nativeElement.querySelectorAll('tr');
    expect(rows.length).toEqual(twoRowsData.length);
  });

  it('should render data in row', () => {
    const fixture: ComponentFixture<TreeGridBasicTestComponent> =
      setupFixture(TreeGridBasicTestComponent, columns, twoRowsData);
    const rows: HTMLElement[] = fixture.nativeElement.querySelectorAll('tr');

    rows.forEach((row: HTMLElement, rowIndex: number) => {
      const dataCell = row.querySelectorAll('td');

      dataCell.forEach((cell: HTMLElement, cellIndex: number) => {
        expect(cell.innerText).toEqual(twoRowsData[rowIndex].data[columns[cellIndex]]);
      });
    });
  });

  it('should render header row if provided', () => {
    const fixture: ComponentFixture<TreeGridWithHeaderTestComponent> =
      setupFixture(TreeGridWithHeaderTestComponent, columns, twoRowsData);
    const headerRow: HTMLElement = fixture.nativeElement.querySelector('tr');
    expect(headerRow).not.toBeNull();

    const headerCells = headerRow.querySelectorAll('th');
    expect(headerCells.length).toEqual(columns.length);

    headerCells.forEach((cell: HTMLElement, cellIndex: number) => {
      expect(cell.innerText).toEqual(columns[cellIndex]);
    });
  });

  it('should render column text in header cell', () => {
    const fixture: ComponentFixture<TreeGridWithHeaderTestComponent> =
      setupFixture(TreeGridWithHeaderTestComponent, columns, twoRowsData);
    const headerRow: HTMLElement = fixture.nativeElement.querySelector('tr');
    const headerCells = headerRow.querySelectorAll('th');

    headerCells.forEach((cell: HTMLElement, cellIndex: number) => {
      expect(cell.innerText).toEqual(columns[cellIndex]);
    });
  });

  it('should not render collapsed rows', () => {
    const fixture: ComponentFixture<TreeGridWithHeaderTestComponent> =
      setupFixture(TreeGridBasicTestComponent, columns, nestedRowData);
    const rows = fixture.nativeElement.querySelectorAll('tr');
    expect(rows.length).toEqual(1);
  });

  it('should render initially expanded row', () => {
    const fixture: ComponentFixture<TreeGridWithHeaderTestComponent> =
      setupFixture(TreeGridBasicTestComponent, columns, nestedExpandedRowData);
    const rows = fixture.nativeElement.querySelectorAll('tr');
    expect(rows.length).toEqual(2);
  });

  it('should remove collapsed rows', () => {
    const fixture: ComponentFixture<TreeGridWithHeaderTestComponent> =
      setupFixture(TreeGridBasicTestComponent, columns, nestedExpandedRowData);
    const row: HTMLElement = fixture.nativeElement.querySelector('tr');
    row.click();
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('tr');
    expect(rows.length).toEqual(1);
  });

  it('should add expanded row children', () => {
    const fixture: ComponentFixture<TreeGridWithHeaderTestComponent> =
      setupFixture(TreeGridBasicTestComponent, columns, nestedRowData);
    const row: HTMLElement = fixture.nativeElement.querySelector('tr');
    row.click();
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('tr');
    expect(rows.length).toEqual(2);
  });

  fit('should return one based row nesting level', (done) => {
    const fixture: ComponentFixture<TreeGridWithHeaderTestComponent> =
      setupFixture(TreeGridBasicTestComponent, columns, nestedExpandedRowData);

    setTimeout(() => {
      debugger
      const treeGridComponent = fixture.componentInstance.treeGridComponent;
      const [ firstRow, secondRow ] = fixture.componentInstance.rowComponents.toArray();
      expect(treeGridComponent.getRowLevel(firstRow)).toEqual(1);
      expect(treeGridComponent.getRowLevel(secondRow)).toEqual(2);
      done();
    }, 1000);
  });
});
