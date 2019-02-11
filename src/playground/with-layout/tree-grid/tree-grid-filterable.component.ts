import { Component } from '@angular/core';
import { NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { DATA, PeriodicElement } from './data';

@Component({
  template: `
    <nb-card>
      <nb-card-body>

        <label class="search-label" for="search">Type to filter:</label>
        <input nbInput (input)="filter($event)" id="search" class="search-input">

        <table nbTreeGrid [source]="dataSource">

          <tr nbTreeGridHeaderRow *nbTreeGridHeaderRowDef="columnsToDisplay"></tr>
          <tr nbTreeGridRow *nbTreeGridRowDef="let row; columns: columnsToDisplay"></tr>

          <ng-container [nbTreeGridColumnDef]="customColumn">
            <th nbTreeGridHeaderCell *nbTreeGridHeaderCellDef>
              {{customColumn}}
            </th>

            <td nbTreeGridCell *nbTreeGridCellDef="let row">
              <nb-tree-grid-row-toggle [row]="row"></nb-tree-grid-row-toggle>
              {{row.data.name}}
            </td>
          </ng-container>

          <ng-container *ngFor="let column of defaultColumns" [nbTreeGridColumnDef]="column">
            <th nbTreeGridHeaderCell *nbTreeGridHeaderCellDef>{{column}}</th>
            <td nbTreeGridCell *nbTreeGridCellDef="let row">{{row.data[column]}}</td>
          </ng-container>

        </table>

      </nb-card-body>
    </nb-card>
  `,
  styleUrls: ['./tree-grid-showcase.component.scss'],
})
export class TreeGridFilterableComponent {
  customColumn = 'name';
  defaultColumns = ['weight', 'symbol', 'position'];
  get columnsToDisplay(): string[] {
    return [ this.customColumn, ...this.defaultColumns ];
  }

  dataSource: NbTreeGridDataSource<PeriodicElement>;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<PeriodicElement>) {
    this.dataSource = this.dataSourceBuilder.create(DATA);
  }

  filter(event) {
    this.dataSource.filter(event.target.value);
  }
}
