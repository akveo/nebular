import { Component } from '@angular/core';
import { NbGetters, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';

interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
  childEntries?: FSEntry[];
  expanded?: boolean;
}

@Component({
  template: `
    <nb-card>
      <nb-card-body>
        <table [nbTreeGrid]="source">
          <tr nbTreeGridHeaderRow *nbTreeGridHeaderRowDef="allColumns"></tr>
          <tr nbTreeGridRow *nbTreeGridRowDef="let row; columns: allColumns"></tr>

          <ng-container [nbTreeGridColumnDef]="customColumn">
            <th nbTreeGridHeaderCell *nbTreeGridHeaderCellDef>{{ customColumn }}</th>
            <td nbTreeGridCell *nbTreeGridCellDef="let row">
              <nb-tree-grid-row-toggle [expanded]="row.expanded" *ngIf="row.data.kind === 'dir'">
              </nb-tree-grid-row-toggle>

              {{ row.data[customColumn] }}
            </td>
          </ng-container>

          <ng-container *ngFor="let column of defaultColumns" [nbTreeGridColumnDef]="column">
            <th nbTreeGridHeaderCell *nbTreeGridHeaderCellDef>{{ column }}</th>
            <td nbTreeGridCell *nbTreeGridCellDef="let row">{{ row.data[column] || '-' }}</td>
          </ng-container>
        </table>
      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./tree-grid-shared.scss'],
  standalone: false,
})
export class TreeGridCustomNodeStructureComponent {
  customColumn = 'name';
  defaultColumns = ['size', 'kind', 'items'];
  allColumns = [this.customColumn, ...this.defaultColumns];
  source: NbTreeGridDataSource<FSEntry>;

  constructor(dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>) {
    const getters: NbGetters<FSEntry, FSEntry> = {
      dataGetter: (node: FSEntry) => node,
      childrenGetter: (node: FSEntry) => node.childEntries || undefined,
      expandedGetter: (node: FSEntry) => !!node.expanded,
    };
    this.source = dataSourceBuilder.create(this.data, getters);
  }

  private data: FSEntry[] = [
    {
      name: 'Projects',
      size: '1.8 MB',
      items: 5,
      kind: 'dir',
      expanded: true,
      childEntries: [
        { name: 'project-1.doc', kind: 'doc', size: '240 KB' },
        { name: 'project-2.doc', kind: 'doc', size: '290 KB' },
        {
          name: 'project-3',
          kind: 'dir',
          size: '466 KB',
          items: 3,
          childEntries: [
            { name: 'project-3A.doc', kind: 'doc', size: '200 KB' },
            { name: 'project-3B.doc', kind: 'doc', size: '266 KB' },
            { name: 'project-3C.doc', kind: 'doc', size: '0' },
          ],
        },
        { name: 'project-4.docx', kind: 'docx', size: '900 KB' },
      ],
    },
    {
      name: 'Reports',
      kind: 'dir',
      size: '400 KB',
      items: 2,
      childEntries: [
        {
          name: 'Report 1',
          kind: 'dir',
          size: '100 KB',
          items: 1,
          childEntries: [{ name: 'report-1.doc', kind: 'doc', size: '100 KB' }],
        },
        {
          name: 'Report 2',
          kind: 'dir',
          size: '300 KB',
          items: 2,
          childEntries: [
            { name: 'report-2.doc', kind: 'doc', size: '290 KB' },
            { name: 'report-2-note.txt', kind: 'txt', size: '10 KB' },
          ],
        },
      ],
    },
    {
      name: 'Other',
      kind: 'dir',
      size: '109 MB',
      items: 2,
      childEntries: [
        { name: 'backup.bkp', kind: 'bkp', size: '107 MB' },
        { name: 'secret-note.txt', kind: 'txt', size: '2 MB' },
      ],
    },
  ];
}
