import { Component } from '@angular/core';

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

        <table [nbTreeGrid]="data" equalColumnsWidth>

          <tr nbTreeGridHeaderRow *nbTreeGridHeaderRowDef="allColumns"></tr>
          <tr nbTreeGridRow *nbTreeGridRowDef="let row; columns: allColumns"></tr>

          <ng-container nbTreeGridColumnDef="name">
            <th nbTreeGridHeaderCell *nbTreeGridHeaderCellDef>name</th>
            <td nbTreeGridCell *nbTreeGridCellDef="let row">

              <nb-tree-grid-row-toggle
                [expanded]="row.expanded"
                *ngIf="row.data.kind === 'dir'">
              </nb-tree-grid-row-toggle>

              {{row.data.name}}

            </td>
          </ng-container>

          <ng-container nbTreeGridColumnDef="size" [hideOn]="600">
            <th nbTreeGridHeaderCell *nbTreeGridHeaderCellDef>size</th>
            <td nbTreeGridCell *nbTreeGridCellDef="let row">{{row.data.size}}</td>
          </ng-container>

          <ng-container nbTreeGridColumnDef="kind" [hideOn]="1000">
            <th nbTreeGridHeaderCell *nbTreeGridHeaderCellDef>kind</th>
            <td nbTreeGridCell *nbTreeGridCellDef="let row">{{row.data.kind}}</td>
          </ng-container>

          <ng-container nbTreeGridColumnDef="items" [showOn]="1200">
            <th nbTreeGridHeaderCell *nbTreeGridHeaderCellDef>items</th>
            <td nbTreeGridCell *nbTreeGridCellDef="let row">{{row.data.items || '-'}}</td>
          </ng-container>
        </table>

      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./tree-grid-shared.scss'],
})
export class TreeGridResponsiveComponent {
  allColumns = [ 'name', 'size', 'kind', 'items' ];

  data: TreeNode<FSEntry>[] = [
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
