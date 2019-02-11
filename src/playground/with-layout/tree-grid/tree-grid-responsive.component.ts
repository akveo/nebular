import { Component } from '@angular/core';
import { DATA } from './data';

@Component({
  template: `
    <nb-card>
      <nb-card-body>

        <table [nbTreeGrid]="data">

          <tr nbTreeGridHeaderRow *nbTreeGridHeaderRowDef="columnsToDisplay"></tr>
          <tr nbTreeGridRow *nbTreeGridRowDef="let row; columns: columnsToDisplay"></tr>

          <ng-container [nbTreeGridColumnDef]="customColumn">
            <th nbTreeGridHeaderCell *nbTreeGridHeaderCellDef>{{customColumn}}</th>
            <td nbTreeGridCell *nbTreeGridCellDef="let row">
              <nb-tree-grid-row-toggle [row]="row"></nb-tree-grid-row-toggle>
              {{row.data.name}}
            </td>
          </ng-container>

          <ng-container nbTreeGridColumnDef="weight" [hideOn]="800">
            <th nbTreeGridHeaderCell *nbTreeGridHeaderCellDef>Weight</th>
            <td nbTreeGridCell *nbTreeGridCellDef="let row">{{row.data.weight}}</td>
          </ng-container>

          <ng-container nbTreeGridColumnDef="symbol" [hideOn]="1000">
            <th nbTreeGridHeaderCell *nbTreeGridHeaderCellDef>symbol</th>
            <td nbTreeGridCell *nbTreeGridCellDef="let row">{{row.data.symbol}}</td>
          </ng-container>

        </table>

      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./tree-grid-shared.scss'],
})
export class TreeGridResponsiveComponent {
  data = DATA;

  customColumn = 'name';
  defaultColumns = ['weight', 'symbol'];
  get columnsToDisplay(): string[] {
    return [ this.customColumn, ...this.defaultColumns ];
  }
}
