import { Component, QueryList, Type, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { EMPTY } from 'rxjs';
import { take } from 'rxjs/operators';
import createSpy = jasmine.createSpy;
import {
  NbThemeModule,
  NbTreeGridComponent,
  NbTreeGridDataSource,
  NbTreeGridModule,
  NbTreeGridRowComponent,
  NB_ROW_DOUBLE_CLICK_DELAY,
  NbTreeGridDataSourceBuilder,
  NbTreeGridPresentationNode,
  NbGetters,
} from '@nebular/theme';

interface TreeNode<T> {
  data: T;
  expanded?: boolean,
  children?: TreeNode<T>[];
}

interface CustomStructure {
  a: string;
  b: string;
  c: string;
  childNodes?: CustomStructure[];
  expanded?: boolean;
}

Component({
  template: '',
})
class BaseTreeGridTestComponent {
  columns: string[];
  dataSource: NbTreeGridDataSource<any>;

  @ViewChild(NbTreeGridComponent, { static: false }) treeGridComponent: NbTreeGridComponent<any>;
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
    data?: TreeNode<any>[],
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
const twoRowsData: TreeNode<any>[] = [
  { data: { a: 'a1', b: 'b1', c: 'c1' } },
  { data: { a: 'a2', b: 'b2', c: 'c2' } },
];
const nestedRowData: TreeNode<any>[] = [
  {
    data: { a: 'a1', b: 'b1', c: 'c1' },
    children: [ { data: { a: 'a2', b: 'b2', c: 'c2' } } ],
  },
];
const nestedExpandedRowData: TreeNode<any>[] = [
  {
    data: { a: 'a1', b: 'b1', c: 'c1' },
    expanded: true,
    children: [ { data: { a: 'a2', b: 'b2', c: 'c2' } } ],
  },
];
const customStructureData: CustomStructure[] = [
  {
    a: 'a1', b: 'b1', c: 'c1', expanded: true,
    childNodes: [{ a: 'a2', b: 'b2', c: 'c2' }],
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
    const rows: HTMLElement[] = fixture.nativeElement.querySelectorAll('.nb-tree-grid .nb-tree-grid-row');
    expect(rows.length).toEqual(twoRowsData.length);
  });

  it('should render data in row', () => {
    const fixture: ComponentFixture<TreeGridBasicTestComponent> =
      setupFixture(TreeGridBasicTestComponent, abcColumns, twoRowsData);
    const rows: HTMLElement[] = fixture.nativeElement.querySelectorAll('.nb-tree-grid-row');

    rows.forEach((row: HTMLElement, rowIndex: number) => {
      const dataCell = row.querySelectorAll('.nb-tree-grid-cell');

      dataCell.forEach((cell: HTMLElement, cellIndex: number) => {
        expect(cell.innerText).toEqual(twoRowsData[rowIndex].data[abcColumns[cellIndex]]);
      });
    });
  });

  it('should render header row if provided', () => {
    const fixture: ComponentFixture<TreeGridWithHeaderTestComponent> =
      setupFixture(TreeGridWithHeaderTestComponent, abcColumns, twoRowsData);
    const headerRow: HTMLElement = fixture.nativeElement.querySelector('.nb-tree-grid-header-row');
    expect(headerRow).not.toBeNull();

    const headerCells = headerRow.querySelectorAll('.nb-tree-grid-header-cell');
    expect(headerCells.length).toEqual(abcColumns.length);

    headerCells.forEach((cell: HTMLElement, cellIndex: number) => {
      expect(cell.innerText).toEqual(abcColumns[cellIndex]);
    });
  });

  it('should render column text in header cell', () => {
    const fixture: ComponentFixture<TreeGridWithHeaderTestComponent> =
      setupFixture(TreeGridWithHeaderTestComponent, abcColumns, twoRowsData);
    const headerRow: HTMLElement = fixture.nativeElement.querySelector('.nb-tree-grid-header-row');
    const headerCells = headerRow.querySelectorAll('.nb-tree-grid-header-cell');

    headerCells.forEach((cell: HTMLElement, cellIndex: number) => {
      expect(cell.innerText).toEqual(abcColumns[cellIndex]);
    });
  });

  it('should not render collapsed rows', () => {
    const fixture: ComponentFixture<TreeGridWithHeaderTestComponent> =
      setupFixture(TreeGridBasicTestComponent, abcColumns, nestedRowData);
    const rows = fixture.nativeElement.querySelectorAll('.nb-tree-grid-row');
    expect(rows.length).toEqual(1);
  });

  it('should render initially expanded row', () => {
    const fixture: ComponentFixture<TreeGridWithHeaderTestComponent> =
      setupFixture(TreeGridBasicTestComponent, abcColumns, nestedExpandedRowData);
    const rows = fixture.nativeElement.querySelectorAll('.nb-tree-grid-row');
    expect(rows.length).toEqual(2);
  });

  it('should remove collapsed rows', fakeAsync(() => {
    const fixture: ComponentFixture<TreeGridWithHeaderTestComponent> =
      setupFixture(TreeGridBasicTestComponent, abcColumns, nestedExpandedRowData);
    const row: HTMLElement = fixture.nativeElement.querySelector('.nb-tree-grid-row');
    row.click();
    fixture.detectChanges();
    tick(NB_ROW_DOUBLE_CLICK_DELAY);
    const rows = fixture.nativeElement.querySelectorAll('.nb-tree-grid-row');
    expect(rows.length).toEqual(1);
  }));

  it('should add expanded row children', fakeAsync(() => {
    const fixture: ComponentFixture<TreeGridWithHeaderTestComponent> =
      setupFixture(TreeGridBasicTestComponent, abcColumns, nestedRowData);
    const row: HTMLElement = fixture.nativeElement.querySelector('.nb-tree-grid-row');
    row.click();
    fixture.detectChanges();
    tick(NB_ROW_DOUBLE_CLICK_DELAY);
    const rows = fixture.nativeElement.querySelectorAll('.nb-tree-grid-row');
    expect(rows.length).toEqual(2);
  }));

  describe('NbTreeGridDataSourceBuilder custom node getters', () => {
    const mockConnectionViewer = { viewChange: EMPTY };
    const getters: NbGetters<CustomStructure, CustomStructure> = {
      dataGetter: node => node,
      childrenGetter: node => node.childNodes,
      expandedGetter: node => !!node.expanded,
    };
    let dataSourceBuilder: NbTreeGridDataSourceBuilder<CustomStructure>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ NbThemeModule.forRoot(), NbTreeGridModule ],
      });
    });
    beforeEach(inject([ NbTreeGridDataSourceBuilder ], builder => {
      dataSourceBuilder = builder;
    }));

    it('should use custom data accessor if provided', fakeAsync(() => {
      const dataGetterSpy = createSpy('dataGetter', getters.dataGetter).and.callThrough();
      const spyGetters = { ...getters, dataGetter: dataGetterSpy };

      const dataSource = dataSourceBuilder.create(customStructureData, spyGetters);
      expect(dataGetterSpy).toHaveBeenCalledTimes(2);

      let presentationNodes: NbTreeGridPresentationNode<CustomStructure>[] = [];
      dataSource.connect(mockConnectionViewer)
        .pipe(take(1))
        .subscribe(nodes => presentationNodes = nodes as NbTreeGridPresentationNode<CustomStructure>[]);
      tick();

      expect(presentationNodes[0].data).toEqual(customStructureData[0]);
      expect(presentationNodes[1].data).toEqual(customStructureData[0].childNodes[0]);
    }));

    it('should use custom children accessor if provided', fakeAsync(() => {
      const childrenGetterSpy = createSpy('childrenGetter', getters.childrenGetter).and.callThrough();
      const spyGetters = { ...getters, childrenGetter: childrenGetterSpy };

      const dataSource = dataSourceBuilder.create(customStructureData, spyGetters);
      expect(childrenGetterSpy).toHaveBeenCalledTimes(2);

      let presentationNodes: NbTreeGridPresentationNode<CustomStructure>[] = [];
      dataSource.connect(mockConnectionViewer)
        .pipe(take(1))
        .subscribe(nodes => presentationNodes = nodes as NbTreeGridPresentationNode<CustomStructure>[]);
      tick();

      expect(presentationNodes[0].data.childNodes[0]).toEqual(customStructureData[0].childNodes[0]);
    }));

    it('should use custom expanded accessor if provided', fakeAsync(() => {
      const expandedGetterSpy = createSpy('expandedGetter', getters.expandedGetter).and.callThrough();
      const spyGetters = { ...getters, expandedGetter: expandedGetterSpy };

      const dataSource = dataSourceBuilder.create(customStructureData, spyGetters);
      expect(expandedGetterSpy).toHaveBeenCalledTimes(2);

      let presentationNodes: NbTreeGridPresentationNode<CustomStructure>[] = [];
      dataSource.connect(mockConnectionViewer)
        .pipe(take(1))
        .subscribe(nodes => presentationNodes = nodes as NbTreeGridPresentationNode<CustomStructure>[]);
      tick();

      expect(presentationNodes[0].expanded).toEqual(true);
    }));
  });
});
