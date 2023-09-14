import { Component } from '@angular/core';
import { NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';

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
        <table [nbTreeGrid]="dataSource" [nbSort]="dataSource" equalColumnsWidth>
          <tr nbTreeGridHeaderRow *nbTreeGridHeaderRowDef="allColumns"></tr>
          <tr nbTreeGridRow *nbTreeGridRowDef="let row; columns: allColumns"></tr>

          <ng-container [nbTreeGridColumnDef]="customColumn">
            <th nbTreeGridHeaderCell *nbTreeGridHeaderCellDef nbSortHeader>
              {{ customColumn }}
              <span *nbSortHeaderIcon="let asc = isAscending; let desc = isDescending">
                <nb-icon *ngIf="asc" icon="chevron-down-outline" aria-label="sorted ascending"></nb-icon>
                <nb-icon *ngIf="desc" icon="chevron-up-outline" aria-label="sorted descending"></nb-icon>
              </span>
            </th>

            <td nbTreeGridCell *nbTreeGridCellDef="let row">
              <button
                nbTreeGridRowToggle
                *ngIf="row.hasChildren()"
                [attr.aria-label]="row.expanded ? 'collapse' : 'expand'"
              >
                <nb-icon [icon]="row.expanded ? 'chevron-down-outline' : 'chevron-right-outline'" aria-hidden="true">
                </nb-icon>
              </button>
              {{ row.data.name }}
            </td>
          </ng-container>

          <ng-container *ngFor="let column of defaultColumns" [nbTreeGridColumnDef]="column">
            <th nbTreeGridHeaderCell *nbTreeGridHeaderCellDef>{{ column }}</th>
            <td nbTreeGridCell *nbTreeGridCellDef="let row">{{ row.data[column] }}</td>
          </ng-container>
        </table>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./tree-grid-shared.scss', './tree-grid-custom-icons.component.scss'],
})
export class TreeGridCustomIconsComponent {
  customColumn = 'name';
  defaultColumns = ['size', 'kind', 'items'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  dataSource: NbTreeGridDataSource<FSEntry>;

  constructor(dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>) {
    this.dataSource = dataSourceBuilder.create(this.data);
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
          children: [{ data: { name: 'report-1.doc', kind: 'doc', size: '100 KB' } }],
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
