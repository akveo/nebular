import { Component } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { DATA, PeriodicElement } from './data';

@Component({
  template: `
    <nb-card>
      <nb-card-body>

        <table [nbTreeGrid]="dataSource" nbSort (sort)="changeSort($event)">

          <tr nbTreeGridHeaderRow *nbTreeGridHeaderRowDef="columnsToDisplay"></tr>
          <tr nbTreeGridRow *nbTreeGridRowDef="let row; columns: columnsToDisplay"></tr>

          <ng-container [nbTreeGridColumnDef]="customColumn">
            <th nbTreeGridHeaderCell nbSortHeader *nbTreeGridHeaderCellDef>
              {{customColumn}}
              <nb-sort-icon *nbSortHeaderIcon [direction]="getSortDirection(customColumn)"></nb-sort-icon>
            </th>

            <td nbTreeGridCell *nbTreeGridCellDef="let row">
              <nb-tree-grid-row-toggle [row]="row"></nb-tree-grid-row-toggle>
              {{row.data.name}}
            </td>
          </ng-container>

          <ng-container *ngFor="let column of defaultColumns" [nbTreeGridColumnDef]="column">
            <th nbTreeGridHeaderCell nbSortHeader *nbTreeGridHeaderCellDef>
              {{column}}
              <ng-container *ngIf="sortColumn === column">
                <nb-sort-icon *nbSortHeaderIcon [direction]="getSortDirection(column)"></nb-sort-icon>
              </ng-container>
            </th>

            <td nbTreeGridCell *nbTreeGridCellDef="let row">{{row.data[column]}}</td>
          </ng-container>

        </table>

      </nb-card-body>
    </nb-card>
  `,
})
export class TreeGridSortableComponent {
  customColumn = 'name';
  defaultColumns = ['weight', 'symbol', 'position'];
  get columnsToDisplay(): string[] {
    return [ this.customColumn, ...this.defaultColumns ];
  }

  dataSource: NbTreeGridDataSource<PeriodicElement>;

  sortColumn: string = '';
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<PeriodicElement>) {
    this.dataSource = this.dataSourceBuilder.create(DATA);
  }

  changeSort(sortRequest: NbSortRequest): void {
    this.dataSource.sort(sortRequest);
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (column === this.sortColumn) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }
}
