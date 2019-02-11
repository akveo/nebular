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

          <ng-container
            *ngFor="let column of defaultColumns; let index = index"
            [nbTreeGridColumnDef]="column"
            [hideOn]="400 + index * 100">
            <!--      hide last remaining column every 100px starting from 600px -->
            <th nbTreeGridHeaderCell *nbTreeGridHeaderCellDef>{{column}}</th>
            <td nbTreeGridCell *nbTreeGridCellDef="let row">{{row.data[column]}}</td>
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
  defaultColumns = ['weight', 'symbol', 'position'];
  get columnsToDisplay(): string[] {
    return [ this.customColumn, ...this.defaultColumns ];
  }
}
