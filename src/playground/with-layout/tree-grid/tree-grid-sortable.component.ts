import { Component } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
}

@Component({
  template: `
    <nb-card>
      <nb-card-body>

        <table [nbTreeGrid]="dataSource" nbSort (sort)="changeSort($event)" equalColumnsWidth>

          <tr nbTreeGridHeaderRow *nbTreeGridHeaderRowDef="allColumns"></tr>
          <tr nbTreeGridRow *nbTreeGridRowDef="let row; columns: allColumns"></tr>

          <ng-container [nbTreeGridColumnDef]="customColumn">
            <th nbTreeGridHeaderCell [nbSortHeader]="getDirection(customColumn)" *nbTreeGridHeaderCellDef>
              {{customColumn}}
            </th>

            <td nbTreeGridCell *nbTreeGridCellDef="let row">
              <nb-fs-icon [kind]="row.data.kind" [expanded]="row.expanded"></nb-fs-icon>
              {{row.data.name}}
            </td>
          </ng-container>

          <ng-container *ngFor="let column of defaultColumns" [nbTreeGridColumnDef]="column">
            <th nbTreeGridHeaderCell [nbSortHeader]="getDirection(column)" *nbTreeGridHeaderCellDef>
              {{column}}
            </th>

            <td nbTreeGridCell *nbTreeGridCellDef="let row">{{row.data[column]}}</td>
          </ng-container>

        </table>

      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./tree-grid-shared.scss'],
})
export class TreeGridSortableComponent {
  customColumn = 'name';
  defaultColumns = [ 'size', 'kind', 'items' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<any>;

  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<any>) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  changeSort(sortRequest: NbSortRequest): void {
    this.dataSource.sort(sortRequest);
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getDirection(column: string): NbSortDirection {
    if (column === this.sortColumn) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  private data: TreeNode<FSEntry>[] = [
    {
      data: { name: 'Projects', size: '1.8 MB', items: 5, kind: 'dir' },
      children: [
        { data: { name: 'project-1.doc', kind: 'doc', size: '240 KB' } },
        { data: { name: 'project-2.doc', kind: 'doc', size: '290 KB' } },
        {
          data: { name: 'project-3', kind: 'dir', size: '466 KB', items: 3 },
          children: [
            { data: { name: 'project-3A.doc', kind: 'doc', size: '200 KB' } },
            { data: { name: 'project-3B.doc', kind: 'doc', size: '266 KB' } },
            { data: { name: 'project-3C.doc', kind: 'doc', size: '0' } },
          ],
        },
        { data: { name: 'project-4.docx', kind: 'docx', size: '900 KB' } },
      ],
    },
    {
      data: { name: 'Reports', kind: 'dir', size: '400 KB', items: 2 },
      children: [
        {
          data: { name: 'Report 1', kind: 'dir', size: '100 KB', items: 1 },
          children: [
            { data: { name: 'report-1.doc', kind: 'doc', size: '100 KB' } },
          ],
        },
        {
          data: { name: 'Report 2', kind: 'dir', size: '300 KB', items: 2 },
          children: [
            { data: { name: 'report-2.doc', kind: 'doc', size: '290 KB' } },
            { data: { name: 'report-2-note.txt', kind: 'txt', size: '10 KB' } },
          ],
        },
      ],
    },
    {
      data: { name: 'Other', kind: 'dir', size: '109 MB', items: 2 },
      children: [
        { data: { name: 'backup.bkp', kind: 'bkp', size: '107 MB' } },
        { data: { name: 'secret-note.txt', kind: 'txt', size: '2 MB' } },
      ],
    },
  ];
}
